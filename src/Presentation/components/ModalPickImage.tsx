import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { RoundedButton } from './RoundedButton'


interface Props {
    openGallery: () => void,
    openCamera: () => void
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalPickImage = ({ modalUseState, setModalUseState, openGallery, openCamera }: Props) => {
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalUseState}
                onRequestClose={() => {
                    setModalUseState(!modalUseState);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textOptions}>Seleccione una opción</Text>
                        {/* Gallery Button */}
                        <View style={styles.buttonContainer}>
                            <RoundedButton
                                text='Galería'
                                onPress={() => {
                                    openGallery();
                                    setModalUseState(!modalUseState);
                                }} />
                        </View>

                        {/* Camera Button */}
                        <View style={styles.buttonContainer}>
                            <RoundedButton
                                text='Cámara'
                                onPress={() => {
                                    openCamera();
                                    setModalUseState(!modalUseState);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 220,
        margin: 20,
        paddingTop: 35,
        paddingHorizontal: 25,
        width: 250,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 8,
    },
    textOptions: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5
    }
});