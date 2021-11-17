import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  StatusBar,
  Platform,
} from "react-native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import API from "../../../api/api";
// local imports
import Color from "../../../config/Color";
import PostForum from "./component.post.forum";
// refresh wait
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ForumScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [id, setId] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetxhAllPost();
    });
    return unsubscribe;
  }, [navigation, refreshing]);

  useEffect(() => {
    fetxhAllPost();
    getData();
    if (id !== null) {
      getUser();
    }
  }, [refreshing, id]);

  const fetxhAllPost = async () => {
    try {
      const res = await API.get("/api/post/all");
      if (res.data) {
        const dataSort = res.data.sort(function (a, b) {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        setAllPost(dataSort.reverse());
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getData = async () => {
    try {
      const result = await AsyncStorage.getItem("findLoginCredential");
      const { userID } = await JSON.parse(result);
      if (result !== null) {
        setId(userID);
      }
    } catch (error) {
      console.log("There was an error getting the data from AsyncStorage!");
    }
  };

  const getUser = async () => {
    try {
      if (id) {
        const res = await API.get(`/api/driver/${id}`);
        setCurrentUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.createContainer}
          onPress={() => {
            navigation.navigate("CreatePost", {
              currentUser: currentUser,
            });
          }}
        >
          <MaterialIcons name="post-add" size={30} color="#111111" />
          <Text>Create Post</Text>
        </TouchableOpacity>

        <View style={styles.topProfileMainContainer}>
          <TouchableOpacity style={styles.topProfile}>
            <Image
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
              source={{ uri: currentUser?.profileURL }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostForum allPost={allPost} currentUser={currentUser} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    padding: 10,
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "baseline",
  },
  createContainer: {
    width: "50%",
    height: "110%",
    flexDirection: "row",
    alignItems: "center",
  },
  topProfileMainContainer: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  topName: {
    marginRight: 5,
    fontSize: 12,
    color: "#1a1a1a",
    fontWeight: "700",
  },
  topProfile: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: "#1a75ff",
    overflow: "hidden",
  },
  createPostContainer: {
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
});
