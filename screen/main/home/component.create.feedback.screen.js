import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Rating } from "react-native-ratings";
import API from "../../../api/api";

import Color from "../../../config/Color";

export default function CreateFeedbackScreen({ navigation, route }) {
  const { datas, storeID } = route.params;
  const { userID, driverFullname, driverProfile } = datas;
  // states variables
  const [feedback, setFeedback] = useState("");
  const [numberOfStar, setNumberOfStar] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const data = {
    driverId: userID,
    storeId: storeID,
    name: driverFullname,
    profile: driverProfile,
    feedback: feedback,
    rate: numberOfStar,
  };

  // post feedback data

  const postFeedback = async () => {
    try {
      if (feedback.length < 5) {
        setIsLoading(false);
        setErrMessage("Feedback is too short make it atleast 5 characters");
      }
      const res = await API.post("/api/feedback/create", data);
      if (res.data) {
        setIsLoading(false);
        setErrMessage(null);
        navigation.goBack("FeedbackScreen");
      }
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View styles={styles.mainContainer}>
        <View style={styles.top}>
          <View style={styles.profileCircle}>
            <Image
              source={{ uri: driverProfile }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.nameTxt}>{driverFullname}</Text>
          </View>
        </View>
        <View style={styles.feedbackInputContainer}>
          <TextInput
            style={{
              textAlign: "justify",
              color: "#111111",
              width: "100%",
            }}
            placeholder="write feedback here ..."
            multiline={true}
            value={feedback}
            onChangeText={(value) => setFeedback(value)}
          />
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            type="star"
            ratingCount={5}
            ratingColor="#FE5F55"
            startingValue={numberOfStar}
            imageSize={30}
            onSwipeRating={(value) => setNumberOfStar(value)}
            onStartRating={(value) => setNumberOfStar(value)}
            onFinishRating={numberOfStar}
          />
          <Text style={{ color: "#999999", marginTop: 10, fontWeight: "700" }}>
            ({numberOfStar})
          </Text>
        </View>
        {errMessage ? (
          <Text
            style={{
              width: "95%",
              textAlign: "center",
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#ffcccc",
              color: "#ff3333",
              alignSelf: "center",
            }}
          >
            {errMessage}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            postFeedback();
            setIsLoading(true);
          }}
          disabled={feedback.length <= 0 ? true : false}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={Color.white} />
          ) : (
            <Text style={styles.txtSubmit}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 50,
  },
  nameTxt: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    textTransform: "capitalize",
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderWidth: 2,
    borderColor: Color.secondary,
    backgroundColor: Color.secondary,
    overflow: "hidden",
  },
  feedbackInputContainer: {
    backgroundColor: "#e6e6e6",
    padding: 20,
    width: "95%",
    alignSelf: "center",
  },
  ratingContainer: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    // backgroundColor: "#ffffff",
    padding: 10,
  },
  submitBtn: {
    width: "95%",
    padding: 10,
    backgroundColor: Color.secondary,
    borderRadius: 5,
    alignSelf: "center",
    height: 50,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  txtSubmit: {
    textTransform: "uppercase",
    textAlign: "center",
    color: Color.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
