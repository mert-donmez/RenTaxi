import { SafeAreaView, StyleSheet, Text, View,Image,TouchableOpacity,TextInput } from 'react-native'
import React,{useState,useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import {MaterialIcons}from '@expo/vector-icons'
import { GlobalContext } from '../context/GlobalContext';

const LoginScreen = ({navigation}) => {

  const {email,password,handleLogin,setEmail,setPassword,userInfo} = useContext(GlobalContext);
  const [error,setError] = useState('');


  const handleClickLoginButton = async () => {
    if (email && password) {
    let res = await handleLogin();
    if (res.status) {
      if(res.data.role === 'driver'){
        navigation.navigate('Driver');
      }
      else{
        navigation.navigate('Home');
      }
    }else{
      setError(res.message);
    }

  }
  else{
    setError('Please fill all the fields');
  }
  }



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
      <Text style={styles.componentName}>Login</Text>
      <View style={styles.registerFormWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput placeholder='Email' style={styles.textInput} placeholderTextColor={'black'} onChangeText={(text)=>setEmail(text)} value={email}/>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder='Password' style={styles.textInput} placeholderTextColor={'black'} secureTextEntry={true} onChangeText={(text)=>setPassword(text)} value={password}/>
        </View>
      </View>
      {
        error && <Text style={{color:'red',textAlign:'center',marginVertical:'5%'}}>{error}</Text>
      }
      <TouchableOpacity style={styles.registerButton} onPress={handleClickLoginButton}>
        <Text style={styles.registerButtonText}>Login</Text>
        <MaterialIcons name='arrow-forward-ios' size={20} color={'black'}/>
      </TouchableOpacity>
     
      <View style={{justifyContent:'center',alignItems:'center',marginVertical:'5%'}}>
        <Text style={{color:'grey',fontSize:16}}>Don't you have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
          <Text style={{color:'#F29727',fontSize:16}}>Register</Text>
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
    </View>
  )
}

export default LoginScreen

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