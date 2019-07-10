import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {width} = Dimensions.get('window')
const header = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: 30,
        width: width-20,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Head: {
        justifyContent: 'flex-start',
    },
    End: {
        justifyContent: 'flex-end',
    }
});

module.exports = header;