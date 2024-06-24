import React from 'react'
import { View, Text } from 'react-native'

import CreditCard from 'react-native-credit-card-form-ui';

import styles from './Styles';
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton';

export const PaymentCreateScreen = () => {

  const {
    createPayment,
    cardRef,
    handleSubmit
  } = useViewModel();

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <CreditCard

          ref={cardRef}
          background={'#005ea4'}
          labels={{
            holder: 'NOMBRE DEL TITULAR',
            cvv: 'CVV',
            expiration: 'VENCIMIENTO',
          }}
          placeholders={{
            holder: 'NOMBRE DEL TITULAR',
            cvv: 'CVV',
            expiration: 'MM/AA',
            number: '**** **** **** ****'
          }}
          placeholderTextColor='#fff'
          expirationDateFormat='MM/YY'
        />
      </View>

      <RoundedButton
        text={'Pagar'}
        onPress={handleSubmit}
        key={'Pagar'}
      />
    </View>
  )
}