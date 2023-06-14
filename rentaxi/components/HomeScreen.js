import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SecretTokens } from "../secretTokens/SecretTokens";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import HomeScreenTitles from "./smallComponents/HomeScreenTitles";
import CallATaxiModalContent from "./smallComponents/CallATaxiModalContent";
import AfterTaxiFound from "./smallComponents/AfterTaxiFound";
import TaxiCalled from "./smallComponents/TaxiCalled";

const HomeScreen = () => {
  const snapPoints = useMemo(() => ["20%", "50%", "60%"], []);
  const mapViewRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [bottomSheetSnap, setBottomSheetSnap] = useState(0);
  const [isTaxiFound,setIsTaxiFound] = useState(false);
  const [isTaxiCalled,setIsTaxiCalled] = useState(false);
  

  const clearButtonPress = () => {
    setMarkerCoordinate(null);
    setRouteDetails(null);
    setBottomSheetSnap(0);
    setIsTaxiFound(false);
  };



  const handleDirectionReady = (result) => {
    setRouteDetails(result);
    drawRoute();
  };

  const drawRoute = () => {
    if (mapViewRef.current && markerCoordinate) {
      const routeCoordinates = [location.coords, markerCoordinate];
      mapViewRef.current.fitToCoordinates(routeCoordinates, {
        edgePadding: { top: 100, right: 50, bottom: 600, left: 50 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (routeDetails) {
      setBottomSheetSnap(1);
    }
  }, [routeDetails]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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

  let text = "Waiting..";
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
      const fare = (
        baseFare +
        timeRate * time +
        distanceRate * distance
      ).toFixed(2);
      return fare;
    }
    return 0;
  };

  const BottomSheetBackground = ({ style }) => {
    return (
      <View
        style={[
          {
            backgroundColor: "black",
            borderRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },
          { ...style },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <HomeScreenTitles routeDetails={routeDetails} clearButtonPress={clearButtonPress} />
      <MapView
        ref={mapViewRef}
        style={{
          flex: 1,
          
        }}
        provider="google"
        
        showsUserLocation={true}
        userLocationPriority="high"
        showsMyLocationButton={false}
        showsCompass={false}
        customMapStyle={SecretTokens.mapStyles}
        maxZoomLevel={17}
        minZoomLevel={10}
        onPress={(e) => {
          setMarkerCoordinate(e.nativeEvent.coordinate);
        }}
        initialRegion={mapRegion}
        followsUserLocation={true}
      >
        {markerCoordinate && (
          <>
            <Marker coordinate={markerCoordinate} />
            <MapViewDirections
              origin={location.coords}
              destination={markerCoordinate}
              apikey={SecretTokens.googleMapsAPIKey}
              strokeWidth={4}
              strokeColor="black"
              onReady={handleDirectionReady}
            />
          </>
        )}
      </MapView>

      <BottomSheet
        backgroundComponent={(props) => <BottomSheetBackground {...props} />}
        ref={bottomSheetRef}
        index={bottomSheetSnap}
        snapPoints={snapPoints}
        style={[styles.bottomModalstyle, { position: "absolute" }]}
      >
        <>
        {
          isTaxiFound ===false && 
          <CallATaxiModalContent
          routeDetails={routeDetails}
          calculateFare={calculateFare}
          handleDirectionReady={handleDirectionReady}
          handleMyLocationButtonPress={handleMyLocationButtonPress}
          markerCoordinate={markerCoordinate}
          setIsTaxiFound={setIsTaxiFound}
        />
        }
        {
          isTaxiFound && isTaxiCalled === false ?
        <AfterTaxiFound setIsTaxiFound={setIsTaxiFound} setIsTaxiCalled={setIsTaxiCalled}/>
        :
        <TaxiCalled />
        }
        
        
        </>
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

  bottomModalstyle: {
    zIndex: 1,
    elevation: 1,
    borderRadius: 30,
  },
});

export default HomeScreen;
