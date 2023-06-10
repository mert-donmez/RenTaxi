import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { SecretTokens } from "../secretTokens/SecretTokens";
import { StatusBar } from "expo-status-bar";
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";


const HomeScreen = () => {
  const snapPoints = useMemo(() => ["25%", "50%", "65%"], []);
  const mapViewRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [bottomSheetSnap, setBottomSheetSnap] = useState(0);

  const handleDirectionReady = (result) => {
    setRouteDetails(result);
  };

  useEffect(() => {
    if (routeDetails) {
      setBottomSheetSnap(1)
    }
  }, [routeDetails]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const handleMyLocationButtonPress = useCallback(() => {
    if (mapViewRef.current && location) {
      mapViewRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  const calculateFare = () => {
    if (routeDetails) {
      const baseFare = 3.55;
      const timeRate = 0.14;
      const distanceRate = 4.55;
      const distance = routeDetails.distance;
      const time = routeDetails.duration;
      const fare = (baseFare + (timeRate * time) + (distanceRate * distance)).toFixed(2);
      return fare;
    }
    return 0;
  };
  


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.titleWrapper}>
        <View style={styles.menuIconWrapper}>
          <MaterialIcons name="menu" size={30} />
        </View>
        {
          routeDetails === null && (
            <View style={styles.searchAddressWrapper}>
          <MaterialIcons name="search" size={25} style={{ marginHorizontal: 10 }} />
          <TextInput placeholder="Where To ?" placeholderTextColor={'black'} style={{ fontSize: 20 }} />
        </View>
          )
        }
        
      </View>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        provider="google"
        userInterfaceStyle="dark"
        showsUserLocation={true}
        userLocationPriority="high"
        showsMyLocationButton={false}
        showsCompass={false}
        customMapStyle={SecretTokens.mapStyles}
        maxZoomLevel={17}
        minZoomLevel={10}
        onPress={(e) => {
          setMarkerCoordinate(e.nativeEvent.coordinate)
        }}
        initialRegion={mapRegion}
        followsUserLocation={true}
        
      >
        {markerCoordinate && (
          <>
          <Marker
            coordinate={markerCoordinate}
            />
            <MapViewDirections
          origin={location.coords}
          destination={markerCoordinate}
          apikey={SecretTokens.googleMapsAPIKey}
          strokeWidth={4}
          strokeColor="green"
          onReady={handleDirectionReady}
        />
            </>
        )}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetSnap}
        snapPoints={snapPoints}
        style={styles.bottomModalstyle}
        handleComponent={() => (
          <TouchableOpacity style={styles.myLocationButtonWrapper} onPress={handleMyLocationButtonPress} >
            <MaterialIcons
              name="my-location"
              size={25}
              style={styles.myLocationButton}
              
            />
          </TouchableOpacity>
        )}
      >
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
              
              {/* {routeDetails && (
  <View>
    <Text>Tahmini Varış Süresi: {routeDetails.duration.toFixed(0)}dk</Text>
    <Text>Toplam Mesafe: {routeDetails.distance.toFixed(2)}</Text>
  </View>
)} */}


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
              You will arrive in {routeDetails.duration.toFixed(0)} minutes{'\n'}
                Distance {routeDetails.distance.toFixed(2)} KM
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
      </BottomSheet>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
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
    marginBottom: 50,
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
  },
  whereToText: {
    fontSize: 20,
  },
  bottomModalstyle: {
    zIndex: 1,
    elevation: 1,
    borderWidth:1,
    borderRadius:10,
  },
  addressWrapper: {
    marginTop:20,
    
  },
  whereYouGoingWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    
  },
  upperTitle: {
    color: "grey",
    fontSize: 10,
  },
  addressTitleWrapper: {
    marginLeft: 20,
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
  divider2:{
    height: StyleSheet.hairlineWidth,
    backgroundColor: "black",
    marginHorizontal:50,
    marginVertical:20,
  },
  addressText: {
    color: "black",
    fontSize: 16,
  },
  myLocationButtonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
    elevation: 1,
  },
  myLocationButton: {},
});

export default HomeScreen;
