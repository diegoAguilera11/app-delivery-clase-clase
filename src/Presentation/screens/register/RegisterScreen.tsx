
import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';

import { RoundedButton } from '../../../components/RoundedButton'
import { ImageButton } from '../../../components/ImageButton';
import { ModalPickImage } from '../../components/ModalPickImage';


import styles from './Styles';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamsList, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {

    const {
        name,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        onChange,
        pickImage,
        image,
        takePhoto,
        register,
        errorMessages,
        loading
    } = useViewModel();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../assets/background.jpg')}
            />

            <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 35 }}>
                <ImageButton
                    text='back'
                    onPress={() => navigation.navigate('LoginScreen')}
                />
            </View>

            <View style={styles.logoContainer}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >

                    {
                        (image == '')
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../../../assets/user.png')}
                                />
                                <Text style={styles.logoText}>Seleccione una imagen</Text>
                                {
                                    errorMessages.image && (
                                        <Text
                                            style={{
                                                ...styles.errorText,
                                                marginTop: 10, backgroundColor: '#ff7f7f', borderLeftWidth: 3,
                                                borderColor: '#993235',
                                                color: 'white',
                                                fontSize: 14,
                                                fontWeight: '600',
                                                marginVertical: 12,
                                                paddingVertical: 8,
                                                paddingHorizontal: 12,
                                            }}
                                        >
                                            {errorMessages.image}
                                        </Text>
                                    )
                                }
                            </View>
                            :
                            <Image
                                style={styles.logo}
                                source={{ uri: image }}
                            />
                    }
                </TouchableOpacity>
            </View>

            <View style={{ ...styles.form, height: '75%' }}>
                <Text style={styles.formText}>Registrarse</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >

                    {/* Name Input */}
                    <View style={styles.formInput}>
                        <Image
                            style={styles.formIcon}
                            source={require('../../../../assets/profile.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Diego'}
                            keyboardType='default'
                            value={name}
                            onChangeText={text => onChange('name', text)}
                            secureTextEntry={false}
                            editable={(loading) ? false : true}
                        />

                    </View>
                    {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}


                    {/* LastName Input */}
                    <View style={styles.formInput}>
                        <Image
                            style={styles.formIcon}
                            source={require('../../../../assets/profile.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Aguilera'}
                            keyboardType='default'
                            value={lastName}
                            onChangeText={text => onChange('lastName', text)}
                            secureTextEntry={false}
                            editable={(loading) ? false : true}
                        />

                    </View>
                    {errorMessages.lastName && <Text style={styles.errorText}>{errorMessages.lastName}</Text>}


                    {/* Email Input */}
                    <View style={styles.formInput}>
                        <Image
                            style={styles.formIcon}
                            source={require('../../../../assets/message.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'Ingrese su email'}
                            keyboardType='default'
                            value={email}
                            onChangeText={text => onChange('email', text)}
                            secureTextEntry={false}
                            editable={(loading) ? false : true}
                        />

                    </View>
                    {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

                    {/* Phone Input */}
                    <View style={styles.formInput}>
                        <Image
                            style={styles.formIcon}
                            source={require('../../../../assets/phone.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'986147500'}
                            keyboardType='number-pad'
                            value={phone}
                            onChangeText={text => onChange('phone', text)}
                            secureTextEntry={false}
                            editable={(loading) ? false : true}
                        />

                    </View>
                    {errorMessages.phone && <Text style={styles.errorText}>{errorMessages.phone}</Text>}

                    {/* Password Input */}
                    <View style={styles.formInput}>
                        <Image
                            style={styles.formIcon}
                            source={require('../../../../assets/password.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'*********'}
                            keyboardType='default'
                            value={password}
                            onChangeText={text => onChange('password', text)}
                            secureTextEntry={true}
                            editable={(loading) ? false : true}
                        />

                    </View>
                    {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}


                    {/* Confirm Password Input */}
                    <View style={styles.formInput}>
                        <Image
                            style={styles.formIcon}
                            source={require('../../../../assets/password.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={'*********'}
                            keyboardType='default'
                            value={confirmPassword}
                            onChangeText={text => onChange('confirmPassword', text)}
                            secureTextEntry={true}
                            editable={(loading) ? false : true}
                        />

                    </View>
                    {errorMessages.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}


                </ScrollView>
                <View style={{ marginTop: 35 }}>
                    <RoundedButton
                        text='Registrar'
                        onPress={register}
                    />
                </View>
            </View>
            <ModalPickImage
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                openGallery={pickImage}
                openCamera={takePhoto}
            />
            {loading && (
                <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
            )
            }
        </View>
    )
}