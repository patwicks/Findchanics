import React, { useState, useEffect } from "react";
import {
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import call from "react-native-phone-call";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import Color from "../../../config/Color";

import API from "../../../api/api";

const winWidth = Dimensions.get("screen").width;
const winHeight = Dimensions.get("screen").height;

export default function RequestData({ data, contact, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imagesModal, setImagesModal] = useState([]);
  const [status, setStatus] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  // make a phone call
  const triggerCall = () => {
    // Check for perfect 10 digit length
    const args = {
      number: contact,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  //   data for rooms
  const dataRoomMember = {
    senderId,
    receiverId,
  };

  const { transactionStatus, transactionMember, _id } = data[0];

  useEffect(() => {
    setStatus(transactionStatus);
    setReceiverId(transactionMember[1]);
    setSenderId(transactionMember[0]);
    setServiceId(_id);
    setMsg(null);
    setErr(null);
  }, [status, data]);

  // functions
  const createRoom = async () => {
    try {
      if (senderId !== null && receiverId !== null) {
        const res = await API.post("/api/conversation", dataRoomMember);
      }
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  const cancelRequest = async () => {
    try {
      if (serviceId) {
        const res = await API.patch(`/api/service/cancel/${serviceId}`, {
          transactionStatus: "cancelled",
        });
        setMsg(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   ask for confirmation to cancel request
  const cancelAlert = () => {
    Alert.alert("Hold on!", "Are you sure you want to cancel your request?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          cancelRequest();
        },
      },
    ]);
    return true;
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <View key={index}>
            <View style={styles.statementContainer}>
              <Text style={styles.headTitle}>Problem</Text>
              <Text style={styles.statementText}>{item.statementMessage}</Text>
            </View>
            <Text style={styles.headTitle}>Service (s) Requested</Text>
            {item.selectedServices.map((serv, index) => (
              <View style={styles.serviceContainer} key={index}>
                <MaterialIcons
                  name="home-repair-service"
                  size={18}
                  color="#333"
                />
                <Text style={styles.serviceText}>{serv}</Text>
              </View>
            ))}

            <Text style={styles.headTitle}>Attached Images</Text>
            <View style={styles.attachedImgContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {item.attachedImages.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.imageContainer}
                    onPress={() => {
                      setModalOpen(true);
                      setImagesModal(item.attachedImages);
                    }}
                  >
                    <Image style={styles.attachedImage} source={{ uri: img }} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <Text style={styles.headTitle}>Make Phone Call</Text>
            <TouchableOpacity
              style={{
                width: "100%",
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                triggerCall();
              }}
            >
              <FontAwesome5 name="phone-square-alt" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>{contact}</Text>
            </TouchableOpacity>
            <Text style={styles.headTitle}>Status</Text>
            <View style={styles.statusContainer}>
              <MaterialIcons name="pending" size={24} color="red" />
              <Text style={styles.pendingText}>{item.transactionStatus}</Text>
            </View>
            {err ? <Text style={styles.errorStyle}>{err}</Text> : null}
            {msg ? <Text style={styles.msgStyle}>{msg}</Text> : null}
            <View style={styles.noteContainer}>
              <Text style={{ color: "#a6a6a6", fontSize: 12 }}>Note:</Text>
              <Text style={styles.noteText}>
                (1) You can only create chat room when request status is
                <Text style={{ color: Color.secondary }}>ACCEPTED</Text>. Slide
                down to <Text style={{ color: Color.secondary }}>REFRESH</Text>.
              </Text>
              <Text style={styles.noteText}>
                (2) Cancelation of request will be disabled after accepting the
                service.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: Color.secondary }]}
                disabled={status !== "accepted" ? true : false}
                onPress={() => {
                  createRoom();
                  if (err === null) {
                    navigation.navigate("MESSAGE");
                  }
                }}
              >
                <Text style={styles.txt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#ff4d4d" }]}
                disabled={status === "accepted" ? true : false}
                onPress={() => {
                  cancelAlert();
                }}
              >
                <Text style={styles.txt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => setModalOpen(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="#ffffff" />
            <Text style={{ fontSize: 16, color: "#f2f2f2", marginLeft: 10 }}>
              close
            </Text>
          </TouchableOpacity>
          {/* scrollView Image list horizontal */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={{ width: winWidth, height: winHeight }}
          >
            {imagesModal ? (
              <>
                {imagesModal.map((item, index) => (
                  <View style={styles.imageContainerModal} key={index}>
                    <Image
                      style={styles.attachedImgModal}
                      source={{ uri: item }}
                    />
                  </View>
                ))}
              </>
            ) : null}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headTitle: {
    color: Color.secondary,
    fontWeight: "700",
    fontSize: 11,
    marginVertical: 5,
  },
  statementContainer: {
    marginTop: 5,
  },
  statementText: {
    fontSize: 12,
    color: "#666666",
    letterSpacing: 0.3,
    textAlign: "justify",
    marginTop: 5,
    marginBottom: 5,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    fontSize: 12,
    letterSpacing: 0.3,
    marginLeft: 7,
    color: "#666666",
    textTransform: "capitalize",
  },
  attachedImgContainer: {
    backgroundColor: "#e6e6e6",
    height: 120,
    borderRadius: 3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    backgroundColor: Color.secondary,
    width: 100,
    height: 100,
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 3,
  },
  attachedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pendingText: {
    fontSize: 10,
    letterSpacing: 0.3,
    marginLeft: 7,
    color: "#111111",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 40,
  },
  btn: {
    width: "40%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: Color.white,
    textTransform: "uppercase",
  },
  modalContainer: {
    height: winHeight,
    width: winWidth,
    backgroundColor: "#111111",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    position: "absolute",
    left: 20,
    top: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  imageContainerModal: {
    width: winWidth,
    height: "70%",
    alignSelf: "center",
  },
  attachedImgModal: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  errorStyle: {
    textAlign: "center",
    padding: 10,
    color: "#ff8080",
    backgroundColor: "#ffe6e6",
    width: "100%",
    marginTop: 20,
  },
  msgStyle: {
    textAlign: "center",
    padding: 10,
    color: "#66b3ff",
    backgroundColor: "#cce6ff",
    width: "100%",
    marginTop: 20,
  },
  noteContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e6e6e6",
    marginTop: 20,
  },
  noteText: {
    color: "#bfbfbf",
    textAlign: "justify",
    fontSize: 10,
    lineHeight: 18,
  },
});
