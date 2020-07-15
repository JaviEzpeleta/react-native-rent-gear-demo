import React from "react"
import Cameras from "./Cameras"
import CameraDetail from "./CameraDetail"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { Animated } from "react-native"

// ! LET'S TAKE IT FROM HERE!!!!!
// ! https://github.com/IjzerenHein/react-navigation-shared-element/tree/navigation-v5

const Stack = createSharedElementStackNavigator()

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
})

// const forFade = ({ current, next }) => {
//   const opacity = Animated.add(
//     current.progress,
//     next ? next.progress : 0
//   ).interpolate({
//     inputRange: [0, 1, 2],
//     outputRange: [0, 1, 0],
//   })
//   return {
//     leftButtonStyle: { opacity },
//     rightButtonStyle: { opacity },
//     titleStyle: { opacity },
//     backgroundStyle: { opacity },
//   }
// }

export default function CamerasNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cameras"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Cameras" component={Cameras} />
        <Stack.Screen
          name="CameraDetail"
          options={{ cardStyleInterpolator: forFade }}
          component={CameraDetail}
          sharedElementsConfig={(route) => {
            const { camera } = route.params
            return [
              {
                id: camera.id,
              },
            ]
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
