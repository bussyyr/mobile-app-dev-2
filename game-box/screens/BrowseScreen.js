import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Text,
} from "react-native-paper";

import games from "../data/data.json";
import GameList from "../components/GameList";
import { colors } from "../constants/colors";

export default function BrowseScreen({ navigation, myGames }) {
  const [viewMode, setViewMode] = useState("card");
  const isCardView = viewMode === "card";

  const toggleViewMode = () => {
    setViewMode((currentMode) =>
      currentMode === "card" ? "list" : "card"
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />

        <Appbar.Content title="Browse Games" />

        <Appbar.Action
          icon={isCardView ? "format-list-bulleted" : "view-grid"}
          onPress={toggleViewMode}
          accessibilityLabel={
            isCardView
              ? "Show games as a list"
              : "Show games as cards"
          }
        />
      </Appbar.Header>

      <GameList
        games={games}
        myGames={myGames}
        navigation={navigation}
        viewMode={viewMode}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              variant="headlineMedium"
              style={styles.heading}
            >
              All Games
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.subtitle}
            >
              Select a game to view its details and add it to
              your collection.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text variant="bodyMedium">
            No games available.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    lineHeight: 21,
    color: colors.mutedText,
  },
});
