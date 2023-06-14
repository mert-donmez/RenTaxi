import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { taxiDriversData } from '../../assets/Data/DATA';
import { MaterialIcons,FontAwesome } from "@expo/vector-icons";
import { FlatList } from 'react-native-gesture-handler';



const TaxiDriversMenu = ({item}) => (
    
   <TouchableOpacity style={[styles.driversMenuWrapper,{marginLeft: item.id ==1 ? 30 : 0}]}>
    <View style={[styles.topWrapper,{backgroundColor:item.id == 1 ? '#B7B7B7' :'#B7B7B7' }]}>
    <Image source={item.image} style={styles.carImageStyle} resizeMode='contain'/>
    </View>
    <View style={styles.bottomWrapper}>
        
        <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>{item.type}</Text>
            <Text style={styles.priceText}>${item.price}</Text>
        </View>
        <View style={styles.durationWrapper}>
            <Text style={styles.durationText}>{item.duration} min</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <MaterialIcons name='person' size={20} color="grey" />
            <Text style={styles.durationText}>{item.people}</Text>
            </View>
        </View>
    </View>
   </TouchableOpacity>
  );


const AfterTaxiFound = ({setIsTaxiFound,setIsTaxiCalled}) => {

    const renderItem = ({item}) => {

        return (
          <TaxiDriversMenu
          item={item}
          />
 
        );
      };
    
  return (
    <View>
    <FlatList
        data={taxiDriversData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        
      />
      <TouchableOpacity style={styles.cardButton}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../assets/images/masterCard.png')} style={{width:30,height:30,marginLeft:40}} resizeMode='contain' />
        <Text style={[styles.cardNumberText,{marginLeft:10}]}>**** 1334</Text>
        </View>
        <Text style={[styles.cardNumberText,{marginRight:40}]}>change</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getTaxiButtonWrapper} onPress={()=>{setIsTaxiCalled(true)}}>
                      <Text style={styles.callTaxiText}>Order Now</Text>
                </TouchableOpacity>
                
      
    </View>
  )
}

export default AfterTaxiFound

const styles = StyleSheet.create({
    callTaxiText:{
        color:'white',
        fontSize:25,
        fontWeight:'600',
        marginLeft:5,
      },
      getTaxiButtonWrapper:{
        backgroundColor:'#F29727',
        height:70,
        marginHorizontal:30,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:20,
      },
    cardNumberText:{
        color:'grey',
        fontSize:20,
        
    },
    driversMenuWrapper:{
        flex:1,
        backgroundColor:'#E8E2E2',
        marginHorizontal:30,
        width:280,
        height:150,
        borderRadius:20,
        borderWidth:0.5,
        marginTop:30,
        
    },
    topWrapper:{
        height:'50%',
        width:'80%',
        borderTopLeftRadius:20,
        borderBottomRightRadius:20,

    },
    priceWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    durationWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:40,
    },
    priceText:{
        fontSize:20,
        fontWeight:'500',
        marginHorizontal:40,
        marginTop:10,
        marginBottom:10,
        color:'black'
    },
    durationText:{
        fontSize:20,
        color:'grey'
        
    },
    carImageStyle:{
        width:250,
        height:250,
        position:'absolute',
        top:-90,
      
    },
    cardButton:{
        backgroundColor:'white',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:0.5,
        height:70,
        marginTop:30,
        marginHorizontal:30,
        borderRadius:20,
        flexDirection:'row',
    }

})