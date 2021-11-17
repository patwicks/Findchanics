import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import API from "../../../api/api";
import "react-native-gesture-handler";
import Color from "../../../config/Color";
import PostedFeedback from "./sub.component.posted.feedback";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function FeedbackScreen({ navigation, route }) {
  // params
  const { data, store_id } = route.params;
  const { driverProfile } = data;
  //  states
  const [refreshing, setRefreshing] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (store_id) {
      fetchFeedbacks();
    }
  }, [store_id, refreshing]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFeedbacks();
    });
    return unsubscribe;
  }, [navigation]);

  // fetch the feedback of this store
  const fetchFeedbacks = async () => {
    try {
      const res = await API.get(`/api/feedback/list/${store_id}`);
      setFeedbackList(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.addFeedContainer}>
        <View style={styles.mainBoxImg}>
          <View style={styles.circleImg}>
            <Image
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
              source={{ uri: driverProfile }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.clickInput}
          onPress={() => {
            navigation.navigate("CreateFeedbackScreen", {
              datas: data,
              storeID: store_id,
            });
          }}
        >
          <TextInput
            placeholder="share your feedback here..."
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.postedFeedContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#111111" />
          ) : (
            <PostedFeedback feedbackList={feedbackList} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  addFeedContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBoxImg: { width: "15%" },
  circleImg: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: Color.secondary,
    backgroundColor: Color.secondary,
    overflow: "hidden",
  },
  clickInput: {
    width: "85%",
    paddingHorizontal: 20,
    borderRadius: 45,
    backgroundColor: "#e6e6e6",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  postedFeedContainer: {
    flex: 10,
  },
});
