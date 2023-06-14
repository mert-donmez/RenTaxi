import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'

const TaxiCalled = () => {
  return (
    
    <>
    
      <View style={styles.durationWrapper}>
        <MaterialIcons name="schedule" size={24} color="black" />
        <Text style={styles.durationText}>04:39</Text>
      </View>
    </>
  )
}

export default TaxiCalled

const styles = StyleSheet.create({
  durationWrapper:{
    backgroundColor:'white',
    height:50,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  durationText:{
    fontSize:18,
    marginLeft:5,
  }
})