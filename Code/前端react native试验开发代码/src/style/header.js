import {
    StyleSheet
} from 'react-native';

const header = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    header: {
        height: 30,
        width: 680,
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