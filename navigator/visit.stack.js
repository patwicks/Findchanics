import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabScreen from "../screen/main/home/tab.screen.home";
import VisitStoreScreen from "../screen/main/home/component.visit.screen";
import RequestServiceScreen from "../screen/main/home/component.request.service.screen";
import RequestStatusScreen from "../screen/main/home/component.request.status.screen";
import StoreGalleryScreen from "../screen/main/home/component.gallery.screen";
import LicenseScreen from "../screen/main/home/component.license.screen";
import FeedbackScreen from "../screen/main/home/component.feedback.screen";
import CreateFeedbackScreen from "../screen/main/home/component.create.feedback.screen";
import SearchScreen from "../screen/main/home/component.search.screen";

const Stack = createNativeStackNavigator();

const VisitStoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerTintColor: "#111",
        headerBackVisible: false,
        keyboardHidesTabBar: true,
      }}
    >
      <Stack.Screen name="Home" component={HomeTabScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Search",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Visit"
        component={VisitStoreScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Store Visit",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Request Service"
        component={RequestServiceScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Service Request",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Request_Status"
        component={RequestStatusScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Request Status",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={StoreGalleryScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Gallery",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="License"
        component={LicenseScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Store License/Permit",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Feedback",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="CreateFeedbackScreen"
        component={CreateFeedbackScreen}
        options={{
          headerBackVisible: true,
          headerTransparent: false,
          headerTitle: "Create Feedback",
          headerStyle: { backgroundColor: "#f2f2f2" },
          headerShadowVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default VisitStoreStack;
