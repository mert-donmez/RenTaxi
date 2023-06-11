import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {MaterialIcons,FontAwesome,FontAwesome5} from '@expo/vector-icons'


const CallATaxiModalContent = ({routeDetails,calculateFare,setIsTaxiFound}) => {
  return (
    <>
      {/* <TouchableOpacity style={styles.myLocationButtonWrapper} onPress={handleMyLocationButtonPress} >
            <MaterialIcons
              name="my-location"
              size={25}
              style={styles.myLocationButton}
            />
          </TouchableOpacity>  */}
        <View style={styles.addressWrapper}>
        
          <View style={styles.whereYouGoingWrapper}>
            <MaterialIcons
              name="near-me"
              size={20}
              style={{ marginLeft: 10 }}
              color={"grey"}
            />
            <View style={styles.addressTitleWrapper}>
              
              <Text style={styles.addressText}>Start Location</Text>
              <Text style={[styles.addressText,{color:'black',marginTop:5,fontSize:14}]}>{routeDetails ? routeDetails.legs[0].start_address : 'Your Location'}</Text>
            </View>
          </View>
          <View style={styles.middleDividerWrapper}>
            <MaterialIcons
              name="more-vert"
              size={20}
              style={{ marginLeft: 10 }}
              color={"grey"}
            />
            <View style={styles.divider} />
          </View>
          <View style={styles.whereYouGoingWrapper}>
            <MaterialIcons
              name="near-me"
              size={20}
              style={{ marginLeft: 10 }}
              color={"black"}
            />
            <View style={styles.addressTitleWrapper}>
              
            <Text style={styles.addressText}>End Location</Text>
              <Text style={[styles.addressText,{color:'black',marginTop:5,fontSize:14}]}>{routeDetails ? routeDetails.legs[0].end_address : 'Select on Map'}</Text>
            </View>
            
          </View>
          {
            routeDetails && (
              <>
                <View style={styles.routeDetailsWrapper}>
                    <View>
                        <Text style={styles.routeDetailsTitle}>Distance</Text>
                        <Text style={styles.routeDetailssubTitle}>{routeDetails.distance.toFixed(2)} km</Text>
                    </View>
                    <View style={styles.verDivider} />
                    <View>
                    <Text style={styles.routeDetailsTitle}>Price</Text>
                        <Text style={styles.routeDetailssubTitle}>{calculateFare()} $</Text>
                    </View>
                    <View style={styles.verDivider} />
                    <View>
                    <Text style={styles.routeDetailsTitle}>Arrival</Text>
                        <Text style={styles.routeDetailssubTitle}>in {routeDetails.duration.toFixed(0)} min</Text>
                    </View>
                </View>
                <View style={styles.horDivider} />

                <TouchableOpacity style={styles.getTaxiButtonWrapper} onPress={()=>{setIsTaxiFound(true)}}>
                  <MaterialIcons name='hail' size={25} color={'white'} />
                      <Text style={styles.callTaxiText}>Call a Taxi</Text>
                </TouchableOpacity>
                
          </>
            )
            
          }
          
        </View>
    </>
  )
}

export default CallATaxiModalContent

const styles = StyleSheet.create({
  callTaxiText:{
    color:'white',
    fontSize:25,
    fontWeight:'600',
    marginLeft:5,
  },
  getTaxiButtonWrapper:{
    backgroundColor:'black',
    height:70,
    marginHorizontal:30,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginTop:20,
  },
    horDivider:{    
        height:StyleSheet.hairlineWidth,
        backgroundColor:'grey',
        marginTop:10,
        marginHorizontal:30,
    },
    routeDetailsTitle:{
        color:'grey',
        fontSize:16,
        fontWeight:'300',
        marginBottom:5,

    },
    routeDetailssubTitle:{
        fontSize:16,
        fontWeight:'500'
    },
    routeDetailsWrapper:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:30,
    },
    verDivider:{
        height:'100%',
        width:0.5,
        backgroundColor:'grey'
    },
    myLocationButtonWrapper: {
        position: "absolute",
        right: 20,
        top: 10,
        backgroundColor: "white",
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
        zIndex: 1,
        elevation:5
      },
      addressWrapper: {
        flex:1,
        
      },
      whereYouGoingWrapper: {
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 20,
        
      },
      addressTitleWrapper: {
        marginLeft: 20,
      },
      upperTitle: {
        color: "grey",
        fontSize: 10,
      },
      addressText: {
        color: "grey",
        fontSize: 13,
        marginRight:80,
      },
      middleDividerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginVertical: 5,
      },
      divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "black",
        marginLeft: 10,
        width: "50%",
      },

})