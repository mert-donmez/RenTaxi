import { StyleSheet, Text, View,TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons,FontAwesome } from "@expo/vector-icons";


const HomeScreenTitles = ({routeDetails,clearButtonPress}) => {
  return (
    <>
      
        {
          routeDetails === null ? 
          <View style={styles.menuIconWrapper}>
          <MaterialIcons name="menu" size={30} color={'white'} />
        </View>
        :
        

        <TouchableOpacity onPress={clearButtonPress} style={[styles.menuIconWrapper,{backgroundColor:'black'}]}>
          <FontAwesome name="angle-left" size={30} color={'white'}/>
        </TouchableOpacity >

        
        }
        
        
        
      
    </>
  )
}

export default HomeScreenTitles

const styles = StyleSheet.create({
    
      menuIconWrapper: {
        backgroundColor: "black",
        height: '5%',
        width: '10%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation:5,
        position: "absolute",
        top: '10%',
        left: '5%',
        zIndex: 1,

      },
      searchAddressWrapper: {
        backgroundColor: "white",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation:5
      },
})