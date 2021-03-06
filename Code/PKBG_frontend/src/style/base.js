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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    content: {
        fontFamily: 'KustWoff',
        fontSize: 50,
        color: '#000',
        marginTop: 25,
        //marginBottom: 10,
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
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: '#FF4500',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonBig:{
        height: 45,
        width: 160,
        marginTop: 50,
        marginBottom: 70,
    },
    btText: {
        color: '#fff',
        fontFamily: 'zhenhunshoushu',
        fontSize: 30,
    },
    input: {
        width: 100,
        fontSize: 18,
        color: '#000',//输入框输入的文本为黑色
        marginRight: 18
    },
    inputBox: {
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 42,
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