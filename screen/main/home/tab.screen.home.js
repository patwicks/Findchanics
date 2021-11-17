import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import API from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";
import * as Location from "expo-location";
// icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Local Import`
import Styles from "./styles/style.home";
import { mapStyle, standardMapStyle } from "./maps/CustomMapStyle";

export default function HomeTabScreen({ navigation }) {
  const [storeLocations, setStoreLocations] = useState([]);
  const [storeID, setStoreID] = useState();
  const [isToggled, setIsToggled] = useState(false);
  const [toggledTheme, setToggledTheme] = useState(true);

  // location
  let [currentLat, setCurrentLat] = useState();
  let [currentLong, setCurrentLong] = useState();

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchLocationData();
      getData();
    }
    return () => {
      unmounted = true;
    };
  }, [fetchLocationData, getData]);
  useEffect(() => {
    fetchLocationData();
    getData();
  }, [fetchLocationData, getData]);

  useEffect(() => {
    getCurrentLocation();
  }, [currentLong, currentLat]);
  // err

  const fetchLocationData = async () => {
    try {
      const result = await API.get("/api/store");

      if (result.data !== null) {
        const saveData = await AsyncStorage.setItem(
          "storeLocations",
          JSON.stringify(result.data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== "granted") {
        console.log("Location not granted");
        return;
      } else {
        const myLocation = await Location.getCurrentPositionAsync();

        const jsonLocation = JSON.stringify(myLocation);
        const jsonParsed = JSON.parse(jsonLocation);
        setCurrentLat(jsonParsed.coords.latitude);
        setCurrentLong(jsonParsed.coords.longitude);
      }
    } catch (error) {
      console.log("There was an error on finding current Location!");
    }
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("storeLocations");
      const parsedData = JSON.parse(data);
      if (parsedData !== null) {
        setStoreLocations(parsedData);
      } else {
        console.log("there is no data here");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          padding: 5,
          top: 60,
          left: 20,
          zIndex: 1,
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <Ionicons name="search-outline" size={20} color="#111111" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          padding: 5,
          top: 60,
          right: 20,
          zIndex: 1,
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setToggledTheme(!toggledTheme)}
      >
        {!toggledTheme ? (
          <Ionicons name="moon" size={25} color="#ffff1a" />
        ) : (
          <Ionicons name="sunny-sharp" size={25} color="#ffff1a" />
        )}
      </TouchableOpacity>
      <MapView
        style={Styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 15.0594,
          longitude: 120.6567,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={!toggledTheme ? mapStyle : standardMapStyle}
      >
        {storeLocations.map((store) => (
          <View key={store._id}>
            <Marker
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              image={require("../../../assets/images/marker.png")}
              onPress={() => {
                setStoreID(store._id);
                setIsToggled(true);
              }}
            >
              <Callout>
                <Text>{store.storeName}</Text>
              </Callout>
            </Marker>

            {currentLong && currentLat ? (
              <Marker
                coordinate={{
                  latitude: currentLat,
                  longitude: currentLong,
                }}
                pinColor="#008ae6"
              >
                <Callout>
                  <Text>You</Text>
                </Callout>
              </Marker>
            ) : null}
          </View>
        ))}
      </MapView>
      {/* Store details container */}
      {isToggled ? (
        <View style={Styles.clickedStoreContainer}>
          <TouchableOpacity
            style={Styles.closeIcon}
            onPress={() => setIsToggled(false)}
          >
            <AntDesign name="closecircle" size={15} color="#FE5F55" />
          </TouchableOpacity>
          {storeLocations
            .filter((store) => store._id === storeID)
            .map((item) => {
              return (
                <View key={item._id}>
                  <Image
                    style={Styles.storeCoverPhoto}
                    source={{ uri: item.coverPhotoURL }}
                  />
                  <View style={Styles.itemDetails}>
                    <Text style={Styles.itemStoreName}>{item.storeName}</Text>
                    <View style={Styles.itemRatingContainer}>
                      <Text style={Styles.itemRatingText}>Rating: </Text>
                      <Rating
                        type="star"
                        ratingCount={5}
                        ratingColor="#FE5F55"
                        startingValue={5}
                        imageSize={15}
                      />
                      <Text style={Styles.itemNumberStars}>
                        ({item.rating})
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={Styles.btnVisitStore}
                      onPress={() => {
                        navigation.navigate("Visit", {
                          storeID: storeID,
                          userCurrentLat: currentLat,
                          userCurrentLong: currentLong,
                        });
                        setIsToggled(false);
                      }}
                    >
                      <Text style={Styles.btnVisitText}>Visit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      ) : null}
      {/* Main container at bottom */}
    </View>
  );
}
