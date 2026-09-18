import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Text,
} from "react-native-paper";

import GameList from "../components/GameList";
import { colors } from "../constants/colors";

export default function HomeScreen({
  navigation,
  myGames,
}) {
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
        <Appbar.Content title="GameBox" />

        {myGames.length > 0 && (
          <Appbar.Action
            icon={isCardView ? "format-list-bulleted" : "view-grid"}
            onPress={toggleViewMode}
            accessibilityLabel={
              isCardView
                ? "Show games as a list"
                : "Show games as cards"
            }
          />
        )}
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.heading}>
          My Games
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Your personal collection of rated games.
        </Text>

        {myGames.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Card style={styles.emptyCard} mode="outlined">
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={styles.emptyTitle}
                >
                  No games yet
                </Text>

                <Text
                  variant="bodyMedium"
                  style={styles.emptyText}
                >
                  Browse games, add them to your collection and
                  rate them.
                </Text>
              </Card.Content>
            </Card>
          </View>
        ) : (
          <GameList
            games={myGames}
            navigation={navigation}
            viewMode={viewMode}
            contentContainerStyle={styles.list}
          />
        )}

        <Button
          mode="contained"
          icon="gamepad-variant"
          onPress={() => navigation.navigate("Browse")}
          style={styles.browseButton}
          contentStyle={styles.buttonContent}
        >
          Browse Games
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  subtitle: {
    marginBottom: 20,
    color: colors.mutedText,
  },

  list: {
    paddingBottom: 16,
  },

  emptyContainer: {
    flex: 1,
  },

  emptyCard: {
    marginTop: 4,
    backgroundColor: colors.surface,
  },

  emptyTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  emptyText: {
    lineHeight: 21,
    color: colors.mutedText,
  },

  browseButton: {
    marginTop: 12,
  },

  buttonContent: {
    paddingVertical: 6,
  },
});
