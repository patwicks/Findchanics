import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// local import
import API from "../../../api/api";

// window size
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function StoreList({ route, navigation }) {
  const { stores } = route.params;
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [requestCreate, setRequestCreate] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [error, setError] = useState(null);
  const [senderData, setSenderData] = useState([]);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("findLoginCredential");
      const parsedData = JSON.parse(data);
      if (parsedData !== null) {
        setSenderData(parsedData);
      } else {
        setSenderData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    senderId: senderData.userID,
    receiverId: receiverId,
  };

  const createRoom = async () => {
    try {
      if (data !== null) {
        const res = await API.post("/api/conversation", data);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {stores?.map((store, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: store.profileURL }}
                />
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.nameTxt}
              >
                {store.storeName}
              </Text>
              <TouchableOpacity
                style={styles.msgBtn}
                onPress={() => {
                  setReceiverId(store._id);
                  setProfile(store.profileURL);
                  setName(store.storeName);
                  setModalOpen(true);
                }}
              >
                <Text style={{ textAlign: "center", color: "#999" }}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Modal image */}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={styles.modalView}>
          <View style={styles.modalTop}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: profile }} />
            </View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            Start the conversation by creating a Message Room!
          </Text>

          {requestCreate ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: "#bfbfbf",
                    alignSelf: "center",
                    padding: 8,
                  },
                ]}
                onPress={() => {
                  createRoom();
                  setTimeout(() => {
                    navigation.navigate("Conversation");
                  }, 1000);
                }}
              >
                <Text style={styles.txt}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    alignSelf: "center",
                    padding: 8,
                    borderWidth: 2,
                    borderColor: "#cccccc",
                  },
                ]}
                onPress={() => {
                  setRequestCreate(false);
                }}
              >
                <Text style={[styles.txt, { color: "#cccccc" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#0073e6" }]}
                onPress={() => {
                  setRequestCreate(true);
                }}
              >
                <Text style={styles.txt}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#ff0000" }]}
                onPress={() => setModalOpen(false)}
              >
                <Text style={styles.txt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  itemContainer: {
    width: "100%",
    padding: 10,
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0073e6",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nameTxt: {
    fontSize: 16,
    marginLeft: 15,
    width: windowWidth * 0.4,
  },
  msgBtn: {
    width: "25%",
    paddingVertical: 7,
    paddingHorizontal: 5,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    position: "absolute",
    right: 20,
  },
  modalView: {
    marginTop: "20%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 35,
    width: windowWidth * 0.95,
    height: windowHeight * 0.5,
    shadowColor: "#111111",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
  },
  modalTop: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 1,
    color: "#111111",
    marginVertical: 10,
  },
  btnContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "20%",
  },
  btn: {
    width: "40%",
    padding: 12,
    borderRadius: 5,
  },
  txt: {
    color: "#fff",
    fontSize: 14,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
