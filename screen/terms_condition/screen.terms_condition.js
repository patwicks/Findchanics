import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from "react-native";

import Color from "../../config/Color";

export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.tacContainer}>
      <Image
        style={styles.tacImg}
        source={require("../../assets/images/TaC.png")}
      />
      <Text style={styles.tacHeaderText}>
        Terms and Conditions of Find-Talyer App
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.contentTitle}>Terms of Use</Text>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nisi
          dignissimos sequi ab excepturi autem quam quaerat cumque corrupti
          ullam ratione repellat rerum temporibus aliquid, voluptatibus expedita
          dolor tempora ut ex voluptates facilis iste praesentium incidunt!
          Doloribus fugit labore voluptate.
        </Text>

        <Text style={styles.contentTitle}>Terms of Use</Text>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nisi
          dignissimos sequi ab excepturi autem quam quaerat cumque corrupti
          ullam ratione repellat rerum temporibus aliquid, voluptatibus expedita
          dolor tempora ut ex voluptates facilis iste praesentium incidunt!
          Doloribus fugit labore voluptate.
        </Text>

        <Text style={styles.contentTitle}>Terms of Use</Text>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nisi
          dignissimos sequi ab excepturi autem quam quaerat cumque corrupti
          ullam ratione repellat rerum temporibus aliquid, voluptatibus expedita
          dolor tempora ut ex voluptates facilis iste praesentium incidunt!
          Doloribus fugit labore voluptate.
        </Text>

        <Text style={styles.contentTitle}>Terms of Use</Text>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nisi
          dignissimos sequi ab excepturi autem quam quaerat cumque corrupti
          ullam ratione repellat rerum temporibus aliquid, voluptatibus expedita
          dolor tempora ut ex voluptates facilis iste praesentium incidunt!
          Doloribus fugit labore voluptate.
        </Text>

        {/* Bottom */}
        <Text style={styles.bottom}>
          All Rights Reserved. Find-Talyer App 2021
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tacContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    padding: 20,
    backgroundColor: Color.white,
  },
  tacImg: {
    resizeMode: "contain",
    width: 200,
    height: 100,
    marginTop: 40,
    alignSelf: "center",
  },
  tacHeaderText: {
    textAlign: "center",
    marginVertical: 30,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    letterSpacing: 0.5,
    color: Color.primary,
  },
  contentTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Color.black,
    marginVertical: 10,
  },
  contentText: {
    lineHeight: 18,
    textAlign: "justify",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  bottom: {
    textAlign: "center",
    marginVertical: 20,
    color: Color.level1,
  },
});
