import React, { useRef, useState, useEffect, useCallback } from 'react';

import stripe from 'react-native-stripe-client'

import { STRIPE_PUBLISHABLE_KEY } from '@env';


interface Values {
    holder: string;
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
}


const PaymentCreateViewModel = () => {

    const [valuesCard, setValuesCard] = useState<Values>({
        holder: '',
        number: '',
        exp_month: 0,
        exp_year: 0,
        cvc: ''
    });

    useEffect(() => {
        if (valuesCard.number && valuesCard.holder && valuesCard.exp_month && valuesCard.exp_year && valuesCard.cvc) {
            createPayment();
        }
    }, [valuesCard]);


    const cardRef = useRef() as any;
    const handleSubmit = useCallback(() => {
        if (cardRef.current) {
            const { error, data } = cardRef.current.submit();

            //TODO: Display error with view or toast
            console.log('ERROR: ', error);

            if (!error) {
                const formmatedData = {
                    holder: data.holder,
                    number: data.number.replace(/\s/g, ''),
                    exp_month: data.expiration.split('/')[0],
                    exp_year: data.expiration.split('/')[1],
                    cvc: data.cvv
                }
                setValuesCard(formmatedData);
            }
        }
    }, []);


    const stripeClient = stripe(STRIPE_PUBLISHABLE_KEY);

    const createPayment = async () => {
        const { id } = await stripeClient.createPaymentMethod("card", {
            number: valuesCard.number,
            exp_month: valuesCard.exp_month,
            exp_year: valuesCard.exp_year,
            cvc: valuesCard.cvc
        });

        console.log(id);

        // TODO: Send payment to backend
            // TODO: Obtain Shopping Cart with Context
    }

    return {
        createPayment,
        cardRef,
        handleSubmit
    }
}

export default PaymentCreateViewModel;