import { StyleSheet } from "react-native";

const AdminCategoryCreateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        paddingVertical: 40
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain'
    },
    imageText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    form: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '55%',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonContainer: {
        bottom: 30,
        left: 20,
        position: 'absolute',
        right: 20,
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    }
});

export default AdminCategoryCreateStyles;