import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ForumScreen from "../screen/main/forum/tab.screen.forum";
import CreatePost from "../screen/main/forum/component.create.post";
const Stack = createNativeStackNavigator();

const ForumStack = () => {
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
      <Stack.Screen name="forum" component={ForumScreen} />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          headerTransparent: false,
          headerTitle: "Create Post",
          headerShadowVisible: true,
          headerTintColor: "#111",
          headerBackVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ForumStack;
