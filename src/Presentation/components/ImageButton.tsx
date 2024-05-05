import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CustomColors } from "../theme/AppTheme";

interface Props {
    text: String,
    onPress: () => void
}

export const ImageButton = ({ text, onPress }: Props) => {

    const images = {
        back: require('../../../assets/back.png'),
    };
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            // style={styles.roundedButton}
            onPress={() => onPress()}
        >
            <Image source={images[text]} style={styles.logo} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundedButton: {
        alignItems: 'center',
        backgroundColor: CustomColors.primary,
        borderRadius: 15,
        padding: 15,
        width: '100%',

    },
    textButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    logo: {
        width: 60,
        height: 60,
    },
});