import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

const winWidth = Dimensions.get("screen").width;
const winHeight = Dimensions.get("screen").height;

export default function LicenseScreen({ route }) {
  const { permit } = route.params;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        pagingEnabled={true}
      >
        {permit?.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              onPress={() => setModalOpen(true)}
            >
              <Image style={styles.imagePermit} source={{ uri: image }} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

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
            pagingEnabled={true}
          >
            {permit?.map((image, index) => {
              return (
                <View key={index} style={styles.imageContainerModal}>
                  <Image
                    style={styles.imagePermitModal}
                    source={{ uri: image }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "50%",
    height: 150,
    padding: 1,
  },
  imagePermit: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  imagePermitModal: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
