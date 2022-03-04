import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import * as geolib from "geolib";
import API from "../../../api/api";

// icons
import { AntDesign } from "@expo/vector-icons";

export default function SearchScreen({ navigation, route }) {
  const { currentLat, currentLong } = route.params;
  const inputRef = createRef();
  const [inputSearch, setInputSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (inputSearch.length > 0) {
      handleSearch();
      setIsLoading(true);
    }
    if (inputSearch.length <= 0) {
      setResult([]);
    }
  }, [inputSearch]);

  const handleSearch = async () => {
    try {
      const res = await API.get(`/api/store/search?service=${inputSearch}`);
      setResult(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <View style={styles.topSearchBar}>
          <TextInput
            ref={inputRef}
            style={styles.inputSearchStyle}
            placeholder="search services"
            value={inputSearch}
            keyboardType="default"
            onChangeText={(v) => setInputSearch(v)}
          />
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              setIsLoading(true);
              handleSearch();
            }}
          >
            <AntDesign
              style={{ width: " 100%", height: "100%" }}
              name="search1"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ padding: 10, flexGrow: 0.01 }}
        >
          <TouchableOpacity
            style={styles.suggestedServices}
            onPress={() => {
              setInputSearch("car wash");
            }}
          >
            <Text style={styles.suggestedServicesText}>Car wash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestedServices}>
            <Text
              style={styles.suggestedServicesText}
              onPress={() => {
                setInputSearch("chassis");
              }}
            >
              chassis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestedServices}>
            <Text
              style={styles.suggestedServicesText}
              onPress={() => {
                setInputSearch("tint");
              }}
            >
              tint
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestedServices}>
            <Text
              style={styles.suggestedServicesText}
              onPress={() => {
                setInputSearch("balancing");
              }}
            >
              balancing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestedServices}>
            <Text
              style={styles.suggestedServicesText}
              onPress={() => {
                setInputSearch("change oil");
              }}
            >
              change oil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestedServices}>
            <Text
              style={styles.suggestedServicesText}
              onPress={() => {
                setInputSearch("vehicle maintenance");
              }}
            >
              vehicle maintenance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestedServices}>
            <Text
              style={styles.suggestedServicesText}
              onPress={() => {
                setInputSearch("batteries");
              }}
            >
              batteries
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {isLoading ? <ActivityIndicator size="small" color="#111111" /> : null}

        {/* Scroll view part veritical */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
        >
          {result.length !== 0 ? (
            result?.map((res, index) => {
              const distance = geolib.getDistance(
                {
                  latitude: currentLat,
                  longitude: currentLong,
                },
                {
                  latitude: res.latitude,
                  longitude: res.longitude,
                }
              );
              return (
                <TouchableOpacity
                  style={styles.resultContainer}
                  key={index}
                  onPress={() => {
                    navigation.navigate("Visit", {
                      storeID: res._id,
                      userCurrentLat: currentLat,
                      userCurrentLong: currentLong,
                    });
                  }}
                >
                  <View style={styles.left}>
                    <View style={styles.circleContainer}>
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                        source={{ uri: res.profileURL }}
                      />
                    </View>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.storeName}>{res.storeName}</Text>
                    <Text style={styles.subInfo}>{res.storeAddress}</Text>
                    <Text style={styles.subInfo}>
                      Distance: {geolib.convertDistance(distance, "km")} km
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View>
              {inputSearch === "" ? (
                <Text style={{ textAlign: "center", color: "#cccccc" }}>
                  FINDCHANICS
                </Text>
              ) : (
                <Text style={{ textAlign: "center", color: "#cccccc" }}>
                  service not found
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  topSearchBar: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  inputSearchStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 10,
    borderRadius: 45,
    position: "relative",
  },
  searchBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    padding: 10,
    position: "absolute",
    right: 15,
    zIndex: 999,
  },
  resultContainer: {
    width: "95%",
    alignItems: "center",
    alignSelf: "center",
    height: 80,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#e6e6e6",
  },
  left: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    width: "80%",
    height: "100%",
    padding: 10,
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: "#cccccc",
    overflow: "hidden",
  },
  storeName: {
    fontWeight: "700",
    color: "#111111",
    fontSize: 15,
  },
  subInfo: {
    fontSize: 12,
    color: "#404040",
  },
  suggestedServices: {
    borderRadius: 45,
    backgroundColor: "#e6e6e6",
    height: 20,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  suggestedServicesText: {
    fontSize: 12,
    color: "#404040",
  },
});
