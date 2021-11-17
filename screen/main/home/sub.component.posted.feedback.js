import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Rating } from "react-native-ratings";

import Color from "../../../config/Color";
export default function PostedFeedback({ feedbackList }) {
  return (
    <>
      {feedbackList?.map((feed, index) => {
        return (
          <View style={styles.feedContainer} key={index}>
            <View style={styles.top}>
              <View style={styles.profileContainer}>
                <View style={styles.profileCircle}>
                  <Image
                    source={{ uri: feed.profile }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.nameText}>{feed.name}</Text>
                <View style={styles.starRatingContainer}>
                  <Text style={{ fontSize: 10 }}>Rating: </Text>
                  <Rating
                    type="star"
                    ratingCount={5}
                    ratingColor="#FE5F55"
                    startingValue={feed.rate}
                    imageSize={15}
                    ratingBackgroundColor="#555555)"
                    readonly={true}
                  />
                  <Text style={{ fontSize: 10 }}>({feed.rate}.0)</Text>
                </View>
              </View>
            </View>
            <View style={styles.feedbackTxtContainer}>
              <Text style={styles.feedbackText}>
                {feed.feedback.charAt(0).toUpperCase() + feed.feedback.slice(1)}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  feedContainer: {
    width: "100%",
    padding: 5,
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileContainer: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: "#dddddd",
    backgroundColor: Color.secondary,
    overflow: "hidden",
  },
  nameText: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  starRatingContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "baseline",
  },
  feedbackTxtContainer: {
    padding: 10,
  },
  feedbackText: {
    color: "#111111",
    fontSize: 12,
  },
});
