import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageBackground: {
        bottom: 30,
        width: '100%',
        height: '70%',
        opacity: 0.4,
    },
    form: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '45%'
    },
    formContent: {
        marginLeft: 15
    },
    formInfo: {
        flexDirection: 'row'
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
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
    formLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    formRegisterText: {
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
        color: 'orange',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginLeft: 10
    },
    formIcon: {
        width: 30,
        height: 30,
        marginTop: 10
    },
    logoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '15%'
    },
    logo: {
        width: 200,
        height: 200
    },
    logoText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
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
    },
    errorsContainer: {
        backgroundColor: '#ff7f7f',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    logoImage: {
        borderColor: '#FFF',
        borderRadius: 100,
        borderWidth: 2,
        width: 150,
        height: 150
    },
    logout: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 15,
        right: 0
    }
});

export default ProfileInfoStyles;