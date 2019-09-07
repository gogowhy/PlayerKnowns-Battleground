import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    SectionList,
    Dimensions
} from 'react-native';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
const { Marker } = Overlay;

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

export default class BaiduMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomControlsVisible: this.props.BigOrSmall,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            mapType: MapTypes.NORMAL,
            zoom: 50,
            center: this.props.center,
            clickMessage: '', //空⽩区域信息
            poiMessage: '', //已有点信息
            clickMessageData: [], //空⽩区域附近数据
            poiMessageData: [], //已有点附近数据

            teammate_position: this.props.teammates_position, //队友坐标
            BigOrSmall: this.props.BigOrSmall,
            //username : this.props.username,
        };
        //this.ws = this.props.ws;
        this.UnUse_Map = this.UnUse_Map.bind(this);
        this.Use_Map = this.Use_Map.bind(this);
    }

    Use_Map() {
        this.props.Use_Map();
    }

    UnUse_Map() {
        this.props.UnUse_Map();
    }

    render() {

        const markers = [];
        // markers.push(<Marker
        //     title={'A'}
        //     location={{ longitude: this.state.center.longitude + 0.00005, latitude: this.state.center.latitude + 0.00005 }}
        //     alpha={0.5}
        // ></Marker>
        // );
        // markers.push(<Marker
        //     title={'A'}
        //     location={{ longitude: this.state.center.longitude + 0.0001, latitude: this.state.center.latitude + 0.0001 }}
        //     alpha={0.5}
        // ></Marker>
        // );

        if (this.state.BigOrSmall){
            this.state.teammate_position.forEach((one_position) => {
                markers.push(<Marker
                    title={one_position.playername}
                    location={ { longitude : one_position.longitude , latitude : one_position.latitude } }
                    alpha={0.5}
                ></Marker>
                );
            });

        
        }
        return (
            <View style={styles.container}>
                <MapView
                    zoomControlsVisible={this.state.zoomControlsVisible} //默认true,是否显示缩放控件,仅⽀持android
                    trafficEnabled={this.state.trafficEnabled} //默认false,是否显示交通线
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled} //默认false,是否显示热⼒图
                    mapType={this.state.mapType} //地图模式,NORMAL普通 SATELLITE卫星图
                    zoom={this.state.zoom} //缩放等级,默认为10
                    center={this.state.center}
                    onMapLoaded={(e) => { //地图加载事件
                        console.log('地图加载')
                    }}
                    onMarkerClick={(e) => { //标记点点击事件，显示队友的信息
                        console.log('标记点点击', e)
                        if (this.state.BigOrSmall)
                            alert(e.title);
                        else this.Use_Map();
                    }}
                    /*
                    onMapClick={(e) => { //地图空⽩区域点击事件
                        
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
                            }
                            else {
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
                    */
                    onMapClick={(e) => {
                        if(!this.state.BigOrSmall)
                            this.Use_Map();
                    }}
                    onMapPoiClick={(e) => {
                        if(!this.state.BigOrSmall)
                            this.Use_Map();
                    }}
                    onMapDoubleClick={(e) => { //双击退出大地图
                        if(this.state.BigOrSmall)
                        this.UnUse_Map();
                    }}
                    style={this.state.BigOrSmall ? styles.Big_map : styles.Small_map}
                >
                    <Marker
                        title={'title'}
                        location={this.state.center}
                    ></Marker>
                    {this.state.BigOrSmall ?  markers  : null}
                </MapView>

            </View>
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
            <View style={[styles.item, { backgroundColor: `hsl(${H},50%,30%)` }]}>
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
    Big_map: {
        width: width-20,
        height: height-20,
    },
    Small_map: {
        width: 100,
        height: 100,
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