import React, { useState } from "react";
import {
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  MD3DarkTheme,
  PaperProvider,
} from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import BrowseScreen from "./screens/BrowseScreen";
import GameDetailsScreen from "./screens/GameDetailsScreen";
import { colors } from "./constants/colors";

const Stack = createNativeStackNavigator();

const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: colors.background,
    surface: colors.surface,
    primary: colors.primary,
    secondary: colors.secondary,
    onBackground: colors.text,
    onSurface: colors.text,
    onPrimary: colors.text,
    onSecondary: colors.background,
    outline: "#343434",
    surfaceVariant: colors.surface,
    onSurfaceVariant: colors.mutedText,
  },
};

const navigationTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: "#343434",
    notification: colors.secondary,
  },
};

export default function App() {
  // Stores the games that the user has added and rated.
  const [myGames, setMyGames] = useState([]);

  // Adds a new game to My Games or updates its rating.
  const saveGame = (game, rating) => {
    setMyGames((currentGames) => {
      const gameAlreadyExists = currentGames.some(
        (item) => item.id === game.id
      );

      if (gameAlreadyExists) {
        return currentGames.map((item) =>
          item.id === game.id
            ? { ...item, rating }
            : item
        );
      }

      return [
        ...currentGames,
        {
          ...game,
          rating,
        },
      ];
    });
  };

  return (
    <PaperProvider
      theme={paperTheme}
      settings={{
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}
    >
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen
                {...props}
                myGames={myGames}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Browse">
            {(props) => (
              <BrowseScreen
                {...props}
                myGames={myGames}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="GameDetails">
            {(props) => (
              <GameDetailsScreen
                {...props}
                myGames={myGames}
                saveGame={saveGame}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
