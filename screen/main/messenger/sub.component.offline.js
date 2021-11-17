import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";
import Color from "../../../config/Color";
const OFFLINE_STORE_URL =
  "https://res.cloudinary.com/dxcbmlxoe/image/upload/v1632992433/store_profile/offline-store_snebxh.png";
const count = [1, 2, 3, 4, 5, 6];

export default function Offline({ navigation, storeList }) {
  return (
    <>
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {count.map((n, i) => {
          return (
            <View key={i} style={styles.circle}>
              <View style={styles.imageBox}>
                <Image
                  style={styles.storeImage}
                  source={{ uri: OFFLINE_STORE_URL }}
                />
              </View>
              <View style={styles.offlineIndicatorOuter}>
                <View style={styles.offlineIndicatorInner}></View>
              </View>
              <Text
                style={{
                  position: "absolute",
                  zIndex: 999,
                  fontSize: 10,
                  //   top: 15,
                  alignSelf: "center",
                  color: "#bfbfbf",
                }}
              >
                offline
              </Text>
            </View>
          );
        })}
      </ScrollView>
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "13%",
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
  offlineIndicatorOuter: {
    position: "absolute",
    backgroundColor: Color.level4,
    padding: 3,
    borderRadius: 200,
    bottom: -5,
    right: 10,
  },
  offlineIndicatorInner: {
    padding: 6,
    borderRadius: 200,
    backgroundColor: "#cccccc",
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
});
