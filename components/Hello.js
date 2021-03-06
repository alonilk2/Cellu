/**
  * This is the home page class component of CELLU App.
  *
  * @author [Alon Barenboim](https://github.com/alonilk2)
  * @version 1.0.0
 */

import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
    Modal,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  AdBadge,
} from "react-native-admob-native-ads";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-6408045617472378/7907523375', {
  requestNonPersonalizedAdsOnly: true
});
class Hello extends React.Component {
  constructor () {
    super()
    this.state = {
      infoWindow: false,
      modalDatavisible: true,
      loaded: false
    }
    changeNavigationBarColor('transparent', false);
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        this.setState({loaded: true});
      }
      if (type === AdEventType.CLOSED) {
        this.setState({loaded: false});       
        interstitial.load();
      }
    });
    interstitial.load();
  }
  renderInfoWindow = () => {
    if(this.state.infoWindow === true) return (
      <View style={{height: '100%', width: '100%',position:'absolute', zIndex: 5, backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <View style={styles.infoContainer}>
          <Pressable onPress={(e)=>this.setState({infoWindow: false})}>
            <Text style={styles.textInfoBold}> X </Text>
          </Pressable>
          <Image source = {require('../images/logo.png')} style={{width: 150, height: 150, marginTop: '15%'}} />
          <Text style={styles.textInfoBold}>Cellu App</Text>
          <Text style={styles.textInfo}>Version: 1.1.1</Text>
          <Text style={styles.textInfo}> 
          {`           
  המידע המוצג באפליקציה זו נאסף מתוך מאגרי המידע של 
  Govmap.gov.il
  Data.gov.il
  אין מפתחי האפליקציה אחראיים על נכונות ועדכניות המידע המוצג למשתמש.
  ליצירת קשר:
  AlonILK2@Gmail.com
  https://github.com/alonilk2
          `}
          </Text>
        </View>
      </View>)
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <StatusBar translucent backgroundColor='rgba(0,0,0,0)' barStyle='light-content' />
        <ImageBackground source={require('../images/bg.jpg')} style={styles.bg1}>
          <View style={styles.bg}>
          {this.renderInfoWindow()}
            <Pressable onPress={(e) => this.setState({infoWindow: true})} style={styles.infoPressable}>
              <Image source = {require('../images/info-icon.png')} style={ styles.info } />
            </Pressable>
            <View style={{zIndex: 1}}>
              <View style={{alignSelf:'center', marginTop: 50}}>
                <Image source = {require('../images/logo.png')} style={{width: 400, height: 400}} />
              </View>
              <Text style={{alignSelf: 'center', color: 'white', fontFamily: "SF-Pro-Text-Bold"}}>חפש אנטנות לפי...</Text>
              <View style={{flexDirection: 'row'}}>
                <Pressable onPress={(e) =>{
                  if(this.state.loaded) {interstitial.show()};
                  this.props.navigation.navigate('Location');
                  }} style={styles.BtnStyle}>
                  <Text style={styles.txtBtn}>מיקום נוכחי</Text>
                </Pressable>
                <Pressable onPress={(e) => this.props.navigation.navigate('ByAddress')} style={styles.BtnStyleAddr}>
                  <Text style={styles.txtBtnAddr}>כתובת</Text>
                </Pressable>
              </View>
            </View>
          <NativeAdView
              style={{
                width: "95%",
                alignSelf: "center",
                height: 100,
              }}
              adUnitID="ca-app-pub-6408045617472378/2263302691"
            >
              <View
                style={{
                  height: 100,
                  width: "100%",
                }}
              >
                <AdBadge />
                <View
                  style={{
                    height: 100,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <IconView
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  />
                  <View
                    style={{
                      width: "65%",
                      maxWidth: "65%",
                      paddingHorizontal: 6,
                    }}
                  >
                    <HeadlineView
                      style={{
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                    />
                    <TaglineView
                      numberOfLines={1}
                      style={{
                        fontSize: 11,
                      }}
                    />
                    <AdvertiserView
                      style={{
                        fontSize: 10,
                        color: "gray",
                      }}
                    />
                  </View>

                  <CallToActionView
                    style={{
                      height: 45,
                      paddingHorizontal: 12,
                      backgroundColor: "purple",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      elevation: 10,
                    }}
                    textStyle={{ color: "white", fontSize: 14 }}
                  />
                </View>
              </View>
            </NativeAdView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    zIndex: 1
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'rgba(200,200,200,1)',
    marginTop: '18%',
    marginBottom: '15%',
    padding: 20,
    borderRadius: 20,
    marginRight: '5%',
    marginLeft: '5%',
    elevation: 15,
    alignItems: 'center'
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor:'rgba(0,20,100,0.7)',
    paddingTop: '15%'
  },
  bg1: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  info: {
    width: '100%',
    height: '100%', 
    marginRight: '5%',
  },
  infoPressable: {
    width: 30,
    height: 30,
    marginRight: '5%',
    alignSelf: 'flex-end',
    transform: [{translateY: -50}]
  },
  textInfoBold: {
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 20,
    color: 'black',
    textAlign: 'left'
  },
  textInfo: {
    fontFamily: "SF-Pro-Text",
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  BtnStyle: { 
    borderRadius: 50,
    color: 'black',
    backgroundColor: 'white',
    width: '47%',
    height: 70,
    marginTop:'5%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  BtnStyleAddr: {   
    borderRadius: 50,
    borderColor:  '#ff6600',
    borderWidth: 2,
    color: 'black',
    backgroundColor: 'transparent',
    width: '47%',
    height: 70,
    marginTop:'5%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  txtBtn: {
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 20,
    color: '#ff6600'
  },
  txtBtnAddr: {
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 20,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
export default Hello;
