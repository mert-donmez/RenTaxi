import { SafeAreaView, StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {MaterialIcons}from '@expo/vector-icons'

const StartAppScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.titleWrapper}>
        <View style={styles.mainTitleWrapper}>
          <MaterialIcons name='near-me' size={30} color={'#F5CE55'}/>
            <Text style={styles.mainTitle}>RenTaxi</Text>
        </View>
        <MaterialIcons name='info' size={20} color={'black'}/>
      </View>
      <View style={styles.divider} />
      <View style={styles.subTitleWrapper}>
        <Text style={styles.mainSubTitleText}>Ride Beyond Convention</Text>
        <Text style={styles.secondarySubTitleText}>Comfortable rides around the city</Text>
      </View>
      <View style={styles.carImageWrapper}>
      <Image source={require('../assets/images/grey-car-top.png')} style={styles.carImage} resizeMode='contain'/>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Start</Text>
        <MaterialIcons name='arrow-forward-ios' color={'white'} size={30}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default StartAppScreen

const styles = StyleSheet.create({
  startButton:{
    position:'absolute',
    bottom:'10%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    borderRadius:20,
    height:'8%',
    width:'80%',
    left:'10%',
    right:'10%',
    flexDirection:'row'
  },
  buttonText:{
    color:'white',
    fontSize:30,
    fontWeight:'500',
  },
  carImageWrapper:{
    alignItems:'center',
    marginTop:'15%',
  },
  carImage:{
    height:'90%',
  },
  subTitleWrapper:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:'20%',
  },
  mainSubTitleText:{
    color:'black',
    fontSize:30,

  },
secondarySubTitleText:{
  color:'grey',
  fontSize:20,
  marginTop:10,

},
  divider:{
    height:StyleSheet.hairlineWidth,
    backgroundColor:'white',
    marginHorizontal:'5%',
    marginTop:'5%',
  },
  container:{
    flex:1,
    backgroundColor:'white',
  
  },
  mainTitle:{
    color:'black',
    fontSize:30,

  },
  mainTitleWrapper:{
    alignItems:'center',
    flexDirection:'row',
  },
  titleWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:'5%',
    marginTop:'10%',
  }
})