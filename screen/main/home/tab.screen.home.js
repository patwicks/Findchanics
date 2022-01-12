import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";
import * as Location from "expo-location";

// icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Local Import`
import Styles from "./styles/style.home";
import API from "../../../api/api";
import { mapStyle, standardMapStyle } from "./maps/CustomMapStyle";

export default function HomeTabScreen({ navigation }) {
  const [data, setData] = useState();
  const [storeID, setStoreID] = useState();

  // Toggles
  const [isToggled, setIsToggled] = useState(false);
  const [toggledTheme, setToggledTheme] = useState(true);

  // location
  let [currentLat, setCurrentLat] = useState();
  let [currentLong, setCurrentLong] = useState();

  // mounting
  let [mounted, setMounted] = useState(false);

  // loading & granted

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mounted) {
      fetchLocationData();
      getCurrentLocation();
    }
    return function cleanup() {
      setMounted(true);
    };
  }, [fetchLocationData, getCurrentLocation]);

  const fetchLocationData = async () => {
    try {
      const result = await API.get("/api/store");
      setData(result.data);
      setIsLoading(false);
      const saveData = await AsyncStorage.setItem(
        "storeLocations",
        JSON.stringify(result.data)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const showAlert = () =>
    Alert.alert(
      "Location not granted",
      "This Application needs your location data for futher use, Thank you.",
      [
        {
          text: "ok",
          onPress: () => getCurrentLocation(),
          style: "cancel",
        },
      ]
    );

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert();
      } else {
        const myLocation = await Location.getCurrentPositionAsync();
        const jsonLocation = JSON.stringify(myLocation);
        const jsonParsed = JSON.parse(jsonLocation);
        setCurrentLat(jsonParsed.coords.latitude);
        setCurrentLong(jsonParsed.coords.longitude);
      }
    } catch (error) {
      console.log("There was an error occured!");
    }
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
          ></MapView>
          <ActivityIndicator
            style={{
              position: "absolute",
            }}
            size="large"
            color="#008ae6"
          />
        </View>
      ) : (
        <View style={Styles.container}>
          <TouchableOpacity
            style={Styles.search}
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Ionicons name="search-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.toggleTheme}
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
              latitude: 15.040212,
              longitude: 120.669593,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.007,
            }}
            customMapStyle={!toggledTheme ? mapStyle : standardMapStyle}
          >
            {data?.map((store) => (
              <View key={store._id}>
                <Marker
                  coordinate={{
                    latitude: store?.latitude,
                    longitude: store?.longitude,
                  }}
                  image={require("../../../assets/images/marker.png")}
                  onPress={() => {
                    setStoreID(store?._id);
                    setIsToggled(true);
                  }}
                >
                  <Callout>
                    <Text>{store?.storeName}</Text>
                  </Callout>
                </Marker>

                {currentLong || currentLat ? (
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
              {data
                ?.filter((store) => store._id === storeID)
                .map((item) => {
                  return (
                    <View key={item._id}>
                      <Image
                        style={Styles.storeCoverPhoto}
                        source={{ uri: item.coverPhotoURL }}
                      />
                      <View style={Styles.itemDetails}>
                        <Text style={Styles.itemStoreName}>
                          {item.storeName}
                        </Text>
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
      )}
    </>
  );
}
