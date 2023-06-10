import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions,TextInput } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { SecretTokens } from "../secretTokens/SecretTokens";
import { StatusBar } from "expo-status-bar";
import * as Location from 'expo-location';

const HomeScreen = () => {
  const snapPoints = useMemo(() => ["30%", "50%", "70%"], []);
  const mapViewRef = useRef(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null); 

  
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

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.titleWrapper}>
        <View style={styles.menuIconWrapper}>
          <MaterialIcons name="menu" size={30} />
        </View>
        <View style={styles.searchAddressWrapper}>
          <MaterialIcons name="search" size={25} style={{ marginHorizontal: 10 }} />
          <TextInput placeholder="Where To ?" placeholderTextColor={'black'} style={{fontSize:20}} />
        </View>
      </View>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        provider="google"
        userInterfaceStyle="dark"
        showsUserLocation={true}
        userLocationPriority="high"
        showsCompass={false}
        customMapStyle={SecretTokens.mapStyles}
        onPress={(e) => {
            setMarkerCoordinate(e.nativeEvent.coordinate)
        }}
        initialRegion={mapRegion}
        followsUserLocation={true}
      >
        {markerCoordinate && (
          <Marker
            coordinate={markerCoordinate}
          />
        )}
      </MapView>
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomModalstyle}
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
              <Text style={styles.addressText}>{markerCoordinate ? markerCoordinate.latitude  : 'Select Coordinate'}</Text>
            </View>
          </View>
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
    marginBottom:50,
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
  bottomModalstyle: {},
  addressWrapper: {},
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
  addressText: {
    color: "black",
    fontSize: 16,
  },
});

export default HomeScreen;
