import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Rating } from "react-native-ratings";
import * as geolib from "geolib";

import call from "react-native-phone-call";
// icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Styles from "./styles/style.visit";

export default function VisitStoreScreen({ navigation, route }) {
  const { storeID, userCurrentLat, userCurrentLong } = route.params;
  const [storeData, setStoreData] = useState();
  const [storeData_2, setStoreData_2] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState(null);

  const triggerCall = () => {
    // Check for perfect 10 digit length
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("storeLocations");
      const data_2 = await AsyncStorage.getItem("findLoginCredential");

      const parsedData = JSON.parse(data);
      const parsedData_2 = JSON.parse(data_2);
      setStoreData_2(parsedData_2);
      if (parsedData !== null) {
        setStoreData(parsedData);
        setIsLoading(false);
        return;
      } else {
        console.log("there is no data here");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getData();
    }
    return () => (unmounted = true);
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          style={Styles.loading}
          color="#FE5F55"
          size="large"
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          style={Styles.container}
        >
          {storeData
            .filter((store) => store._id === storeID)
            .map((item) => {
              const distance = geolib.getDistance(
                {
                  latitude: userCurrentLat,
                  longitude: userCurrentLong,
                },
                {
                  latitude: item.latitude,
                  longitude: item.longitude,
                }
              );
              return (
                <View key={item._id}>
                  <View style={Styles.coverPhotoContainer}>
                    <ImageBackground
                      style={Styles.coverPhoto}
                      source={{ uri: item.coverPhotoURL }}
                      blurRadius={1}
                    >
                      <View style={Styles.circleConatainer}>
                        <Image
                          style={Styles.profile}
                          source={{ uri: item.profileURL }}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                  <View style={Styles.itemStoreInformation}>
                    <Text style={Styles.itemStoreName}>{item.storeName}</Text>
                    <View style={Styles.btnContainer}>
                      <TouchableOpacity
                        style={[{ backgroundColor: "#0073e6" }, Styles.itembtn]}
                        onPress={() =>
                          navigation.navigate("Request Service", {
                            storeData: item,
                            userCurrentLat: userCurrentLat,
                            userCurrentLong: userCurrentLong,
                          })
                        }
                      >
                        <Text style={Styles.btnText}>Request Service</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={Styles.btnGallery}
                      onPress={() => {
                        navigation.navigate("Gallery", {
                          gallery: item.gallery,
                        });
                      }}
                    >
                      <FontAwesome name="picture-o" size={20} color="black" />
                      <Text
                        style={{
                          color: "#0073e6",
                          textAlign: "center",
                          marginLeft: 10,
                        }}
                      >
                        View Gallery
                      </Text>
                    </TouchableOpacity>
                    <Text style={Styles.itemHeadText}> Store Information</Text>
                    <View style={Styles.serviceDoneContainer}>
                      <Text style={Styles.serviceDoneText}>Service Done</Text>
                      <Text style={Styles.numberServiceDone}>
                        {item.serviceDone}
                      </Text>
                    </View>
                    <View style={Styles.itemContent}>
                      <MaterialCommunityIcons
                        name="map-marker-distance"
                        size={24}
                        color="#404040"
                      />
                      <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                        Distance: {geolib.convertDistance(distance, "km")} km
                      </Text>
                    </View>

                    <View style={Styles.itemContent}>
                      <MaterialCommunityIcons
                        name="license"
                        size={24}
                        color={
                          item.fullyVerified === true ? "#33ff77" : "#ff3333"
                        }
                      />
                      {item.fullyVerified === true ? (
                        <Text
                          style={{
                            marginLeft: 10,
                            fontWeight: "600",
                          }}
                        >
                          Verified
                        </Text>
                      ) : (
                        <Text
                          style={{
                            marginLeft: 10,
                            fontWeight: "600",
                          }}
                        >
                          Unverified
                        </Text>
                      )}
                    </View>
                    <View style={Styles.itemContent}>
                      <MaterialIcons name="store" size={24} color="#404040" />
                      <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                        {item.storeName}
                      </Text>
                    </View>
                    <View style={Styles.itemContent}>
                      <MaterialIcons
                        name="location-on"
                        size={24}
                        color="#404040"
                      />
                      <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                        {item.storeAddress}
                      </Text>
                    </View>
                    <View style={Styles.itemContent}>
                      <MaterialIcons name="email" size={24} color="#404040" />
                      <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                        {item.email}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={Styles.itemContent}
                      onPress={() => {
                        setPhoneNumber(item.contactNo);
                        if (phoneNumber) {
                          triggerCall();
                        }
                      }}
                    >
                      <MaterialIcons name="phone" size={24} color="#0073e6" />
                      <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                        (+63){item.contactNo}
                      </Text>
                    </TouchableOpacity>
                    <Text style={Styles.itemHeadText}>Owner</Text>
                    <View style={[{ marginTop: 10 }, Styles.itemContent]}>
                      <MaterialIcons name="person" size={24} color="#404040" />
                      <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                        {item.firstname} {item.middlename} {item.lastname}
                      </Text>
                    </View>
                    <Text style={Styles.itemHeadText}>Location</Text>
                    <View style={{ width: "100%", height: 200, marginTop: 20 }}>
                      <MapView
                        style={Styles.map}
                        initialRegion={{
                          latitude: 15.0594,
                          longitude: 120.6567,
                          latitudeDelta: 0.1922,
                          longitudeDelta: 0.0421,
                        }}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <Marker
                          coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                          }}
                          pinColor="red"
                        >
                          <Callout>
                            <Text>{item.storeName}</Text>
                          </Callout>
                        </Marker>
                      </MapView>
                    </View>
                    <Text style={[{ marginVertical: 15 }, Styles.itemHeadText]}>
                      Services
                    </Text>
                    <View style={Styles.itemServiceContainer}>
                      {item.services.map((service, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              width: "100%",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <MaterialIcons
                              name="home-repair-service"
                              size={20}
                              color="black"
                            />
                            <Text
                              style={{
                                paddingVertical: 8,
                                color: "#404040",
                                marginLeft: 10,
                              }}
                            >
                              {service}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    {/* Star Rating Record */}
                    <View style={Styles.ratingContainer}>
                      <Text style={Styles.txtServiceRating}>
                        Service Rating
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10,
                          fontSize: 30,
                          color: "#111111",
                          fontWeight: "900",
                        }}
                      >
                        {item.rating}
                      </Text>
                      <Rating
                        type="star"
                        ratingCount={5}
                        ratingColor="#FE5F55"
                        startingValue={5}
                        imageSize={40}
                      />
                    </View>
                    <TouchableOpacity
                      style={Styles.btnReviews}
                      onPress={() => {
                        navigation.navigate("Feedback", {
                          data: storeData_2,
                          store_id: storeID,
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: "blue",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        View Reviews
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}
