
import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';

import { RoundedButton } from '../../../components/RoundedButton'
import { ImageButton } from '../../../components/ImageButton';
import { ModalPickImage } from '../../components/ModalPickImage';


import styles from './Styles';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamsList, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {

    const { pickImage,
        image,
        takePhoto
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={styles.formText}>Registrarse</Text>

                    <View style={{ marginTop: 35 }}>
                        <RoundedButton
                            text='Confirmar'
                            onPress={() => console.log('Registrar Cliente')}
                        />
                    </View>
                </ScrollView>
            </View>
            <ModalPickImage
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                openGallery={pickImage}
                openCamera={takePhoto}
            />
        </View>
    )
}