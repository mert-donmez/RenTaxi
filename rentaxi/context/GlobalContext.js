import React, { createContext, useState, useRef, useMemo,useCallback } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const snapPoints = useMemo(() => ["20%", "50%", "60%"], []);
  const mapViewRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [bottomSheetSnap, setBottomSheetSnap] = useState(0);
  const [isTaxiFound, setIsTaxiFound] = useState(false);
  const [isTaxiCalled, setIsTaxiCalled] = useState(false);
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const baseURL = 'http://localhost:4545';

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/register`, {
        email: email,
        password: password,
      });
      if(res.data.status === true){
        return { status: res.data.status, message: res.data.message };
      }else{
        return { status: res.data.status, message: res.data.message };
      }
    } catch (err) {    
      return { status: false, message: err.message };
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/login`, {
        email: email,
        password: password,
      });
      if(res.data.status === true){
        setUserInfo(res.data.data);
        return { status: res.data.status, message: res.data.message,data: res.data.data };
      }else{
        return { status: res.data.status, message: res.data.message,data: null };
      }
    } catch (err) {    
      return { status: false, message: err.message,data: null };
    }
  }

  const callATaxi = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/callTaxi`, {
        email: userInfo.email,
        location: location.coords,
        destination: markerCoordinate,
      });
      if(res.data.status === true){
        setIsTaxiCalled(true);
        return { status: res.data.status, message: res.data.message };
      }else{
        return { status: res.data.status, message: res.data.message };
      }
    } catch (err) {    
      return { status: false, message: err.message };
    }
  }




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


  const value = {
    snapPoints,
    mapViewRef,
    bottomSheetRef,
    markerCoordinate, setMarkerCoordinate,
    location, setLocation,
    errorMsg, setErrorMsg,
    mapRegion, setMapRegion,
    routeDetails, setRouteDetails,
    bottomSheetSnap, setBottomSheetSnap,
    isTaxiFound, setIsTaxiFound,
    isTaxiCalled, setIsTaxiCalled,
    price, setPrice,
    handleDirectionReady,
    drawRoute,
    handleMyLocationButtonPress,
    handleRegister,
    callATaxi,
    handleLogin,
    email, setEmail,
    password, setPassword,
    userInfo, setUserInfo,
    callATaxi

  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
