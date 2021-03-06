import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    FlatList,
} from 'react-native';
 
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
const { Marker } = Overlay;
 
import Dimensions from 'Dimensions';
const { width,height } = Dimensions.get('window');
 
export default class BaiduMapDemo extends Component {
    constructor() {
        super();
        this.state = {
            zoomControlsVisible: true,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            mapType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 113.896198,
                latitude: 22.959144,
            },
            clickMessage: '', //空白区域信息
            poiMessage: '', //已有点信息
            clickMessageData: [], //空白区域附近数据
            poiMessageData: [], //已有点附近数据
        };
    }
 
    componentDidMount() {
        Geolocation.getCurrentPosition()
            .then(data => {
                // console.log(data)
                // this.setState({
                //     center: {
                //         longitude: data.longitude,
                //         latitude: data.latitude
                //     },
                // })
            })
            .catch(e =>{
                console.warn(e, 'error');
            })
    }
 
  render() {
        return (
            <ScrollView style={styles.container}>
                <MapView 
                    zoomControlsVisible={this.state.zoomControlsVisible} //默认true,是否显示缩放控件,仅支持android
                    trafficEnabled={this.state.trafficEnabled} //默认false,是否显示交通线
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled} //默认false,是否显示热力图
                    mapType={this.state.mapType} //地图模式,NORMAL普通 SATELLITE卫星图
                    zoom={this.state.zoom} //缩放等级,默认为10
                    center={this.state.center}
 
                    onMapLoaded={(e) => { //地图加载事件
                        console.log('地图加载')
                    }}
                    
                    onMarkerClick={(e) => { //标记点点击事件
                        console.log('标记点点击',e)
                    }}
                    onMapClick={(e) => { //地图空白区域点击事件,返回经纬度
                        
                        Geolocation.reverseGeoCode(e.latitude,e.longitude)
                            .then(res => {
                                this.setState({
                                    center: {
                                        longitude: e.longitude,
                                        latitude: e.latitude,
                                    },
                                    clickMessageData: res.poiList,
                                })
                                if(Platform.OS === 'ios') {
                                    this.setState({
                                        clickMessage: res.district + res.streetName,
                                    })
                                }else {
                                    this.setState({
                                        clickMessage: e.name,
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        
                    }}
                    onMapPoiClick={(e) => { //地图已有点点击
                        Geolocation.reverseGeoCode(e.latitude,e.longitude)
                            .then(res => {
                                this.setState({
                                    center: {
                                        longitude: e.longitude,
                                        latitude: e.latitude,
                                    },
                                    poiMessage: e.name,
                                    poiMessageData: res.poiList,
                                })
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}
                    style={styles.map}
                >
                    <Marker
                        title={'title'}
                        location={this.state.center}
                    >
                    </Marker>
                </MapView>
 
                <View style={styles.list}>
                    <Text>地图缩放控件状态: </Text>
                    {this.state.zoomControlsVisible ? 
                        <Text onPress={() => this.setState({zoomControlsVisible:false})}>显示</Text>
                        :
                        <Text onPress={() => this.setState({zoomControlsVisible:true})}>关闭</Text>
                    }
                </View>
                <View style={styles.list}>
                    <Text>交通线状态: </Text>
                    {this.state.trafficEnabled ? 
                        <Text onPress={() => this.setState({trafficEnabled:false})}>显示</Text>
                        :
                        <Text onPress={() => this.setState({trafficEnabled:true})}>关闭</Text>
                    }
                </View>
                <View style={styles.list}>
                    <Text>热力图状态: </Text>
                    {this.state.baiduHeatMapEnabled ? 
                        <Text onPress={() => this.setState({baiduHeatMapEnabled:false})}>显示</Text>
                        :
                        <Text onPress={() => this.setState({baiduHeatMapEnabled:true})}>关闭</Text>
                    }
                </View>
                <View style={styles.list}>
                    <Text>地图模式状态: </Text>
                    {this.state.mapType == MapTypes.NORMAL ? 
                        <Text onPress={() => this.setState({mapType:MapTypes.SATELLITE})}>普通</Text>
                        :
                        <Text onPress={() => this.setState({mapType:MapTypes.NORMAL})}>卫星</Text>
                    }
                </View>
 
                {/* 空白区域 */}
                <View style={styles.list}>
                    <Text>地图空白区域附近信息: {this.state.clickMessage}</Text>
                </View>
                <View style={{paddingLeft: 10,marginBottom: 5,}}>
                    <FlatList
                        data={this.state.clickMessageData}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={this._renderItem}
                        extraData={this.state}
                    />
                </View>
 
                {/* 已有点 */}
                <View style={styles.list}>
                    <Text>地图已有点点击信息: {this.state.poiMessage}</Text>
                </View>
                <View style={{paddingLeft: 10,marginBottom: 5,}}>
                    <FlatList
                        data={this.state.poiMessageData}
                        keyExtractor={(item,index) => index.toString()}
                        ListHeaderComponent={this._header}
                        renderItem={this._renderItem}
                        extraData={this.state}
                    />
                </View>
                
                <View style={styles.list}>
                    <Text onPress={() => {
                        Geolocation.getCurrentPosition()
                            .then(data => {
                                this.setState({
                                    center: {
                                        longitude: data.longitude,
                                        latitude: data.latitude
                                    },
                                })
                            })
                            .catch(e =>{
                                console.warn(e, 'error');
                            })
                    }}>当前位置</Text>
                </View>
            </ScrollView>
        );
    }
    _header = () => {
        return (
            <Text>附近信息: </Text>
        )
    }
    _renderItem = (item) => {
        
        item = item.item;
        let H = Math.random() * 1000;
        H = Math.ceil(H);
        return (
            <View style={[styles.item,{backgroundColor:`hsl(${H},50%,30%)`}]}>
                <Text style={styles.itemText}>纬度: {item.latitude}</Text>
                <Text style={styles.itemText}>经度: {item.longitude}</Text>
                <Text style={styles.itemText}>地点: {item.name}</Text>
                <Text style={styles.itemText}>地址: {item.address}</Text>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: width,
        height: height - 300,
        marginBottom: 5,
    },
    list: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 5,
    },
    item: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        paddingHorizontal: 5,
        paddingVertical: 8,
    },
    itemText: {
        color: '#fff',
    }
});