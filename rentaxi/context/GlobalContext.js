import React, { createContext, useState, useRef, useMemo,useCallback } from 'react';


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
    handleMyLocationButtonPress
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
