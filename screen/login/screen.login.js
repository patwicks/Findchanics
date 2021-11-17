import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  CheckBox,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../../api/api";
// icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// styles
import styles from "./style.login";

// Wrapper

import KeyboardWrapper from "../../utils/KeyboardWrapper";

// Login input validation using Yup package
const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email Address")
    .required("Email is Required")
    .min(15, "Please check your email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short"),
});

export default function LoginScreen({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState();

  const handleLogin = async (loginCredential) => {
    // persist login details
    const persistLogin = async (loginCredentials) => {
      try {
        const result = await AsyncStorage.setItem(
          "findLoginCredential",
          JSON.stringify(loginCredentials)
        );
      } catch (err) {
        console.log(err);
      }
    };
    try {
      const res = await API.post("/api/driver/login", loginCredential);
      persistLogin(res.data);
      navigation.navigate("main_2");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <KeyboardWrapper>
      <View style={styles.loginContainer}>
        <Image
          style={styles.loginImg}
          source={require("../../assets/images/login.png")}
        />
        <View style={styles.header}>
          <Image
            style={styles.headerLogo}
            source={require("../../assets/images/header-logo.png")}
          />
        </View>
        {/* Display error from the server */}
        {error && <Text style={styles.inputServerError}>{error}</Text>}
        <View styel={styles.formContainer}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              handleLogin(values);
              setError(null);
              setTimeout(() => {
                actions.setSubmitting(false);
                actions.resetForm();
              }, 2000);
            }}
          >
            {(props) => {
              return (
                <>
                  {/* Email address Input  */}
                  <Text style={styles.inputLabel}>Email address</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons style={styles.icon} name="email" />
                    <TextInput
                      name="email"
                      style={styles.input}
                      placeholder="Email address"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={props.handleChange("email")}
                      value={props.values.email}
                      onBlur={props.handleBlur("email")}
                    />
                  </View>
                  <Text style={styles.inputError}>
                    {props.touched.email ? (
                      <Text style={styles.inputError}>
                        {props.errors.email}
                      </Text>
                    ) : null}
                  </Text>
                  {/* User Password Input */}
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputContainerPass}>
                    <FontAwesome5 style={styles.iconKey} name="key" />
                    <TextInput
                      name="password"
                      style={styles.inputPass}
                      placeholder="Password"
                      onChangeText={props.handleChange("password")}
                      value={props.values.password}
                      secureTextEntry={secureText}
                      onBlur={props.handleBlur("password")}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSecureText(!secureText);
                      }}
                    >
                      {secureText ? (
                        <Ionicons
                          style={styles.passIcon}
                          name="eye"
                          size={24}
                        />
                      ) : (
                        <Ionicons
                          style={styles.passIcon}
                          name="eye-off"
                          size={24}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.inputError}>
                    {props.touched.password ? (
                      <Text style={styles.inputError}>
                        {props.errors.password}
                      </Text>
                    ) : null}
                  </Text>
                  {/* Forgot Password */}
                  <TouchableOpacity
                    onPress={() => navigation.push("ForgotPasswordScreen")}
                  >
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                  </TouchableOpacity>
                  {/* Terms and Conditions */}
                  <View style={styles.terms}>
                    <CheckBox value={isSelected} onValueChange={setSelection} />
                    <Text style={styles.termsText}>You agree with our </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("TermsAndConditionsScreen")
                      }
                    >
                      <Text style={styles.termsText2}>
                        Terms and Conditions
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Login button */}
                  {}
                  <TouchableOpacity
                    style={
                      isSelected ? styles.btnLogin : styles.btnLoginDisable
                    }
                    onPress={props.handleSubmit}
                    disabled={isSelected ? false : true}
                  >
                    {props.isSubmitting ? (
                      <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                      <Text style={styles.loginText}>Login</Text>
                    )}
                  </TouchableOpacity>

                  {/* Signup navigator */}
                  <View style={styles.bottom}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("RegisterScreen")}
                    >
                      <Text style={styles.gotoSign}>Signup</Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </KeyboardWrapper>
  );
}
