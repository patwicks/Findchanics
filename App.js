import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// root of the app [navigator]
import RootStack from "./navigator/root.stack";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFont = async () =>
    await Font.loadAsync({
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    });

  if (fontLoaded) {
    return <RootStack />;
  } else {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}
