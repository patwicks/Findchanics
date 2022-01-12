import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// bottom tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const BottomTabs = createBottomTabNavigator();
// bottom screens
import VisitStoreStack from "./visit.stack";
import MessengerStack from "./messenger.stack";
import ProfileStack from "./profile.stack";
import ForumStack from "./forum.stack";

// Stack Screens
import SplashScreen from "../screen/splash/screen.splash";
import LoginScreen from "../screen/login/screen.login";
import RegisterScreen from "../screen/register/screen.register";
import OtpScreen from "../screen/otp/screen.otp";
import ForgotPasswordScreen from "../screen/reset_pass/screen.forgot_password";
import ResetPasswordScreen from "../screen/reset_pass/screen.reset_password";
import TermsAndConditionsScreen from "../screen/terms_condition/screen.terms_condition";

// config
import Color from "../config/Color";

// icon library
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Navigator Variable
const Stack = createNativeStackNavigator();

const HomeBottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.secondary,
        headerTitle: "",
        headerTransparent: true,
      }}
      initialRouteName="HOME"
    >
      <BottomTabs.Screen
        name="HOME"
        component={VisitStoreStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color={Color.primary} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MESSAGE"
        component={MessengerStack}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="forum" size={24} color={Color.primary} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="FORUM"
        component={ForumStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="group" size={20} color={Color.primary} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="PROFILE"
        component={ProfileStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={22} color={Color.primary} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function RootStack() {
  const [isLogin, setIsLogin] = useState(false);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("findLoginCredential");
      const parsedData = JSON.parse(data);
      if (parsedData !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getData();
    }
    return () => {
      unmounted = true;
    };
  }, [getData]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: Color.primary,
        }}
      >
        {isLogin === true ? (
          <Stack.Screen name="main" component={HomeBottomTabNavigator} />
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen
              name="main_2"
              component={HomeBottomTabNavigator}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerTitle: "Signup",
                headerTransparent: false,
                headerStyle: {
                  backgroundColor: Color.level4,
                },
                headerShadowVisible: true,
                headerTintColor: Color.primary,
              }}
            />
            <Stack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen
              name="TermsAndConditionsScreen"
              component={TermsAndConditionsScreen}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
