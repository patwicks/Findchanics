import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../../api/api";
import { MaterialIcons } from "@expo/vector-icons";
// local import
import Color from "../../config/Color";
// Functions
const EmailSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email Address")
    .required("Email is Required")
    .min(15, "Please check your email"),
});
export default function ForgotPasswordScreen({ navigation }) {
  // state variable
  const [error, setError] = useState();

  // handler function
  // usertype
  const handleSendVerificationCode = (data) => {
    API.post("/api/driver/forgot-password", data)
      .then((response) => {
        const { _id, email } = response.data;
        navigation.navigate("ResetPasswordScreen", {
          user_id: _id,
          user_email: email,
        });
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.emailFormContainer}>
        <Image
          source={require("../../assets/images/forgot-password.png")}
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.headerText}>Forgot your Password?</Text>
        <Text style={styles.subText}>
          Provide your existing email address to reset your password
        </Text>
      </View>
      {/* formik form */}
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={EmailSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            handleSendVerificationCode(values);
            actions.setSubmitting(false);
            actions.resetForm();
            setError(null);
          }, 1000);
        }}
      >
        {(props) => {
          return (
            <>
              {/* server error */}
              {error && <Text style={styles.error}>{error}</Text>}
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  name="email"
                  placeholder="Email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={props.values.email}
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                />
              </View>
              <Text style={styles.inputError}>
                {props.touched.email ? (
                  <Text style={styles.inputError}>{props.errors.email}</Text>
                ) : null}
              </Text>
              <TouchableOpacity
                style={styles.btnForgot}
                onPress={props.handleSubmit}
              >
                {props.isSubmitting ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  <Text style={styles.forgotText}>Submit</Text>
                )}
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
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
  emailFormContainer: {
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
  inputLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Color.black,
  },
  inputContainer: {
    borderColor: Color.black,
    borderWidth: 1,
    borderRadius: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: Color.level3,
  },
  icon: {
    position: "absolute",
    color: Color.primary,
    fontSize: 26,
    left: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    marginLeft: 80,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  btnForgot: {
    borderRadius: 3,
    padding: 10,
    height: 50,
    backgroundColor: Color.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    opacity: 1,
  },
  forgotText: {
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
    fontSize: 12,
  },
  userTypeContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.level4,
  },
  accType: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  usertypeText: {
    color: Color.primary,
    textTransform: "uppercase",
    fontFamily: "Poppins-SemiBold",
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
