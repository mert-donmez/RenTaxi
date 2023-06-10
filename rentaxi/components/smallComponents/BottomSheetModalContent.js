import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'


const BottomSheetModalContent = ({routeDetails,calculateFare,handleMyLocationButtonPress,markerCoordinate}) => {
  return (
    <>
      <TouchableOpacity style={styles.myLocationButtonWrapper} onPress={handleMyLocationButtonPress} >
            <MaterialIcons
              name="my-location"
              size={25}
              style={styles.myLocationButton}
            />
          </TouchableOpacity> 
        <View style={styles.addressWrapper}>
        
          <View style={styles.whereYouGoingWrapper}>
            <MaterialIcons
              name="near-me"
              size={20}
              style={{ marginLeft: 10 }}
              color={"grey"}
            />
            <View style={styles.addressTitleWrapper}>
              
              <Text style={styles.addressText}>Your Location</Text>
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
              
              <Text style={styles.addressText}>{markerCoordinate ? 'Selected on Map' : 'Select on Map'}</Text>
            </View>
            
          </View>
          {
            routeDetails && (
              <>
                <View style={styles.routeDetailsWrapper}>
                    <View>
                        <Text>Distance</Text>
                        <Text>4.9 km</Text>
                    </View>
                    <View>
                    <Text>Distance</Text>
                        <Text>4.9 km</Text>
                    </View>
                    <View>
                    <Text>Distance</Text>
                        <Text>4.9 km</Text>
                    </View>
                </View>
          </>
            )
            
          }
          
        </View>
    </>
  )
}

export default BottomSheetModalContent

const styles = StyleSheet.create({
    routeDetailsWrapper:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:30,
        
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
        marginTop:50,
        
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
        color: "black",
        fontSize: 15,
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