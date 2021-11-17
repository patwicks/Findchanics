import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import API from "../../../api/api";

export default function CreatePost({ navigation, route }) {
  const inputRef = createRef();
  const { currentUser } = route.params;
  const { _id, firstname, lastname, middlename, profileURL, accountType } =
    currentUser;
  const fullname = `${firstname} ${middlename} ${lastname}`;
  const [images, setImages] = useState([]);
  const [postMessage, setPostMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
  const clearImages = () => {
    setImages([]);
  };

  const handleSubmitPost = async () => {
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

      formData.append("userId", _id);
      formData.append("userName", fullname);
      formData.append("userProfile", profileURL);
      formData.append("userPostText", postMessage);
      formData.append("userType", accountType);

      const res = await API.post("/api/post/create", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data) {
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <Text style={styles.txtHead}>Text:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.txtPostInput}
            keyboardType="ascii-capable"
            numberOfLines={5}
            multiline={true}
            value={postMessage}
            onChangeText={(v) => setPostMessage(v)}
          />
        </View>
        <Text style={styles.txtHead}>Add attachment</Text>
        <View style={styles.topIconContainer}>
          <TouchableOpacity style={styles.addPhoto} onPress={pickerImage}>
            <MaterialCommunityIcons
              name="image-plus"
              size={24}
              color="#111111"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto} onPress={clearImages}>
            <MaterialCommunityIcons
              name="notification-clear-all"
              size={24}
              color="#111111"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.imgMain}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {images.length > 0 ? (
            <>
              {images?.map((uriImg, index) => (
                <View style={styles.imageBox} key={index}>
                  <Image
                    key={index}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                    source={{ uri: uriImg }}
                  />
                </View>
              ))}
            </>
          ) : null}
        </ScrollView>
        <TouchableOpacity
          style={styles.btnPost}
          onPress={() => {
            setIsLoading(true);
            handleSubmitPost();
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text
              style={{
                textTransform: "uppercase",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              Post
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  txtHead: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: "700",
    color: "#999999",
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "100%",
    height: 150,
    padding: 10,
    overflow: "scroll",
    backgroundColor: "#e6e6e6",
  },
  txtPostInput: {
    width: "100%",
    height: "100%",
  },
  topIconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addPhoto: {
    paddingHorizontal: 10,
  },
  imgMain: {
    width: "100%",
    padding: 10,
  },
  imageBox: {
    width: 50,
    height: 50,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 5,
  },
  btnPost: {
    width: "90%",
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#0073e6",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
});
