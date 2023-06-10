import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MapView from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { SecretTokens } from "../secretTokens/SecretTokens";

const HomeScreen = () => {
  const snapPoints = useMemo(() => ["20%", "50%"], []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        userInterfaceStyle="dark"
        showsUserLocation={true}
        userLocationPriority={"high"}
        showsCompass={false}
        customMapStyle={SecretTokens.mapStyles}
      >
        <View style={styles.titleWrapper}>
          <View
            style={{
              backgroundColor: "white",
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <MaterialIcons name="menu" size={40} />
          </View>
          
        </View>
        <View style={styles.searchAddressWrapper}>
            <MaterialIcons name="search" size={25} style={{marginHorizontal:10,}}/>
            <Text style={styles.whereToText}>Where To ?</Text>
        </View>
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
              color={'grey'}
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
              <Text style={styles.addressText}>Select Address</Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
    whereToText:{
        fontSize:20,
    },
    searchAddressWrapper:{
        marginHorizontal:50,
        marginTop:30,
        backgroundColor:'white',
        height:40,
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

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
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 70,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  whereYouGoingWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
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
  addressTextWrapper: {
    backgroundColor: "#DDE6ED",
    marginHorizontal: 20,
    height: 30,
    justifyContent: "center",
    borderRadius: 5,
  },

  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  addressWrapper: {},
  bottomModalstyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    
  },
});

export default HomeScreen;
