import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'

import styles from './Styles';
import { RoundedButton } from '../../components/RoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { Axios, AxiosError } from 'axios';


interface Props extends StackScreenProps<RootStackParamsList, 'Login'> { }

const LoginScreen = ({ navigation, route }: Props) => {

  const sendBackend = async () => {
    try {
      // Realizamos nuestra peticion.
      const userData = {
        email: "diego@gmail.com",
        password: "passworddd"
      }
      const response = await ApiDelivery.post('auth/login', userData);
      console.log(response.data);

    } catch (error) {
      let e = (error as AxiosError);
      console.log('ERROR: ', JSON.stringify(e.response?.data));
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../assets/background.jpg')}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/logo.png')}
        />
        <Text style={styles.logoText}>Vuelta al menú en 365 platos</Text>
      </View>

      <View style={{ ...styles.form, height: '55%' }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <Text style={styles.formText}>Inicio de Sesión</Text>

          <View style={{ marginTop: 30 }}>

            <RoundedButton
              text='Ingresar'
              onPress={sendBackend}
            />

            <View style={styles.formLogin}>
              <Text style={{ fontWeight: '500' }}>No tienes cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.formRegisterText}>Registrate</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default LoginScreen;
