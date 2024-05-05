import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { RootClientBottomTabParamsList } from '../../../navigator/tabs/client/ClientBottomTabs'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './Styles'
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../components/RoundedButton';
import { RootStackParamsList } from '../../../navigator/MainAppStack';


interface Props extends StackScreenProps<RootStackParamsList, 'AdminBottomTabs'> { };

export const ProfileInfoScreen = ({ navigation, route }: Props) => {

    const { user, logoutUser } = useViewModel();

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../../assets/background.jpg')}
            />

            <View style={{ backgroundColor: '#fff', borderRadius: 100, top: '3%', right: '6%', position: 'absolute', marginTop: 35 }}>
                <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={logoutUser}
                >
                    <MaterialCommunityIcons style={{ padding: 8 }} name="logout" size={36} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: user?.image }}
                    style={styles.logoImage}
                />
            </View>

            {/* Form */}
            <View style={styles.form}>
                {/* Names */}
                <View style={{ ...styles.formInfo, marginTop: 20 }}>
                    <Image
                        source={require('../../../../../assets/profile.png')}
                        style={styles.formIcon}
                    />
                    <View style={styles.formContent}>
                        <Text>Nombres</Text>
                        <Text>{user?.name} {user?.lastName}</Text>
                    </View>
                </View>

                {/* Email */}
                <View style={{ ...styles.formInfo, marginTop: 20 }}>
                    <Image
                        source={require('../../../../../assets/message.png')}
                        style={styles.formIcon}
                    />
                    <View style={styles.formContent}>
                        <Text>Correo electrónico</Text>
                        <Text>{user?.email}</Text>
                    </View>
                </View>

                {/* Phone */}
                <View style={{ ...styles.formInfo, marginTop: 20, marginBottom: 50 }}>
                    <Image
                        source={require('../../../../../assets/phone.png')}
                        style={styles.formIcon}
                    />
                    <View style={styles.formContent}>
                        <Text>Teléfono</Text>
                        <Text>{user?.phone}</Text>
                    </View>
                </View>

                <RoundedButton
                    text="Actualizar Perfil"
                    onPress={() => navigation.navigate('ProfileUpdateScreen')}
                />
            </View>
        </View>
    )
}