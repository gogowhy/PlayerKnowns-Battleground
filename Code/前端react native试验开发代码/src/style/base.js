import {
    StyleSheet
} from 'react-native';

const base = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTop: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    content: {
        fontFamily: 'Calibri',
        fontSize: 40,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: null,
        width: null,
        zIndex: -1,
    },
    button: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FF4500',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonBig:{
        width: 150,
        marginTop: 50,
        marginBottom: 70,
    },
    btText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        width: 180,
        height: 50,
        fontSize: 18,
        color: '#000',//输入框输入的文本为黑色
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#FFFFF0',
        marginBottom: 8,
    },
    underline: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    ulText: {
        textDecorationLine:'underline',
        color: '#0000CD',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    }
});

module.exports = base;