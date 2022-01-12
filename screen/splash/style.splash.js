import { StyleSheet, StatusBar, Platform } from "react-native";

import Color from "../../config/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 25,
    resizeMode: "cover",
    backgroundColor: Color.primary,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 120,
  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height: 100,
  },
  headText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Color.white,
  },
  subText: {
    textAlign: "center",
    color: Color.level4,
    letterSpacing: 1,
    fontSize: 12,
  },
  btnStartSignin: {
    backgroundColor: Color.secondary,
    padding: 10,
    borderRadius: 10,
    width: "90%",
    height: 50,
    bottom: 40,
    position: "absolute",
  },
  textStartSignin: {
    fontFamily: "Poppins-SemiBold",
    color: Color.white,
    textAlign: "center",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});
export default styles;
