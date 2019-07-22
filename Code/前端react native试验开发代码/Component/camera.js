'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , TouchableWithoutFeedback , Dimensions, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { captureScreen, captureRef } from "react-native-view-shot";
import axios from 'axios';
import {decode as atob, encode as btoa} from 'base-64';


import Feather from "react-native-vector-icons/Feather";

export default class Camera11 extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      shotamount : 0,
      currentBlood: 100,
    },
    this.mainViewRef = React.createRef();
  }

  componentDidMount(){/*
    var script1 = document.createElement('script');
          script1.type = 'text/javascript';
          script1.async = true;
          script1.src = 'facepp_sdk/jquery.min.js';
          document.head.appendChild(script1);    
    var script2 = document.createElement('script');
          script2.type = 'text/javascript';
          script2.async = true;
          script2.src = 'facepp_sdk/exif.js';
          document.head.appendChild(script2);    
    var script3 = document.createElement('script');
          script3.type = 'text/javascript';
          script3.async = true;
          script3.src = 'facepp_sdk/facepp_sdk.js';
          document.head.appendChild(script3);    
          */
  }

  async capturePicture(){
    if (this.camera) {
      const options = { quality: 0.5 , base64 : true , width : 1280};
      const photo = await this.camera.takePictureAsync(options);
      //console.log(photo.uri);
      //alert("h: " + photo.height +"w: " + photo.width);
      //console.warn(photo);
      this.sendphoto(photo);
    }      
  };
  
  async sendphoto(photo){
    
    const _this = this;

    const url = "https://api-cn.faceplusplus.com/humanbodypp/v1/detect";

    let data = {
      api_key : 'xqYKV2nwumRpfBxbF0THCxW0mNzZqUnC',
      api_secret : '73DpLjoIhxTsq-NN56we4NM-7Kf-lc8b',
      image_base64 : photo.base64,
    }

    const formData = new FormData();
    formData.append('api_key',data.api_key);
    formData.append('api_secret',data.api_secret);
    formData.append('image_base64',data.image_base64);
    formData.append('return_attributes','gender,upper_body_cloth,lower_body_cloth');
    
    var res ;

    await    axios({
      url: url,
      method: 'POST',
      cache: false,
      data: formData,
      processData: false,
      contentType: false,
      timeout: 20000,//20秒超时时间
      
    }
    )
            .then(function (response) {
                // handle success
                res = response.data;
                //alert(JSON.stringify(res.time_used));
                //console.warn(res.time_used);
            })
            .catch(function (error) {
                // handle error
                alert(error);
                //console.warn(error);
            })
            .then(function () {
                // always executed
            });
    this.handleResponse(res.humanbodies);
    
  }

  handleResponse(people){

    var person1 = [];
    var shot = 0;
    const preShot = this.state.shotamount;
    people.forEach( person => {
      var rect = person.humanbody_rectangle;
      if(rect.left < 640 && rect.left + rect.width > 640)
      {
        if(rect.top < 480 && rect.top + rect.height > 480)
        {
          person1.push(person);
          shot++;
        }
      }
    });
    this.setState(
      {
        shotamount : preShot + shot
      }
    )
    alert(JSON.stringify(person1));
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={StyleSheet.absoluteFill}>
          <TouchableWithoutFeedback>
            <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , marginBottom : 40 }}>
              <Feather
                name={'crosshair'}
                size={76}
                color={'black'}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.info}>
              <Text style={{ fontSize: 20 }}>
                {'有效击中人数：'+this.state.shotamount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text style={{ fontSize: 20 }}>
                {'当前血量：'+this.state.currentBlood}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.capture}>
            <Feather
              name={'target'}
              size={36}
              color={'black'}
              onPress={this.capturePicture.bind(this)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
   
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  info: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginLeft: 15,
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 40,
    marginBottom: 20,
  },
  focus: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
});