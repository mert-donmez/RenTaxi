//driver screen
import React,{useContext,useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import MapView, { Marker } from "react-native-maps";
import { SecretTokens } from "../SecretTokens";
import MapViewDirections from "react-native-maps-directions";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { GlobalContext } from '../context/GlobalContext';
import BottomSheet from "@gorhom/bottom-sheet";
import HomeScreenTitles from './smallComponents/HomeScreenTitles';
import io from 'socket.io-client';




const DriverScreen = ({navigation}) => {
    const {snapPoints,
        mapViewRef,
        bottomSheetRef,
        markerCoordinate, setMarkerCoordinate,mapRegion, setMapRegion,
        bottomSheetSnap,userInfo,baseURL} = useContext(GlobalContext);
        const [rideRequest, setRideRequest] = useState(null);
        
        const socket = io('http://localhost:4545');
        
        useEffect(() => {
      socket.on('callTaxi', (data) => {
        setRideRequest({
          email: data.data.email,
          location: (data.data.location),
          destination: (data.data.destination),
        });
      
        console.log('New Ride Call:', data);
      });


    return () => {
        socket.off('callTaxi');
    };
  }, [rideRequest]);



        const [currentLocation, setCurrentLocation] = useState({
            latitude: 37.06622,
            longitude: 37.38332,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
            });

            useEffect(() => {
                socket.on('callTaxi', (data) => {
                  console.log('New Ride !!!:', data);
                });
              return () => {
                if (userInfo.role === 'driver') {
                  socket.off('callTaxi');
                }
              };
            }, [userInfo]);

              
              

            

        const customerInfos = (name,min) =>{
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
        initialRegion={currentLocation}
        followsUserLocation={true}
      >
            <Marker
            coordinate={currentLocation}
            title="You"
            description="Your location"
            pinColor="green"
          />
        {rideRequest && (
        <>
          <Marker
            coordinate={rideRequest.location}
            title="Customer"
            description="Customer location"
            pinColor="blue"
          />

          <MapViewDirections
            origin={currentLocation}
            destination={rideRequest.location}
            apikey={SecretTokens.googleMapsAPIKey}
            strokeWidth={3}
            strokeColor="green"
          />

          <MapViewDirections
            origin={rideRequest.location}
            destination={rideRequest.destination}
            apikey={SecretTokens.googleMapsAPIKey}
            strokeWidth={3}
            strokeColor="red"
          />
          <Marker
            coordinate={rideRequest.destination}
            title="Destination"
            description="Destination location"
            pinColor="red"
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
            <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10,color:'white'}}>Waiting For Ride</Text>
            {rideRequest && customerInfos(rideRequest.email)}


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