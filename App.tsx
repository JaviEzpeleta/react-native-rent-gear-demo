import React, { useState } from "react"
import * as Font from "expo-font"
import { AppLoading } from "expo"
import Theme from "./components/Theme"
import AppNavigator from "./AppNavigator"

import { Provider } from "react-redux"
import store from "./store"

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)

  const fetchFonts = () => {
    return Font.loadAsync({
      "montserrat-extra-bold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
      "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
      "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    })
  }

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <Theme>
        <AppNavigator></AppNavigator>
      </Theme>
    </Provider>
  )
}

// ? command to change from Expo 37 to expo v36:
// !  expo upgrade 36.0.0
