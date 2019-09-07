import {
    StyleSheet,
    Dimensions
} from 'react-native';

/**
 * 获取横屏时的屏幕宽度和高度
 * 
 */
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

if (windowHeight > windowWidth) {
    console.log("初始竖屏");
    var width = windowHeight;
    var height = windowWidth;
} else {
    console.log("初始横屏");
    var width = windowWidth;
    var height = windowHeight;
}

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
        height: height,
        width: width,
        zIndex: -1,
    },
    button: {
        height: 45,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'yellow',
        borderWidth: 4,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btText: {
        color: 'yellow',
        fontFamily: 'zhenhunshoushu',
        fontSize: 30,
    },
    input: {
        paddingBottom: 6,
        fontWeight: '400',
        fontSize: 18,
        height: 38,
        paddingLeft: 16,
    },
    inputBox: {
        width: 300,
        height: 38,
        marginTop: 2,
        backgroundColor: '#fff',
    },
    checkIcon: {
        borderBottomWidth: 0,
        height: 14,
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    checkInfo: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
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