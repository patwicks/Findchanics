import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import io from "socket.io-client";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// local imports
import Color from "../../../config/Color";
import API from "../../../api/api";

// window size
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Message({ route }) {
  //route paramater from convo list
  const { convoID, currentUserID, list } = route.params;
  const [image, setImage] = useState("");
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const socket = useRef();
  // Automatic Scroll for sending/receiving new messages
  const scroller = useRef();

  // New Message Content
  const sendNewMessage = {
    sender: currentUserID,
    text: newMessage,
    conversationId: convoID,
  };

  useEffect(() => {
    socket.current = io("https://talyer-socket-server.herokuapp.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        image: data.image,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const userType = "driver";
    if (currentUserID !== null) {
      socket.current.emit("addUser", currentUserID, userType);
    }
  }, [currentUserID]);

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  //  list?.members.includes(arrivalMessage.sender) &&
  useEffect(() => {
    const getMessage = async () => {
      try {
        if (convoID !== null) {
          const res = await API.get(`/api/message/${convoID}`);
          setMessage(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [convoID]);

  const handleSubmitMessage = async () => {
    const receiverId = list?.members.find((member) => member !== currentUserID);

    socket.current.emit("sendMessage", {
      senderId: currentUserID,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage === " " || /\s/.test(newMessage)) {
        return;
      }
      const res = await API.post("/api/message/plain", sendNewMessage);
      setMessage([...message, res.data]);
      setNewMessage("");
      clearImage();
    } catch (error) {
      console.log(error);
    }
  };

  const sendImageText = async () => {
    const receiverId = list?.members.find((member) => member !== currentUserID);

    socket.current.emit("sendMessage", {
      senderId: currentUserID,
      receiverId,
      text: newMessage,
      image: image,
    });

    const formData = new FormData();
    formData.append("conversationId", convoID);
    formData.append("sender", currentUserID);
    formData.append("text", newMessage);

    formData.append("image", {
      // temporary data, it will change it backend
      name: new Date() + "_img",
      uri: image,
      type: "image/png",
    });

    try {
      const res = await API.post("/api/message", formData);
      setMessage([...message, res.data]);
      setNewMessage("");
      clearImage();
    } catch (error) {
      console.log(error);
    }
  };

  // choose image to send
  const imageSendPicker = async () => {
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
        setImage(result.uri);
      }
    }
  };

  const clearImage = () => {
    setImage("");
  };
  return (
    <>
      {message[0] ? (
        <>
          {isLoading ? (
            <ActivityIndicator
              color="#404040"
              size="large"
              style={{ alignSelf: "center", marginTop: 20 }}
            />
          ) : (
            <>
              <ScrollView
                ref={scroller}
                onContentSizeChange={() =>
                  scroller.current.scrollToEnd({ animated: true })
                }
              >
                {message?.map((c, index) => {
                  return (
                    <View key={index}>
                      <View style={styles.messageContainer}>
                        <View
                          style={
                            c.sender === currentUserID
                              ? styles.right
                              : styles.left
                          }
                        >
                          {c.image ? (
                            <TouchableOpacity
                              style={styles.messageImage}
                              onPress={() => {
                                setModalVisible(true);
                                setModalImage(c.image);
                              }}
                            >
                              <Image
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  resizeMode: "cover",
                                }}
                                source={{ uri: c.image }}
                              />
                            </TouchableOpacity>
                          ) : null}

                          {/* Modal image */}
                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                          >
                            <View style={styles.modalView}>
                              <TouchableOpacity
                                style={styles.closeModal}
                                onPress={() => setModalVisible(false)}
                              >
                                <Ionicons
                                  name="close"
                                  size={30}
                                  color="#111111"
                                />
                              </TouchableOpacity>

                              <View style={styles.modalImageContainer}>
                                <Image
                                  source={{
                                    uri: modalImage,
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain",
                                  }}
                                />
                              </View>
                            </View>
                          </Modal>
                          <Text
                            style={
                              c.sender === currentUserID
                                ? styles.textRight
                                : styles.textLeft
                            }
                          >
                            {c.text}
                          </Text>
                        </View>
                        <View
                          style={
                            c.sender === currentUserID
                              ? { alignSelf: "flex-end" }
                              : { alignSelf: "flex-start" }
                          }
                        >
                          <Text style={styles.timeAgo}>
                            {moment(c.createdAt).startOf("second").fromNow()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              {image ? (
                <View style={styles.previewImgMessage}>
                  <TouchableOpacity
                    style={styles.clearImage}
                    onPress={clearImage}
                  >
                    <FontAwesome name="close" size={18} color="#ccc" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: image }}
                    style={{
                      resizeMode: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
              ) : null}
            </>
          )}
        </>
      ) : (
        <View style={styles.noMessageContainer}>
          <Text style={styles.noMessage}>
            Start conversation by sending simple Message
          </Text>
        </View>
      )}
      <View style={styles.textInputContainer}>
        <TouchableOpacity
          style={styles.sendPictureContainer}
          onPress={() => imageSendPicker()}
        >
          <FontAwesome name="picture-o" size={20} color="#999" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInputMessage}
          name="newMessage"
          placeholder="Type message here..."
          keyboardType="default"
          multiline={true}
          numberOfLines={2}
          value={newMessage.replace(/\s\s+/g, " ")}
          onChangeText={(value) => setNewMessage(value)}
        />
        <TouchableOpacity
          style={styles.sendIconContainer}
          // onPress={handleSubmitMessage}
          onPress={() => {
            image ? sendImageText() : handleSubmitMessage();
            clearImage();
          }}
        >
          <FontAwesome name="send" size={24} color="#0073e6" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
  },
  left: {
    maxWidth: "70%",
    textAlign: "left",
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 10,
    marginTop: 20,
    borderTopRightRadius: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  right: {
    maxWidth: "70%",
    backgroundColor: Color.secondary,
    padding: 10,
    marginTop: 20,
    borderBottomRightRadius: 5,
    borderRadius: 13,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  textRight: {
    color: Color.white,
    fontFamily: "Poppins-Regular",
  },
  textLeft: {
    color: "#111",
    fontFamily: "Poppins-Regular",
  },
  textInputContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 5,
  },
  sendPictureContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputMessage: {
    flex: 4,
    backgroundColor: Color.level4,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendIconContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  timeAgo: {
    fontSize: 10,
    color: Color.level2,
    width: "40%",
    paddingTop: 5,
  },
  clearImage: {
    position: "absolute",
    zIndex: 99,
    padding: 3,
    right: 3,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
  },
  previewImgMessage: {
    width: 60,
    height: 60,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginLeft: 10,
    position: "relative",
  },
  messageImage: {
    width: windowWidth / 2,
    height: windowHeight / 2.5,
    // borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  noMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 50,
  },
  noMessage: {
    color: "#ccc",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlign: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 35,
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Color.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
  },
  modalImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 20,
    width: windowWidth,
    height: windowHeight,
    // backgroundColor:Color.white
  },
  closeModal: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 99,
  },
});
