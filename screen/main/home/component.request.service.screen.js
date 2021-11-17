import React, { useEffect, useState, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";
import API from "../../../api/api";

// local
import Color from "../../../config/Color";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const winHeight = Dimensions.get("window").height;

export default function RequestServiceScreen({ route, navigation }) {
  // creare Ref input
  const inputRef = createRef();
  // params
  const { storeData, userCurrentLat, userCurrentLong } = route.params;
  const {
    _id: store_id,
    storeName,
    profileURL,
    firstname,
    lastname,
    middlename,
    storeAddress,
    rating,
    services,
    contactNo,
  } = storeData;
  const ownerFullName = `${firstname} ${middlename} ${lastname}`;

  // statehooks
  const [currrentUserId, setCurrentUserId] = useState(null);
  const [reqService, setReqService] = useState([]);
  const [images, setImages] = useState([]);
  const [statementMessage, setStatementMessage] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("pending");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // hooks
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    let unmount = false;
    if (!unmount) {
      getCurrentUserData();
    }

    return () => {
      unmount = true;
    };
  }, []);
  // functions

  const handleClickService = (item, itemIndex) => {
    const checkArrayItem = reqService.includes(item);

    if (!checkArrayItem) {
      return setReqService([...reqService, item]);
    } else {
      const updateArray = reqService.filter((i) => {
        return i !== item;
      });

      return setReqService(updateArray);
    }
  };

  // get userdata from async storage
  const getCurrentUserData = async () => {
    try {
      const result = await AsyncStorage.getItem("findLoginCredential");
      if (result !== null) {
        const { userID } = JSON.parse(result);
        setCurrentUserId(userID);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // selection of image
  const pickerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.cancelled) {
        setImages([...images, result.uri]);
      }
    }
  };
  const handleSubmitRequest = async () => {
    const formData = new FormData();
    try {
      images.forEach((item) => {
        formData.append("image", {
          // temporary data, it will change it backend
          name: new Date() + "_img",
          uri: item,
          type: "image/png",
        });
      });
      reqService.forEach((item) => {
        formData.append("selectedServices[]", item);
      });

      formData.append("senderId", currrentUserId);
      formData.append("receiverId", store_id);
      formData.append("driverLatitude", userCurrentLat);
      formData.append("driverLongitude", userCurrentLong);
      formData.append("statementMessage", statementMessage);
      formData.append("transactionStatus", transactionStatus);

      const res = await API.post("/api/service/request", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const { _id: id } = res.data;
      if (id) {
        setIsSubmitting(false);
        navigation.navigate("Request_Status", {
          requestDataId: id,
          contactNo: contactNo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: "#333333",
            textTransform: "uppercase",
            fontSize: 10,
            fontWeight: "700",
          }}
        >
          Store
        </Text>
        <View style={styles.storeDetailsContainer}>
          <View style={styles.left}>
            <View style={styles.profileContainer}>
              <Image style={styles.profile} source={{ uri: profileURL }} />
            </View>
          </View>
          <View style={styles.right}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", marginVertical: 5 }}
            >
              {storeName}
            </Text>
            <Text style={{ fontSize: 12, color: "#404040" }}>
              Owner: {ownerFullName}
            </Text>
            <Text style={{ fontSize: 12, color: "#404040" }}>
              Address: {storeAddress}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 12, color: "#404040" }}>Rating: </Text>
              <Rating
                type="star"
                ratingCount={5}
                startingValue={5}
                imageSize={13}
                readonly={true}
              />
              <Text style={{ fontSize: 12, color: "#404040" }}>({rating})</Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            color: "#333333",
            textTransform: "uppercase",
            fontSize: 10,
            fontWeight: "700",
          }}
        >
          State Message / Issue(s)
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            multiline={true}
            placeholder="Type the vehicle problem/issue here..."
            placeholderTextColor="#cccccc"
            value={statementMessage}
            onChangeText={(value) => setStatementMessage(value)}
          />
        </View>
        {images.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageMainContainer}
          >
            {images?.map((item, index) => {
              return (
                <View key={index} style={styles.imageBox}>
                  <Image
                    source={{ uri: item }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : null}
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <TouchableOpacity
            style={styles.imageButtonPicker}
            onPress={pickerImage}
          >
            <MaterialIcons
              name="add-photo-alternate"
              size={24}
              color="#333333"
            />
            <Text style={{ color: "#333", marginLeft: 5, fontSize: 10 }}>
              Attach Image
            </Text>
          </TouchableOpacity>
          {images.length > 0 ? (
            <TouchableOpacity
              style={styles.imageButtonPicker}
              onPress={() => setImages([])}
            >
              <MaterialCommunityIcons
                name="refresh"
                size={24}
                color="#333333"
              />
              <Text style={{ color: "#333", marginLeft: 5, fontSize: 10 }}>
                Clear
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text
          style={{
            color: "#333333",
            textTransform: "uppercase",
            fontSize: 10,
            fontWeight: "700",
            marginTop: 30,
          }}
        >
          Services Available
        </Text>
        <View style={styles.servicesContainer}>
          {services?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleClickService(item, index)}
                style={styles.serviceClickContainer}
              >
                <MaterialIcons
                  name="add-box"
                  size={20}
                  color={Color.secondary}
                />
                <Text style={{ color: "#333", marginLeft: 5, fontSize: 12 }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
          {reqService.length !== 0 ? (
            <Text
              style={{
                color: Color.secondary,
                textTransform: "uppercase",
                fontSize: 8,
                fontWeight: "700",
                marginTop: 10,
              }}
            >
              selected
            </Text>
          ) : null}
          {reqService?.map((item, index) => {
            return (
              <View key={index}>
                <Text style={{ color: "#333", marginLeft: 5, fontSize: 10 }}>
                  {index + 1}: {item}
                </Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.submitRequestBtn}
          onPress={() => {
            handleSubmitRequest();
            setIsSubmitting(true);
          }}
          disabled={statementMessage.length <= 0 ? true : false}
        >
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text style={styles.submitRequestTxt}>Submit Request</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    padding: 10,
  },
  storeDetailsContainer: {
    width: "100%",
    height: 110,
    backgroundColor: "#e6e6e6",
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 5,
  },
  left: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    width: "75%",
    height: "100%",
    padding: 5,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: "hidden",
  },
  profile: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  servicesContainer: {
    width: "100%",
    padding: 10,
  },
  serviceClickContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 3,
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: "#e6e6e6",
    padding: 10,
  },
  textInput: {
    width: "100%",
    height: 100,
    fontSize: 12,
  },
  imageButtonPicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginTop: 2,
    width: 120,
    borderRadius: 4,
    padding: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageMainContainer: {
    width: "100%",
  },
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: Color.secondary,
    overflow: "hidden",
    margin: 5,
  },
  submitRequestBtn: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 5,
    backgroundColor: Color.secondary,
    marginVertical: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitRequestTxt: {
    color: Color.white,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
});
