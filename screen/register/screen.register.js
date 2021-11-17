import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  CheckBox,
  ActivityIndicator,
} from "react-native";
// Form and Validation
import { Formik } from "formik";
import * as yup from "yup";
// icons
import { Ionicons } from "@expo/vector-icons";
// local imports
import styles from "./style.register";
import KeyboardWrapper from "../../utils/KeyboardWrapper";

// Api base url
import API from "../../api/api";

// Register form validation
const RegisterSchema = yup.object({
  firstname: yup
    .string()
    .required("Firstname is Required")
    .min(2, "Firstname seems too short")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .trim(),
  lastname: yup
    .string()
    .required("Lastname is Required")
    .min(2, "Lastname seems too short")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .trim(),
  middlename: yup
    .string()
    .required("Middlename is Required")
    .min(2, "Middlename seems too short")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .trim(),
  age: yup
    .string()
    .required("Age is required")
    .min(2, "Age is not accepted")
    .max(2, "Age is not accepted")
    .test("Accepted", "Age must be atleast 18 years and up", (val) => {
      return parseInt(val) >= 18;
    }),
  email: yup
    .string()
    .email("Invalid email Address")
    .required("Email is Required")
    .min(15, "Please check your email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password is weak, must contain the following(0-9/a-z/A-Z)"
    ),
  contactNo: yup
    .string()
    .required("Contact number is required")
    .min(10, "Invalid contact number")
    .max(10, "Invalid contact number"),
  profileURL: yup.string(),
});

export default function RegisterScreen({ navigation }) {
  const [secureText, setSecureText] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [error, setError] = useState();

  const handleRegister = (registerData) => {
    API.post("/api/driver/register", registerData)
      .then((response) => {
        const { email, _id } = response.data;
        navigation.navigate("OtpScreen", {
          user_email: email,
          user_id: _id,
        });
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <KeyboardWrapper>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>User Register</Text>
        <Text style={styles.personalText}>Personal Information:</Text>
        <View style={styles.line}></View>
        {/* Form container */}
        <View style={styles.form}>
          {/* Formik form */}
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              middlename: "",
              gender: "Male",
              age: "",
              email: "",
              password: "",
              contactNo: "",
              isValidated: false,
              profileURL:
                "https://res.cloudinary.com/dxcbmlxoe/image/upload/v1630030578/driver_profile/default-profile_o7dena.png",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleRegister(values);
                actions.setSubmitting(false);
                actions.resetForm();
              }, 1000);
            }}
          >
            {(props) => {
              return (
                <>
                  <TextInput
                    name="firstname"
                    style={styles.input}
                    placeholder="Firtname"
                    keyboardType="ascii-capable"
                    onChangeText={props.handleChange("firstname")}
                    value={props.values.firstname}
                    onBlur={props.handleBlur("firstname")}
                  />
                  <Text style={styles.inputError}>
                    {props.touched.firstname ? (
                      <Text style={styles.inputError}>
                        {props.errors.firstname}
                      </Text>
                    ) : null}
                  </Text>
                  <TextInput
                    name="lastname"
                    style={styles.input}
                    placeholder="Lastname"
                    keyboardType="ascii-capable"
                    onChangeText={props.handleChange("lastname")}
                    value={props.values.lastname}
                    onBlur={props.handleBlur("lastname")}
                  />
                  <Text style={styles.inputError}>
                    {props.touched.lastname ? (
                      <Text style={styles.inputError}>
                        {props.errors.lastname}
                      </Text>
                    ) : null}
                  </Text>
                  <TextInput
                    name="middlename"
                    style={styles.input}
                    placeholder="Middlename"
                    keyboardType="ascii-capable"
                    onChangeText={props.handleChange("middlename")}
                    value={props.values.middlename}
                    onBlur={props.handleBlur("middlename")}
                  />
                  <Text style={styles.inputError}>
                    {props.touched.middlename ? (
                      <Text style={styles.inputError}>
                        {props.errors.middlename}
                      </Text>
                    ) : null}
                  </Text>
                  <View style={styles.pickerContainer} name="gender">
                    <Picker
                      style={styles.pickerInput}
                      selectedValue={props.values.gender}
                      onValueChange={props.handleChange("gender")}
                    >
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>

                  <TextInput
                    style={styles.input}
                    name="age"
                    placeholder="Age"
                    keyboardType="number-pad"
                    value={props.values.age}
                    onChangeText={props.handleChange("age")}
                  />
                  <Text style={styles.inputError}>
                    {props.touched.age ? (
                      <Text style={styles.inputError}>{props.errors.age}</Text>
                    ) : null}
                  </Text>
                  <TextInput
                    style={styles.input}
                    name="email"
                    autoCapitalize="none"
                    placeholder="Email Address"
                    keyboardType="email-address"
                    value={props.values.email}
                    onChangeText={props.handleChange("email")}
                  />
                  <Text style={styles.inputError}>
                    {props.touched.email ? (
                      <Text style={styles.inputError}>
                        {props.errors.email}
                      </Text>
                    ) : null}
                  </Text>
                  <View style={styles.passContainer}>
                    <TextInput
                      style={styles.inputPass}
                      name="password"
                      placeholder="Password"
                      value={props.values.password}
                      onChangeText={props.handleChange("password")}
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

                  <TextInput
                    style={styles.input}
                    name="contactNo"
                    placeholder="Contact No. (9xxxxxxxxx)"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={props.values.contactNo}
                    onChangeText={props.handleChange("contactNo")}
                  />
                  <Text style={styles.inputError}>
                    {props.touched.contactNo ? (
                      <Text style={styles.inputError}>
                        {props.errors.contactNo}
                      </Text>
                    ) : null}
                  </Text>
                  {/* Server Error here */}
                  {error && (
                    <Text style={styles.inputServerError}>{error}</Text>
                  )}

                  <View style={styles.terms}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setIsSelected}
                    />
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
                  <TouchableOpacity
                    style={
                      isSelected ? styles.btnSignup : styles.btnSignupDisable
                    }
                    onPress={props.handleSubmit}
                    disabled={isSelected ? false : true}
                  >
                    {props.isSubmitting ? (
                      <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                      <Text style={styles.signupText}>Signup</Text>
                    )}
                  </TouchableOpacity>

                  {/* Signup navigator */}
                  <View style={styles.bottom}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.push("LoginScreen")}
                    >
                      <Text style={styles.gotoSignup}>Signin</Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </Formik>
          {/* Formik form End*/}
        </View>
        {/* Form container End*/}
      </View>
    </KeyboardWrapper>
  );
}
