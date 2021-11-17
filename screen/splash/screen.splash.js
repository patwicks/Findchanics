import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./style.splash";

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/map.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/find-logo.png")}
        />
        <Text style={styles.headText}>Find-Talyer App</Text>
        <Text style={styles.subText}>
          Find Auto repair shops and services during emergency vehicle breakdown
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btnStartSignin}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.textStartSignin}>Signin</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
