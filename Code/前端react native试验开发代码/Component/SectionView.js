import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    SectionList,
    Dimensions}
from 'react-native';

var {width} = Dimensions.get('window');

export default class SectionView extends Component {
    constructor(props) { //构造器
        super(props);
        this.state = {
            refreshing: false,  //是否刷新,通过更改此属性来控制是否刷新
            sections:[   //数据源
                {team:'Team A', data:[
                    {name : 'xie yihan' , isReady : true},
                    {name : 'wang haoyu' , isReady : false}]},
                {team:'Team B', data:[
                    {name : 'qi peng' , isReady : true},
                    {name : 'zhou yifan' , isReady : true}]}
            ]
        }
    }

    render() {

        return (
          <View style={{flex: 1}}>
              <SectionList
                    style={{marginTop:10,width:width-30}}
                    renderSectionHeader={this._sectionComp} //区头
                    renderItem={this._renderItem}   //cell
                    sections={this.state.sections}     //数据源
                    ItemSeparatorComponent={() => <View style={{backgroundColor:'white',height:1}}></View>}  //分割线
                    stickySectionHeadersEnabled={false}  //设置区头是否悬浮在屏幕顶部,默认是true
                    initialNumToRender = {2} //指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容
                    setVerticalScrollBarEnabled = {false}
                    setFastScrollEnabled = {false}
              />
          </View>
        );
    }

    _renderItem = (info) => {
        var txt1 = info.item.name;
        if(info.item.isReady == true)
        {
            var txt2 = 'Ready';
        }
        else{
            txt2 = 'UnReady';
        }
        return (
            <View style={styles.playerCell}>
                <Text style={styles.cellText}>{txt1}</Text>
                <Text style={styles.cellText}>{txt2}</Text>
            </View>
            )
    }

    _sectionComp = (info) => {
        var txt = ' '+info.section.team;
        return <Text style={styles.SectionHeader}>{txt}</Text>
    }
}

const styles = StyleSheet.create({
    playerCell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#607B8B', 
    },
    cellText: {
        height: 30,
        textAlignVertical: 'center', 
        color: '#fff', 
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    SectionHeader: { 
        height: 30,
        textAlignVertical: 'center',
        backgroundColor: '#473C8B',
        color: 'white',
        fontSize: 20
    },
})
    
