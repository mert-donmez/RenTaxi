import { StyleSheet, Text, View,TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons,FontAwesome } from "@expo/vector-icons";


const HomeScreenTitles = ({routeDetails,clearButtonPress}) => {
  return (
    <>
      <View style={styles.titleWrapper}>
        {
          routeDetails === null ? 
          <View style={styles.menuIconWrapper}>
          <MaterialIcons name="menu" size={30} />
        </View>
        :
        

        <TouchableOpacity onPress={clearButtonPress} style={[styles.menuIconWrapper,{backgroundColor:'black'}]}>
          <FontAwesome name="angle-left" size={30} color={'white'}/>
        </TouchableOpacity >

        
        }
        
        {
          routeDetails === null && (
            <View style={styles.searchAddressWrapper}>
          <MaterialIcons name="search" size={25} style={{ marginHorizontal: 10 }} />
          
          <TextInput placeholder="Where To ?" placeholderTextColor={'black'} style={{ fontSize: 20 }} />
        </View>
          )
        }
        
      </View>
    </>
  )
}

export default HomeScreenTitles

const styles = StyleSheet.create({
    titleWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 70,
        zIndex: 1,
      },
      menuIconWrapper: {
        backgroundColor: "white",
        marginBottom: 10,
        height: 40,
        width: 40,
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
        elevation:5
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