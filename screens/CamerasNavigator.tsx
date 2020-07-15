import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Cameras from "./Cameras";
import CameraDetail from "./CameraDetail";

// ! LET'S TAKE IT FROM HERE!!!!!
// ! https://github.com/IjzerenHein/react-navigation-shared-element/tree/navigation-v5

const Stack = createSharedElementStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

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
            const { camera } = route.params;
            return [
              {
                id: camera.id,
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
