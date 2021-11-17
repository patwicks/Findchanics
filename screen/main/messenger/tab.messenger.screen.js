import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Conversation from "./sub.component.conversation";
import OnlineStore from "./sub.component.online.store";
import { io } from "socket.io-client";

import API from "../../../api/api";
// icon
import { MaterialCommunityIcons } from "@expo/vector-icons";

// window size
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MessengerTabScreen({ navigation }) {
  // state variables
  const [id, setId] = useState(null);
  const [storeOnline, setStoreOnline] = useState(null);
  const [conversationList, setConversationList] = useState(null);
  const socket = useRef();

  //useffect hooks

  useEffect(() => {
    socket.current = io("https://talyer-socket-server.herokuapp.com");
  }, []);

  useEffect(() => {
    const userType = "driver";
    if (id !== null) {
      socket.current.emit("addUser", id, userType);
      socket.current.on("getUsers", (users) => {
        if (users) {
          setStoreOnline(
            users.filter((item) => {
              return item.userType === "store";
            })
          );
        }
      });
    }
  }, [id]);

  useEffect(() => {
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

    getData();
    // getConversation();
  }, [id]);
  // migth have a problem
  useEffect(() => {
    const getConversation = async () => {
      try {
        if (id !== null) {
          const res = await API.get(`api/conversation/${id}`);
          const dataSort = res.data.sort(function (a, b) {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
          setConversationList(dataSort.reverse());
        }
        return;
      } catch (e) {
        console.log(e.error);
      }
    };
    getConversation();
  }, [id, conversationList]);
  return (
    <View style={styles.container}>
      <OnlineStore
        storeOnline={storeOnline}
        navigation={navigation}
        senderId={id}
      />
      {!conversationList?.length < 1 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: windowHeight * 0.22 }}
        >
          {conversationList?.map((c, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("Message", {
                  convoID: c._id,
                  currentUserID: id,
                  list: c,
                });
              }}
            >
              <Conversation list={c} currentUserID={id} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: "#ddd",
            width: windowWidth,
            height: windowHeight * 0.7,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#999",
              textAlign: "center",
              letterSpacing: 1,
              width: "100%",
            }}
          >
            Empty Conversation
          </Text>
          <MaterialCommunityIcons
            name="android-messages"
            size={100}
            color="#ccc"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
  },
});
