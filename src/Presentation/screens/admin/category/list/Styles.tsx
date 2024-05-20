import { StyleSheet } from 'react-native';

const AdminCategoryListItemStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingVertical: 15,
        width: '100%'
    },
    image: {
        borderRadius: 10,
        height: 80,
        width: 80,
    },
    info: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        color: '#000',
        fontSize: 15
    },
    description: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5
    },
    actionContainer: {
        marginRight: 30
    },
    action: {
        marginVertical: 4
    },
    actionButton: {
        backgroundColor: '#047ecc',
        borderRadius: 10,
        paddingHorizontal: 4,
        marginVertical: 2
    },
    divisor: {
        backgroundColor: '#f2eff2',
        flex: 1,
        height: 1,
        marginHorizontal: 20
    }
});


export default AdminCategoryListItemStyles;