import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";

import API from "../../../api/api";

import RequestData from "./sub.component.requestdata";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function RequestStatusScreen({ route, navigation }) {
  const { requestDataId, contactNo } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [reqData, setReqData] = useState();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //  fetch the service request

  const handleFetchRequest = async () => {
    try {
      const res = await API.get(`/api/service/request/${requestDataId}`);

      if (res.data) {
        setReqData([res.data]);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    handleFetchRequest();
  }, [refreshing, requestDataId]);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTop}> Request Details</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {reqData && (
          <RequestData
            data={reqData}
            navigation={navigation}
            contact={contactNo}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  titleTop: {
    color: "#333333",
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "700",
  },
});
