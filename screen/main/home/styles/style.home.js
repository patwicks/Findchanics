import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

import Color from "../../../../config/Color";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  search: {
    position: "absolute",
    padding: 5,
    top: 60,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleTheme: {
    position: "absolute",
    padding: 5,
    top: 60,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  clickedStoreContainer: {
    width: "95%",
    height: "35%",
    backgroundColor: "#ffffff",
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
    bottom: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  closeIcon: {
    position: "absolute",
    zIndex: 2,
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 100,
  },
  storeCoverPhoto: {
    width: "100%",
    height: "30%",
    resizeMode: "cover",
  },
  itemDetails: {
    padding: 10,
  },
  itemStoreName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    letterSpacing: 1,
    color: Color.secondary,
    textTransform: "uppercase",
  },
  itemRatingContainer: {
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  itemRatingText: {
    fontFamily: "Poppins-Regular",
    alignItems: "center",
    marginRight: 5,
  },
  itemNumberStars: {
    color: Color.level2,
    marginHorizontal: 5,
    fontSize: 12,
  },
  btnVisitStore: {
    borderRadius: 5,
    width: "100%",
    padding: 5,
    backgroundColor: Color.secondary,
    marginTop: 10,
  },
  btnVisitText: {
    color: Color.white,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});

export default Styles;
