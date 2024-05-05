import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'
import { ImageButton } from '../../../components/ImageButton'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'
import { TextInput } from 'react-native-gesture-handler'
import { ModalPickImage } from '../../../components/ModalPickImage'
import { RoundedButton } from '../../../components/RoundedButton'
import { showMessage } from 'react-native-flash-message'

interface Props extends StackScreenProps<RootStackParamsList, 'ProfileUpdateScreen'> { }
const ProfileUpdateScreen = ({ navigation }: Props) => {

  const {
    name,
    lastName,
    image,
    phone,
    errorMessages,
    loading,
    onChange,
    onChangeInfoUpdate,
    pickImage,
    takePhoto,
    updateUser,
    user
  } = useViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    onChangeInfoUpdate(user.name, user.lastName, user.phone);
  }, [user]);

  const handleUpdateUser = async () => {
    const response = await updateUser();

    if (response) {
      showMessage({
        message: 'Usuario actualizado correctamente',
        type: 'success',
        icon: 'success',
      });
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../../assets/background.jpg')}
      />

      <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 35 }}>
        <ImageButton
          text='back'
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          {
            image == ''
              ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={styles.logo}
                  source={{ uri: user?.image }}
                />
                <Text style={styles.logoText}>Seleccione una imagen</Text>
                {
                  errorMessages.image && (
                    <Text style={{
                      ...styles.logoText, marginTop: 10, backgroundColor: '#ff7f7f', borderLeftWidth: 3,
                      borderColor: '#993235',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '600',
                      marginVertical: 12,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                    }}>{errorMessages.image}</Text>
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

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>Actualizar Perfil</Text>

          {/* Name Input */}
          <View style={styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../../assets/profile.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Diego'}
              keyboardType='default'
              value={name}
              onChangeText={text => onChange('name', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}


          {/* LastName Input */}
          <View style={styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../../assets/profile.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Aguilera'}
              keyboardType='default'
              value={lastName}
              onChangeText={text => onChange('lastName', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.lastName && <Text style={styles.errorText}>{errorMessages.lastName}</Text>}


          {/* Phone Input */}
          <View style={styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../../assets/phone.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'985441122'}
              keyboardType='number-pad'
              value={phone}
              onChangeText={text => onChange('phone', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.phone && <Text style={styles.errorText}>{errorMessages.phone}</Text>}

          <View style={{ marginTop: 35 }}>
            {
              loading === false && (
                <RoundedButton
                  text='Confirmar'
                  onPress={() => handleUpdateUser()}
                />
              )
            }
          </View>
        </ScrollView>
      </View>
      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />
      {
        loading && (
          <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
        )
      }
    </View>
  )
}

export default ProfileUpdateScreen