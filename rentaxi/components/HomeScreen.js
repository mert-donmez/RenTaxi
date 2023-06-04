import React, { useCallback, useMemo, useRef,useState,useEffect } from "react";
import { View, Text, StyleSheet,Image, SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView from "react-native-maps";
import {MaterialIcons} from '@expo/vector-icons';

const HomeScreen = () => {
  const snapPoints = useMemo(() => ["20%", "50%"], []);
  

  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      mapType="terrain" 
      userInterfaceStyle="light" 
      showsUserLocation={true} 
      userLocationPriority={'high'}
      showsCompass={false}
      showsTraffic={true}
       
       >
        <View style={styles.titleWrapper}>
            <View style={{backgroundColor:'white',height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:50,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,}}>
                <MaterialIcons name="menu" size={40}/>
            </View>
            <Image source={require('../assets/images/profile.png')} style={styles.profilePicture}/>
        </View>

        
            <View style={styles.addressWrapper}>
                <MaterialIcons name="search" size={30} style={{marginLeft:10}} />
                <View style={styles.whereYouGoingWrapper}>
                <Text style={styles.addressText}>Where are you going ?</Text>
                <View style={styles.divider}/>
                </View>
                
            </View>
           
        

      
      </MapView> 
      {/* <BottomSheet 
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomModalstyle}
      >
        <View style={styles.contentContainer}>
          <Text>Test</Text>
        </View>
      </BottomSheet>  */}
    </View>
  );
};

const styles = StyleSheet.create({
    titleWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginTop:70,
    },
    profilePicture:{
        width:40,
        height:40,
        borderRadius:40,
    },
    whereYouGoingWrapper:{
        justifyContent:'center',
    },
    divider:{
        height:StyleSheet.hairlineWidth,
        backgroundColor:'black',
        marginTop:5,
        marginLeft:10,
        width:'100%'
    },
    addressText:{
        marginLeft:10,
        color:'grey',
        fontSize:20,
    },
    addressTextWrapper:{
        backgroundColor:'#DDE6ED',
        marginHorizontal:20,
        height:30,
        justifyContent:'center',
        borderRadius:5,

    },
    
    profilePicture:{
        height:60,
        width:60,
        borderRadius:60,
    },
    addressWrapper:{
        position:'absolute',
        marginHorizontal:20,
        backgroundColor:'white',
        height:50,
        alignItems:'center',
        borderRadius:10,
        bottom:'10%',
        width:'90%',
        flexDirection:'row',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
        
       


    },
  bottomModalstyle: {
    
  },
  container:{
    flex:1
  },
 
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
