import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { GlobalContext } from '../../context/GlobalContext'

const TaxiCalled = () => {
  //make a counter like 05:00,04:59,04:58... to 00:00
  const [counterMinutes, setCounterMinutes] = useState(5);
  const [counterSeconds, setCounterSeconds] = useState(0);
  const { setMarkerCoordinate,
    setRouteDetails,
    setBottomSheetSnap,
    setIsTaxiFound,
    setIsTaxiCalled,
  } = useContext(GlobalContext);

  const clearButtonPress = () => {
    setMarkerCoordinate(null);
    setRouteDetails(null);
    setBottomSheetSnap(0);
    setIsTaxiFound(false);
    setIsTaxiCalled(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counterSeconds === 0) {
        setCounterSeconds(59);
        setCounterMinutes(counterMinutes - 1);
      } else {
        setCounterSeconds(counterSeconds - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }
    , [counterSeconds]);

  return (

    <View style={styles.container}>

      <View style={styles.durationWrapper}>
        <MaterialIcons name="schedule" size={24} color="black" />
        <Text style={styles.durationText}>0{counterMinutes}:{counterSeconds < 10 ? `0${counterSeconds}` : counterSeconds}</Text>
      </View>


      <View style={styles.driverWrapper}>
        <View style={styles.driverImageWrapper}>
          <MaterialIcons name="person" size={24} color="black" />
        </View>
        <View style={styles.driverInfoWrapper}>
          <Text style={styles.driverName}>John Doe</Text>
          <Text style={styles.driverCar}>Toyota Corolla</Text>
        </View>
      </View>
      <View style={styles.driverWrapper}>
        <View style={styles.driverImageWrapper}>
          <MaterialIcons name="person" size={24} color="black" />
        </View>
        <View style={styles.driverInfoWrapper}>
          <Text style={styles.driverName}>James Foo</Text>
          <Text style={styles.driverCar}>Kia Sportage</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelButtonWrapper} onPress={clearButtonPress}>
        <MaterialIcons name="cancel" size={24} color="black" />
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>



    </View>
  )
}

export default TaxiCalled

const styles = StyleSheet.create({
  durationWrapper: {
    backgroundColor: 'white',
    height: 50,
    width: 100,
    marginBottom: 30,
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
  },
  durationText: {
    fontSize: 18,
    marginLeft: 5,
  },
  container: {
    alignSelf: 'center',
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
    fontSize: 12,
    color: 'grey',
  }
})