import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
// icons
import { Ionicons } from "@expo/vector-icons";
// local imports
import Color from "../../config/Color";
import KeyboardWrapper from "../../utils/KeyboardWrapper";
import API from "../../api/api";
// Reset from Yup validation
const ResetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password is weak, must contain a number and special characters(0-9*&$#@.)"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords mismatch"),

  otpUsed: yup.string().required("Code is required!").min(6, "Invalid code!"),
});

export default function ResetPasswordScreen({ navigation, route }) {
  const { user_id, user_email } = route.params;

  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  // handle Reset password
  const handleResetPassword = (data) => {
    API.put(`/api/driver/reset/${user_id}`, data)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  return (
    <KeyboardWrapper>
      <View style={styles.mainContainer}>
        <View style={styles.resetFormContainer}>
          <Image
            source={require("../../assets/images/reset-password.png")}
            style={{ alignSelf: "center" }}
          />
          <Text style={styles.headerText}>Reset your Password?</Text>
          <Text style={styles.subText}>Provide your new password below</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          {message && <Text style={styles.success}>{message}</Text>}
          <Formik
            initialValues={{
              email: `${user_email}`,
              otpUsed: "",
              password: "",
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleResetPassword(values);
                actions.setSubmitting(false);
                actions.resetForm();
              }, 3000);
            }}
          >
            {(props) => {
              return (
                <>
                  {/* Code verification */}
                  <Text>Verification Code</Text>
                  <View style={styles.passContainer}>
                    <TextInput
                      style={styles.input}
                      name="otpUsed"
                      placeholder="000000"
                      keyboardType="number-pad"
                      maxLength={6}
                      value={props.values.otpUsed}
                      onChangeText={props.handleChange("otpUsed")}
                      onBlur={props.handleBlur("otpUsed")}
                    />
                  </View>
                  <Text style={styles.inputError}>
                    {props.touched.otpUsed ? (
                      <Text style={styles.inputError}>
                        {props.errors.otpUsed}
                      </Text>
                    ) : null}
                  </Text>
                  {/* Password */}
                  <Text>Password</Text>
                  <View style={styles.passContainer}>
                    <TextInput
                      style={styles.input}
                      name="password"
                      placeholder="Password"
                      keyboardType="ascii-capable"
                      value={props.values.password}
                      onChangeText={props.handleChange("password")}
                      onBlur={props.handleBlur("password")}
                      secureTextEntry={secureText}
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
                  {/* Confrim Password */}
                  <Text>Confirm password</Text>
                  <View style={styles.passContainer}>
                    <TextInput
                      style={styles.input}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      keyboardType="ascii-capable"
                      value={props.values.confirmPassword}
                      onChangeText={props.handleChange("confirmPassword")}
                      onBlur={props.handleBlur("confirmPassword")}
                      secureTextEntry={secureText}
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
                    {props.touched.confirmPassword ? (
                      <Text style={styles.inputError}>
                        {props.errors.confirmPassword}
                      </Text>
                    ) : null}
                  </Text>
                  <TouchableOpacity
                    style={styles.btnReset}
                    onPress={props.handleSubmit}
                  >
                    {props.isSubmitting ? (
                      <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                      <Text style={styles.resetText}>Reset</Text>
                    )}
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </KeyboardWrapper>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    padding: 20,
    justifyContent: "center",
  },
  resetFormContainer: {
    paddingVertical: 15,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: Color.secondary,
    fontSize: 20,
  },
  subText: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Color.black,
    marginTop: 5,
    marginBottom: 20,
  },
  passContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    height: 50,
    marginVertical: 5,
    borderColor: Color.level3,
  },
  input: {
    width: "85%",
    height: "100%",
    fontSize: 14,
    letterSpacing: 1,
    padding: 5,
    fontFamily: "Poppins-Regular",
  },
  passIcon: {
    color: Color.level2,
  },
  btnReset: {
    borderRadius: 3,
    padding: 10,
    height: 50,
    backgroundColor: Color.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    opacity: 1,
  },
  resetText: {
    color: Color.white,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  inputError: {
    color: Color.error,
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
  success: {
    color: "#00cc66",
    backgroundColor: "#ccffee",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    padding: 7,
    width: "100%",
    borderRadius: 5,
  },
  error: {
    backgroundColor: "#ffe6e6",
    color: Color.error,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    padding: 7,
    width: "100%",
    borderRadius: 5,
  },
});
