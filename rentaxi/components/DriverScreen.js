//driver screen
import React,{useContext,useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import MapView, { Marker } from "react-native-maps";
import { SecretTokens } from "../SecretTokens";
import MapViewDirections from "react-native-maps-directions";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { GlobalContext } from '../context/GlobalContext';
import BottomSheet from "@gorhom/bottom-sheet";
import HomeScreenTitles from './smallComponents/HomeScreenTitles';



const DriverScreen = ({navigation}) => {
    const {snapPoints,
        mapViewRef,
        bottomSheetRef,
        markerCoordinate, setMarkerCoordinate,mapRegion, setMapRegion,
        bottomSheetSnap} = useContext(GlobalContext);
        const [customerLocations, setCustomerLocations] = useState([]);

        //set driver location gaziantep:
        const [currentLocation, setCurrentLocation] = useState({
            latitude: 37.06622,
            longitude: 37.38332,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
            });

            


            useEffect(() => {
                const randomCustomerLocations = [];
                for (let i = 0; i < 5; i++) {
                    let randomLatitude =
                        currentLocation.latitude + (Math.random() - 0.5) * 0.1;
                    let randomLongitude =
                        currentLocation.longitude + (Math.random() - 0.5) * 0.1;
                    randomCustomerLocations.push({
                        latitude: randomLatitude,
                        longitude: randomLongitude,
                    });
                    }
                    setCustomerLocations(randomCustomerLocations);

            }, [currentLocation]);

        const customerInfos = (name,min,) =>{
            return(
                <View style={styles.driverWrapper}>
                    <View style={styles.driverImageWrapper}>
                        <MaterialIcons name="person" size={24} color="black" />
                    </View>
                    <View style={styles.driverInfoWrapper}>
                        <Text style={styles.driverName}>{name}</Text>
                        <Text style={styles.driverCar}>{min} min</Text>
                    </View>
                </View>
            )
        }

        

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

          const drawRouteForCustomer = (customerLocation) => {
            if (mapViewRef.current && customerLocation) {
              const routeCoordinates = [currentLocation, customerLocation];
              mapViewRef.current.fitToCoordinates(routeCoordinates, {
                edgePadding: { top: 100, right: 50, bottom: 600, left: 50 },
                animated: true,
              });
            }
          }
          
            const getDistance = (location1, location2) => {
                const lat1 = location1.latitude;
                const lon1 = location1.longitude;
                const lat2 = location2.latitude;
                const lon2 = location2.longitude;
                const R = 6371;
                const dLat = ((lat2 - lat1) * Math.PI) / 180;
                const dLon = ((lon2 - lon1) * Math.PI) / 180;
                const a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = R * c;
                return d * 1000;
              }


  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
        <HomeScreenTitles navigation={navigation} driver={true} />
        <MapView
        ref={mapViewRef}
        style={{
          flex: 1,
        }}
        provider="google"
        showsUserLocation={false}
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
        {customerLocations.map((customerLocation, index) => (
          <Marker
            key={index}
            coordinate={customerLocation}
            title={`Customer ${index + 1}`}
            description={`${
                Math.round(
                    (getDistance(currentLocation, customerLocation) / 1000) * 100
                ) / 100
                } km away`}

            pinColor="black"
          />
        ))}{
            <Marker
            coordinate={currentLocation}
            title="You"
            description="Your location"
            pinColor="green"
          />
        }
        {customerLocations.map((customerLocation, index) => (
          <MapViewDirections
            key={index}
            origin={currentLocation}
            destination={customerLocation}
            apikey={SecretTokens.googleMapsAPIKey}
            strokeWidth={3}
            strokeColor="black"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onReady={(result) => {
              drawRouteForCustomer(customerLocation);
            }}
            onError={(errorMessage) => {
              console.log("GOT AN ERROR", errorMessage);
            }}
          />
        ))}
      </MapView>
        <BottomSheet
            backgroundComponent={(props) => <BottomSheetBackground {...props} />}
            ref={bottomSheetRef}
            index={bottomSheetSnap}
            snapPoints={snapPoints}
            style={[styles.bottomModalstyle, { position: "absolute" }]}
        >
            <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10,color:'white'}}>Active Customers</Text>
            {customerInfos('Customer 1',5)}
            {customerInfos('Customer 2',10)}
            {customerInfos('Customer 3',5)}
            {customerInfos('Customer 4',7)}
            {customerInfos('Customer 5',4)}


      <TouchableOpacity style={styles.cancelButtonWrapper}>
        <MaterialIcons name="cancel" size={24} color="black" />
        <Text style={styles.cancelText}>End Shift</Text>
      </TouchableOpacity>
           
        </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    map: {
        flex: 1,
      },
      cancelButtonWrapper: {
        backgroundColor: 'white',
        height: 50,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 50,
      },
      cancelText: {
        fontSize: 22,
        marginLeft: 5,
      },
      driverWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        borderWidth: 2,
        borderColor: 'green',
        width: 300,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      driverImageWrapper: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      driverInfoWrapper: {
        marginLeft: 10,
      },
      driverName: {
        fontSize: 18,
      },
      driverCar: {
        fontSize: 16,
        color: 'grey',
      },
        bottomModalstyle: {
            justifyContent:'center',
            alignItems:'center',
        },

});

export default DriverScreen