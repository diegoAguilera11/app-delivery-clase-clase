import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

import styles from './Styles';
import { Category } from '../../../../../Domain/entities/Category';
import CustomTextInput from '../../../../components/CustomTextInput';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../../components/RoundedButton';
import { ModalPickImage } from '../../../../components/ModalPickImage';

export const CategoryCreateScreen = () => {


  const { name,
    description,
    image,
    pickImage,
    takePhoto,
    onChange,
    errorMessages,
    create,
    loading
  } = useViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        {
          (image == '')
            ?
            <View>
              <Image
                style={styles.image}
                source={require('../../../../../../assets/add-picture.png')}
              />
              <Text style={styles.imageText}> Seleccione una imagen</Text>
              {
                errorMessages.image && (
                  <Text style={{
                    ...styles.imageText, marginTop: 10, backgroundColor: '#ff7f7f', borderLeftWidth: 3,
                    borderColor: '#993235',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: '600',
                    marginVertical: 12,
                    paddingVertical: 8,
                    marginHorizontal: 20
                  }}
                  >
                    {errorMessages.image}
                  </Text>
                )
              }
            </View>
            :
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
        }
      </TouchableOpacity>

      <View style={styles.form}>

        {/* Name Category */}
        <CustomTextInput
          property='name'
          placeholder='Nombre de la categoría'
          keyboardType='default'
          image={require('../../../../../../assets/categories.png')}
          value={name}
          onChangeText={onChange}
          secureTextEntry={false}
          error={errorMessages['name']}
          editable={!loading}
        />

        {/* Description Category */}
        <CustomTextInput
          property='description'
          placeholder='Descripción de la categoría'
          keyboardType='default'
          image={require('../../../../../../assets/note.png')}
          value={description}
          onChangeText={onChange}
          secureTextEntry={false}
          error={errorMessages['description']}
          editable={!loading}
        />
      </View>

      {/* Button Create Category */}
      <View style={styles.buttonContainer}>
        {
          (!loading) && (
            <RoundedButton
              text={'Crear Categoría'}
              onPress={create}
            />
          )
        }
      </View>

      <ModalPickImage
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        openGallery={pickImage}
        openCamera={takePhoto}
      />
      {
        loading && (
          <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
        )
      }
    </View>
  )
}

