import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from "react-native";

import Color from "../../config/Color";

export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.tacContainer}>
      <Image
        style={styles.tacImg}
        source={require("../../assets/images/TaC.png")}
      />
      <Text style={styles.tacHeaderText}>
        Terms and Conditions of FINDCHANICS APP
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.contentTitle}>Terms of Use</Text>
        <Text style={styles.contentText}>
          {"\u2B24"} By downloading or using the app, these terms will
          automatically apply to you – you should make sure therefore that you
          read them carefully before using the app. You’re not allowed to copy
          or modify the app, any part of the app, or our trademarks in any way.
          You’re not allowed to attempt to extract the source code of the app,
          and you also shouldn’t try to translate the app into other languages
          or make derivative versions. The app itself, and all the trademarks,
          copyright, database rights, and other intellectual property rights
          related to it, still belong to. Is committed to ensuring that the app
          is as useful and efficient as possible. For that reason, we reserve
          the right to make changes to the app or to charge for its services, at
          any time and for any reason. We will never charge you for the app or
          its services without making it very clear to you exactly what you’re
          paying for.
        </Text>

        <Text style={styles.contentText}>
          {"\u2B24"} The FINDCHANICS app stores and processes personal data that
          you have provided to us, to provide my Service. It’s your
          responsibility to keep your phone and access to the app secure. We
          therefore recommend that you do not jailbreak or root your phone,
          which is the process of removing software restrictions and limitations
          imposed by the official operating system of your device. It could make
          your phone vulnerable to malware/viruses/malicious programs,
          compromise your phone’s security features and it could mean that the
          FINDCHANICS app won’t work properly or at all.
        </Text>

        <Text style={styles.contentTitle}>
          Changes to This Terms and Conditions
        </Text>
        <Text style={styles.contentText}>
          I may update our Terms and Conditions from time to time. Thus, you are
          advised to review this page periodically for any changes. I will
          notify you of any changes by posting the new Terms and Conditions on
          this page. These terms and conditions are effective as of 2022-12-31
        </Text>

        <Text style={styles.contentTitle}>Contact Us</Text>
        <Text style={styles.contentText}>
          If you have any questions or suggestions about my Terms and
          Conditions, do not hesitate to contact me at findtalyerapp@gmail.com.
        </Text>

        <View style={styles.creditsContainer}>
          <Text style={styles.contentTitle}>Credits</Text>
          <Text style={styles.creditBulletText}>
            {"\u2B24"} Images/Illustration
          </Text>
          <Text style={styles.link}>https://undraw.co/</Text>
          <Text style={styles.creditBulletText}>{"\u2B24"} Icons</Text>
          <Text style={styles.link}>https://www.flaticon.com/</Text>
          <Text style={styles.link}>https://icons.expo.fyi</Text>
        </View>

        {/* Bottom */}
        <Text style={styles.bottom}>
          All Rights Reserved. Find-Talyer App 2021
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tacContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    padding: 20,
    backgroundColor: Color.white,
  },
  tacImg: {
    resizeMode: "contain",
    width: 200,
    height: 100,
    marginTop: 40,
    alignSelf: "center",
  },
  tacHeaderText: {
    textAlign: "center",
    marginVertical: 30,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    letterSpacing: 0.5,
    color: Color.primary,
  },
  contentTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Color.black,
    marginVertical: 10,
  },
  contentText: {
    lineHeight: 18,
    textAlign: "justify",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginBottom: 10,
  },
  bottom: {
    textAlign: "center",
    marginVertical: 20,
    color: Color.level1,
  },
  creditBulletText: {
    fontWeight: "bold",
  },
  link: {
    marginLeft: 10,
  },
});
