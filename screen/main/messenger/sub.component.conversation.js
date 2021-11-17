import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// local import
import API from "../../../api/api";

export default function Conversation({ list, currentUserID }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storeID = list.members.find((m) => m !== currentUserID);
    const getStore = async () => {
      try {
        if (storeID !== null) {
          const res = await API.get(`/api/store/${storeID}`);
          setUser(res.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getStore();
  }, [list, currentUserID]);
  return (
    <View style={styles.converContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.profileStore} source={{ uri: user.profileURL }} />
      </View>
      <Text>{user.storeName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  converContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "96%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: "#0073e6",
    backgroundColor: "#ccc",
    overflow: "hidden",
    marginRight: 10,
  },
  profileStore: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
