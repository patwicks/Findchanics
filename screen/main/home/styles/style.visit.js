import { StyleSheet } from "react-native";

import Color from "../../../../config/Color";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Color.white,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  coverPhotoContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  circleConatainer: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: Color.white,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: Color.secondary,
  },
  profile: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  itemStoreName: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    letterSpacing: 1,
    color: "#111111",
    textAlign: "center",
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  itemStoreInformation: {
    padding: 10,
  },

  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itembtn: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Color.white,
  },
  btnGallery: {
    backgroundColor: Color.level4,
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  itemHeadText: {
    fontFamily: "Poppins-Regular",
    textTransform: "uppercase",
    width: "100%",
    padding: 10,
    marginTop: 10,
    fontSize: 14,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  itemContent: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    alignItems: "center",
  },
  itemServiceContainer: {
    paddingBottom: 30,
  },
  ratingContainer: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  txtServiceRating: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: Color.secondary,
    marginBottom: 30,
  },
  btnReviews: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.level4,
  },
});

export default Styles;
