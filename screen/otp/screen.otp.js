import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../../api/api";

import Color from "../../config/Color";
import HandleBackAction from "../../utils/HandleBackAction";

const OtpSchema = yup.object({
  otpUsed: yup.string().required("OTP is Required"),
});

export default function OtpScreen({ navigation, route }) {
  const [error, setError] = useState();
  const [seconds, setSeconds] = useState(180);
  const [disabled, setDisabled] = useState(true);
  const [unmounted, setUnmounted] = useState(false);
  // Params from forms
  const { user_email, user_id } = route.params;

  // handle sending otp
  const handleOtp = (otpFormValue) => {
    API.post(`/api/driver/validate/${user_id}`, otpFormValue)
      .then((response) => {
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  // handle Resending OTP to user
  const handleResendOtp = (data) => {
    API.put(`api/driver/resend/${user_id}`, data)
      .then((response) => {
        setSeconds(180);
        setDisabled(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // UseEffect for timer
  useEffect(() => {
    // handle the OTP button Resend
    const handleTimer = () => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(0);
        setDisabled(false);
        setUnmounted(true);
      }
    };

    if (!unmounted) {
      handleTimer();
      HandleBackAction();
    }
    return () => {
      unmounted;
    };
  }, [seconds]);

  return (
    <View style={styles.container}>
      {/* Otp form */}
      <View style={styles.otpFormContainer}>
        <Text style={styles.otpTextHead}>OTP Verification</Text>
        <Image
          style={styles.mailImg}
          source={require("../../assets/images/mail-sent.png")}
        />
        <Text style={styles.otpTextInfo}>
          Provide the OTP sent to your mobile number.If not found, click RESEND
          to send OTP again. Thank you!
        </Text>
        <Formik
          initialValues={{
            email: `${user_email}`,
            otpUsed: "",
          }}
          validationSchema={OtpSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              setUnmounted(true);
              handleOtp(values);
              actions.setSubmitting(false);
              actions.resetForm();
            }, 1000);
          }}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
          }) => {
            return (
              <>
                <TextInput
                  style={styles.otpInput}
                  placeholder="000000"
                  name="otpUsed"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={values.otpUsed}
                  onChangeText={handleChange("otpUsed")}
                  onBlur={handleBlur("otpUsed")}
                />
                <Text style={styles.inputError}>
                  {touched.otpUsed ? (
                    <Text style={styles.inputError}>{errors.otpUsed}</Text>
                  ) : null}
                </Text>
                {/* from server Error */}
                {error && <Text style={styles.inputServerError}>{error}</Text>}
                <TouchableOpacity style={styles.otpBtn} onPress={handleSubmit}>
                  {isSubmitting ? (
                    <ActivityIndicator color="#ffffff" size="large" />
                  ) : (
                    <Text style={styles.otpBtnText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
        {/* Resend form in formik */}
        <Formik
          initialValues={{ email: `${user_email}` }}
          onSubmit={(values) => {
            console.log(values);
            handleResendOtp(values);
          }}
        >
          {({ handleSubmit }) => {
            return (
              <>
                {/* Resend OTP */}
                {/* Timer */}
                <Text style={styles.resendText}>{seconds}s</Text>
                <TouchableOpacity
                  style={
                    disabled ? styles.otpBtnResendDisable : styles.otpBtnResend
                  }
                  disabled={disabled}
                  onPress={handleSubmit}
                >
                  <Text style={styles.otpBtnText}>Resend</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.level4,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    padding: 20,
    justifyContent: "center",
  },
  otpTextHead: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: Color.secondary,
    fontSize: 20,
    marginVertical: 20,
  },
  mailImg: {
    resizeMode: "contain",
    width: 200,
    height: 100,
    alignSelf: "center",
  },
  otpFormContainer: {
    backgroundColor: Color.white,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Color.black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    padding: 15,
  },
  otpTextInfo: {
    textAlign: "center",
    lineHeight: 28,
    letterSpacing: 0.5,
    fontFamily: "Poppins-Regular",
  },
  otpInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 3,
    borderColor: Color.secondary,
  },
  otpBtn: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: Color.secondary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  otpBtnText: {
    color: Color.white,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  otpBtnResend: {
    width: "50%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Color.primary,
  },
  otpBtnResendDisable: {
    width: "50%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Color.primary,
    opacity: 0.5,
  },
  resendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
  inputError: {
    color: Color.error,
    textAlign: "center",
  },
  inputServerError: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffe6e6",
    color: Color.error,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
});
