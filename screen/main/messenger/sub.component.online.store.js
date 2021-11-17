import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  Dimensions,
} from "react-native";

// icons
import { FontAwesome5 } from "@expo/vector-icons";

// local imports
import Color from "../../../config/Color";
import API from "../../../api/api";
import Offline from "./sub.component.offline";

// window size
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function OnlineStore({ storeOnline, navigation, senderId }) {
  const [storeList, setStoreList] = useState(null);
  const [online, setOnline] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestCreate, setRequestCreate] = useState(false);
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState(null);

  const data = {
    senderId,
    receiverId,
  };
  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  useEffect(() => {
    const getonline = () => {
      if (storeList === null || storeOnline === null) {
        return;
      } else {
        const r = storeList.filter((item) =>
          storeOnline.find(({ userId }) => item._id === userId)
        );
        setOnline(r);
      }
    };
    getonline();
  }, [storeList, storeOnline]);

  const fetchStore = async () => {
    try {
      const res = await API.get("/api/store");
      setStoreList(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // create room
  const createRoom = async () => {
    try {
      if (senderId !== null) {
        const res = await API.post("/api/conversation", data);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <>
      <View style={styles.topHead}>
        <FontAwesome5
          name="store"
          style={{ marginRight: 5 }}
          size={15}
          color={Color.level3}
        />
        <Text style={styles.onlineTopText}>Talyer Shops & Stores</Text>
      </View>
      {online.length === 0 ? (
        <Offline navigation={navigation} storeList={storeList} />
      ) : (
        <>
          {online ? (
            <ScrollView
              style={styles.container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {online.map((store, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.circle}
                    onPress={() => {
                      setReceiverId(store._id);
                      setProfile(store.profileURL);
                      setName(store.storeName);
                      setModalOpen(true);
                    }}
                  >
                    <View style={styles.imageBox}>
                      <Image
                        style={styles.storeImage}
                        source={{ uri: store.profileURL }}
                      />
                    </View>
                    <View style={styles.onlineIndicatorOuter}>
                      <View style={styles.onlineIndicatorInner}></View>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
              >
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
                          setModalOpen(false);
                          setRequestCreate(false);
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
                        <Text style={[styles.txt, { color: "#cccccc" }]}>
                          Cancel
                        </Text>
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
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="#111" />
          )}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ padding: 10, color: "#999" }}>Messages</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Stores", {
                  stores: storeList,
                  senderId: senderId,
                });
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 12,
                  color: "#0099ff",
                  textDecorationLine: "underline",
                }}
              >
                View store
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "13%",
  },
  topHead: {
    backgroundColor: "rgba(0,0,0,0.01)",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  onlineTopText: {
    color: Color.secondary,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: Color.secondary,
    marginLeft: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  onlineIndicatorOuter: {
    position: "absolute",
    backgroundColor: "#e6e6e6",
    padding: 3,
    borderRadius: 200,
    bottom: -5,
    right: 10,
  },
  onlineIndicatorInner: {
    padding: 6,
    borderRadius: 200,
    backgroundColor: "#00e673",
  },
  imageBox: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    overflow: "hidden",
  },
  storeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
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
});
