import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, KeyboardType } from 'react-native'

interface Props {
    image: any;
    placeholder: string;
    value: string;
    keyboardType: KeyboardType;
    secureTextEntry?: boolean;
    property: string;
    onChangeText: (property: string, value: string) => void;
    error: string;
    editable?: boolean;
}


const CustomTextInput = ({ image, placeholder, value, keyboardType, secureTextEntry, property, editable = true, onChangeText, error }: Props) => {
    return (
        <View>
            <View style={styles.formInput}>
                <Image
                    style={styles.formIcon}
                    source={image}
                />

                <TextInput
                    style={styles.formTextInput}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={text => onChangeText(property, text)}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                />

            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        marginLeft: 15
    },
    formIcon: {
        width: 30,
        height: 30,
        marginTop: 10
    },
    errorText: {
        backgroundColor: '#ff7f7f',
        borderLeftWidth: 3,
        borderColor: '#993235',
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
    }
})