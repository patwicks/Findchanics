import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileTabScreen from "../screen/main/profile/tab.profile.screen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
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
      <Stack.Screen name="Profile" component={ProfileTabScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
