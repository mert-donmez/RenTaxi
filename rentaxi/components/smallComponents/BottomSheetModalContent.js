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
              name="my-location"
              size={30}
              style={{ marginLeft: 10 }}
              color={"#54B435"}
            />
            <View style={styles.addressTitleWrapper}>
              <Text style={styles.upperTitle}>PICKUP</Text>
              <Text style={styles.addressText}>Current Location</Text>
            </View>
          </View>
          <View style={styles.middleDividerWrapper}>
            <MaterialIcons
              name="more-vert"
              size={30}
              style={{ marginLeft: 10 }}
              color={"grey"}
            />
            <View style={styles.divider} />
          </View>
          <View style={styles.whereYouGoingWrapper}>
            <MaterialIcons
              name="location-on"
              size={30}
              style={{ marginLeft: 10 }}
              color={"#C21010"}
            />
            <View style={styles.addressTitleWrapper}>
              <Text style={styles.upperTitle}>DROP-OFF</Text>
              <Text style={styles.addressText}>{markerCoordinate ? 'Selected on Map' : 'Select on Map'}</Text>
            </View>
            
          </View>
          {
            routeDetails && (
              <>
          <View style={styles.middleDividerWrapper}>
            <MaterialIcons
              name="more-vert"
              size={30}
              style={{ marginLeft: 10 }}
              color={"grey"}
            />
            <View style={styles.divider} />
          </View>
          
              <View style={[styles.whereYouGoingWrapper]}>
            <MaterialIcons
              name="flag"
              size={30}
              style={{ marginLeft: 10 }}
              color={"orange"}
            />
            <View style={styles.addressTitleWrapper}>
              <Text style={[styles.upperTitle,{fontSize:15}]}>Drive Details</Text>
              <Text style={styles.addressText}>
              {routeDetails.duration.toFixed(0)}min {routeDetails.distance.toFixed(2)} KM
                </Text>
            </View>
          </View>
          <View style={styles.middleDividerWrapper}>
            <MaterialIcons
              name="more-vert"
              size={30}
              style={{ marginLeft: 10 }}
              color={"grey"}
            />
            <View style={styles.divider} />
          </View>
          
              <View style={[styles.whereYouGoingWrapper]}>
            <MaterialIcons
              name="payments"
              size={30}
              style={{ marginLeft: 10 }}
              color={"green"}
            />
            <View style={styles.addressTitleWrapper}>
              <Text style={[styles.upperTitle,{fontSize:15}]}>Payment Details</Text>
              <Text style={styles.addressText}>
              {calculateFare()} USD
                </Text>
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
        fontSize: 16,
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
        width: "80%",
      },

})