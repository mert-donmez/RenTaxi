import { SafeAreaView, StyleSheet, Text, View,Image,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {MaterialIcons}from '@expo/vector-icons'
import { Alert } from 'react-native';

const RegisterScreen = ({navigation}) => {
  const termsOfUseAlert = () => {
    Alert.alert(
      "Terms of Use",
      `By using RenTaxi, you agree to the Terms of Use. Please read them carefully.\n\n
      1. You must be 18 years or older to use RenTaxi.\n
      2. You must be a human. Accounts registered by \"bots\" or other automated methods are not permitted.\n
      3. You must provide your legal full name, a valid email address, and any other information requested in order to complete the signup process.\n
      4. You are responsible for maintaining the security of your account and password. We cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.\n
      `,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style:'destructive'
          
        },
        {
          text: "I Agree",
          onPress: () => console.log("I Agree Pressed"),
          style:'default'
          
        },
      ],
      { cancelable: false }
    );
  };

  const privacyPolicyAlert = () => {  
    Alert.alert(
      "Privacy Policy",
      `By using RenTaxi, you agree to the Privacy Policy. Please read them carefully.\n\n
      1. You must be 18 years or older to use RenTaxi.\n
      2. You must be a human. Accounts registered by \"bots\" or other automated methods are not permitted.\n
      3. You must provide your legal full name, a valid email address, and any other information requested in order to complete the signup process.\n
      4. You are responsible for maintaining the security of your account and password. We cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.\n
      `,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style:'destructive',
        },
        {
          text: "I Agree",
          onPress: () => console.log("I Agree Pressed"),
          style:'default',
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar  style='light'/>
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <MaterialIcons name='arrow-back-ios' size={30} color={'white'}/>
        </TouchableOpacity>
        <View style={styles.mainTitleWrapper}>
        <MaterialIcons name='near-me' size={30} color={'#F29727'}/>
            <Text style={styles.mainTitle}>RenTaxi</Text>
        </View>
      </View>
      <Text style={styles.componentName}>Create New Account</Text>
      <View style={styles.registerFormWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput placeholder='Phone Number' style={styles.textInput} placeholderTextColor={'black'}/>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder='Password' style={styles.textInput} placeholderTextColor={'black'} />
        </View>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.registerButtonText}>Register</Text>
        <MaterialIcons name='arrow-forward-ios' size={20} color={'black'}/>
      </TouchableOpacity>
     
      <View style={{justifyContent:'center',alignItems:'center',marginVertical:'5%'}}>
        <Text style={{color:'grey',fontSize:16}}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Text style={{color:'#F29727',fontSize:16}}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}/>
      <Text style={{textAlign:'center',marginBottom:20,fontSize:16,fontWeight:'500',color:'grey'}}>Or Continue with</Text>
      <View style={styles.registerWithSocialWrapper}>
        <TouchableOpacity style={styles.socialIcon}>
          <Image source={require('../assets/images/googleIcon.png')} style={styles.iconStyle}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
        <Image source={require('../assets/images/appleicon.png')} style={styles.iconStyle}/>
        </TouchableOpacity>
        

      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.privacyInfoText}>
        By clicking register you agree to our 
        <TouchableOpacity  onPress={termsOfUseAlert}>
        <Text style={{color:'#F29727',fontSize:16,marginTop:10}}> Terms of Service </Text>
        </TouchableOpacity>
         <Text>and</Text> 
         <TouchableOpacity onPress={privacyPolicyAlert}>
         <Text style={{color:'#F29727',fontSize:16}}> Privacy Policy </Text>
         </TouchableOpacity>

      </Text>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  privacyInfoText:{
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
    color:'grey',
    marginTop:'10%',
  },
  
  socialIcon:{
    height:60,
    width:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderWidth:0.5
}
  ,
  registerWithSocialWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:'30%',

  },
  iconStyle:{
    height:30,
    width:30,
  },
  divider:{
    height:StyleSheet.hairlineWidth,
    backgroundColor:'black',
    marginHorizontal:'10%',
    marginBottom:'5%',
  },
  registerButtonText:{
    color:'black',
    fontSize:20,
  },
  registerButton:{
    backgroundColor:'#F29727',
    marginTop:'10%',
    height:50,
    marginHorizontal:'10%',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',

  },
  componentName:{
    fontSize:30,
    textAlign:'left',
    marginLeft:'10%',
    marginTop:'10%',
    marginBottom:'5%',
    fontWeight:'600'
  },
  inputTitle:{
    fontSize:20,
    marginLeft:'10%',
    marginBottom:10,
  },
  inputWrapper:{
    justifyContent:'center',
    marginTop:'5%',
    borderWidth:0.5,
    height:45,
    marginHorizontal:'10%',
    borderRadius:10,

  },
  textInput:{
    marginLeft:10,
    fontSize:17,
  },
  container:{
    flex:1,
    backgroundColor:'white'
  },
  mainTitle:{
    color:'white',
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
    paddingTop:50,
    paddingHorizontal:'5%',
    backgroundColor:'black',
    height:170,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,

    
  },
})