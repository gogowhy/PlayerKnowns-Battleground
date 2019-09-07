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

if(windowHeight > windowWidth){
    console.log("初始竖屏");
    var width = windowHeight;
}else{
    console.log("初始横屏");
    var width = windowWidth;
}

const header = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    header: {
        height: 30,
        width: width - 20,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Head: {
        justifyContent: 'flex-start',
        marginLeft: 10,
    },
    End: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10,
    }
});

module.exports = header;