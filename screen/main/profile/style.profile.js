import { StyleSheet } from "react-native";

import Color from "../../../config/Color";

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  topProfile: {
    flex: 1.2,
    backgroundColor: Color.level3,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    width: 130,
    height: 130,
    borderWidth: 3,
    borderRadius: 150 / 2,
    marginTop: 20,
    borderColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  profileImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    borderWidth: 3,
  },
  editProfile: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    backgroundColor: Color.level4,
    borderColor: Color.level2,
    borderWidth: 1,
    position: "absolute",
    bottom: 4,
    zIndex: 999,
  },
  topName: {
    fontFamily: "Poppins-SemiBold",
    color: Color.level4,
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffe6e6",
    color: Color.error,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  success: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccffe6",
    color: "#00cc66",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  btnUpload: {
    backgroundColor: Color.secondary,
    borderRadius: 5,
    paddingVertical: 3,
    width: "30%",
    alignSelf: "center",
    marginTop: 15,
  },
  infoContainer: {
    flex: 2,
    padding: 5,
  },
  infoHeadTextContainer: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    width: "100%",
    height: "100%",
    padding: 5,
  },
  nameContainer: {
    backgroundColor: "rgba(0,0,0,0.04)",
    padding: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  info: {
    fontFamily: "Poppins-Regular",
  },
  emailPhoneContainer: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.04)",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  btnLogout: {
    backgroundColor: Color.secondary,
    width: "95%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default Styles;
