import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../../api/api";

// local imports
import Styles from "./style.profile";

// icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileTabScreen({ navigation }) {
  // State Variables
  const [profileImage, setProfileImage] = useState("");
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // Userdata
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [middlename, setMiddlename] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [contactNo, setContactNo] = useState();
  const [accountType, setAccountType] = useState();
  const [profileUrl, setProfileUrl] = useState();

  // Pick image profile
  const profilePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
    }
  };
  // Upload image Profile
  const uploadImageProfile = () => {
    const formData = new FormData();
    formData.append("profile", {
      // temporary data, it will change it backend
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/png",
    });

    API.post("/api/driver/upload", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authtoken: token,
      },
    })
      .then((response) => {
        return fetchUserData();
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  // handle back Press device

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("findLoginCredential");
      const parsedData = JSON.parse(data);
      const { userID, userToken } = parsedData;
      setId(userID);
      setToken(userToken);
    } catch (e) {
      console.log(e);
    }
  };

  //   Fetch user data
  const fetchUserData = async () => {
    await API.get(`/api/driver/${id}`)
      .then((response) => {
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setMiddlename(response.data.middlename);
        setGender(response.data.gender);
        setAge(response.data.age);
        setEmail(response.data.email);
        setContactNo(response.data.contactNo);
        setProfileUrl(response.data.profileURL);
        setAccountType(response.data.accountType);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Logout User
  const logoutuser = async () => {
    try {
      await AsyncStorage.removeItem("findLoginCredential");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    fetchUserData();
  });
  return (
    <View style={Styles.mainContainer}>
      <ImageBackground
        source={{ uri: profileUrl }}
        style={Styles.topProfile}
        blurRadius={4}
      >
        <View style={Styles.circleContainer}>
          {profileImage ? (
            <Image style={Styles.profileImage} source={{ uri: profileImage }} />
          ) : (
            <Image style={Styles.profileImage} source={{ uri: profileUrl }} />
          )}
          <TouchableOpacity style={Styles.editProfile} onPress={profilePicker}>
            <MaterialIcons name="mode-edit" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {/* button Upload */}
        {profileImage ? (
          <TouchableOpacity
            style={Styles.btnUpload}
            onPress={() => {
              uploadImageProfile();
              setProfileImage(null);
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                textTransform: "uppercase",
                textAlign: "center",
                fontFamily: "Poppins-SemiBold",
              }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        ) : null}
        {/* Fetch loding indicator */}
        {isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : null}
        <Text style={Styles.topName}>
          {firstname} {lastname}
        </Text>
        <Text style={{ textAlign: "center", color: "#0073e6" }}>
          ( {accountType} )
        </Text>
      </ImageBackground>
      {/* +++++++++++++++++++++++++ Pesonal Infomation ++++++++++++++++++++++++++++ */}
      <View style={Styles.infoContainer}>
        <View style={Styles.infoHeadTextContainer}>
          <Text style={{ fontSize: 15, textTransform: "uppercase" }}>
            Personal Information
          </Text>
        </View>
        <ScrollView
          style={Styles.detailsContainer}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
        >
          <View style={Styles.nameContainer}>
            <FontAwesome
              name="user-circle"
              size={24}
              color="#8c8c8c"
              style={{ paddingRight: 20 }}
            />
            <View>
              <Text style={Styles.info}>
                <Text>Fullname: </Text> {firstname} {middlename} {lastname}
              </Text>
              <Text style={Styles.info}>
                <Text>Gender: </Text> {gender}
              </Text>
              <Text style={Styles.info}>
                <Text>Age: </Text> {age}
              </Text>
            </View>
          </View>
          <View style={Styles.emailPhoneContainer}>
            <MaterialCommunityIcons
              name="email"
              size={24}
              color="#8c8c8c"
              style={{ paddingRight: 20 }}
            />
            <Text style={Styles.info}>{email}</Text>
          </View>
          <View style={Styles.emailPhoneContainer}>
            <FontAwesome
              name="phone"
              size={24}
              color="#8c8c8c"
              style={{ paddingRight: 20 }}
            />
            <Text style={Styles.info}>(+63){contactNo}</Text>
          </View>
          <TouchableOpacity
            style={Styles.btnLogout}
            onPress={() => {
              logoutuser();
              Alert.alert(
                "Logout",
                "Fully restart and remove the application on task list to Login again!",
                [{ text: "OK", onPress: () => BackHandler.exitApp() }]
              );
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
