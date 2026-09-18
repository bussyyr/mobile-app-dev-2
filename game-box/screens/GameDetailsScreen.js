import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Divider,
  Snackbar,
  Text,
} from "react-native-paper";

import games from "../data/data.json";
import { colors } from "../constants/colors";
import RatingStars from "../components/RatingStars";

export default function GameDetailsScreen({
  route,
  navigation,
  myGames,
  saveGame,
}) {
  const { gameId } = route.params;

  // Find the selected game from the local JSON data.
  const game = games.find((item) => item.id === gameId);

  // Check whether the game already exists in My Games.
  const savedGame = myGames.find((item) => item.id === gameId);

  // Use the existing rating if the game has already been rated.
  const [rating, setRating] = useState(savedGame?.rating ?? 0);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Handle an invalid game id safely.
  if (!game) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Game Details" />
        </Appbar.Header>

        <View style={styles.errorContainer}>
          <Text variant="headlineSmall">Game not found</Text>

          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.errorButton}
          >
            Go Back
          </Button>
        </View>
      </View>
    );
  }

  const handleSave = () => {
    if (rating === 0) {
      return;
    }

    saveGame(game, rating);
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Game Details" />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Game information */}
        <Card mode="elevated" style={styles.card}>
          {game.imageUrl && (
            <Card.Cover
              source={{ uri: game.imageUrl }}
              style={styles.cover}
            />
          )}

          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              {game.title}
            </Text>

            <Text variant="titleMedium" style={styles.genre}>
              {game.genre} • {game.releaseYear}
            </Text>

            <Divider style={styles.divider} />

            <Text variant="labelLarge" style={styles.label}>
              Developer
            </Text>

            <Text variant="bodyLarge">
              {game.developer}
            </Text>

            <Text variant="labelLarge" style={styles.sectionLabel}>
              Platforms
            </Text>

            <Text variant="bodyLarge">
              {game.platforms.join(" • ")}
            </Text>

            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.aboutTitle}>
              About
            </Text>

            <Text variant="bodyMedium" style={styles.description}>
              {game.description}
            </Text>
          </Card.Content>
        </Card>

        {/* Rating section */}
        <Card mode="outlined" style={styles.ratingCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.ratingTitle}>
              Your Rating
            </Text>

            <Text variant="bodyMedium" style={styles.ratingText}>
              Tap a star to rate this game.
            </Text>

            <View style={styles.stars}>
              <RatingStars
                rating={rating}
                size={36}
                onRate={setRating}
              />
            </View>

            {rating > 0 && (
              <Text
                variant="bodyLarge"
                style={styles.selectedRating}
              >
                {rating} / 5
              </Text>
            )}

            <Button
              mode="contained"
              icon={savedGame ? "content-save" : "plus"}
              disabled={rating === 0}
              onPress={handleSave}
              style={styles.saveButton}
              contentStyle={styles.buttonContent}
            >
              {savedGame ? "Update Rating" : "Add to My Games"}
            </Button>

            {rating === 0 && (
              <Text variant="bodySmall" style={styles.ratingHint}>
                Select a rating before adding the game.
              </Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {savedGame
          ? "Rating updated."
          : "Game added to My Games."}
      </Snackbar>
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
  },

  contentContainer: {
    padding: 20,
  },

  card: {
    marginBottom: 16,
    backgroundColor: colors.surface,
  },

  cover: {
    height: 150,
  },

  title: {
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
  },

  genre: {
    color: colors.mutedText,
  },

  divider: {
    marginVertical: 18,
    backgroundColor: "#343434",
  },

  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  sectionLabel: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },

  aboutTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    lineHeight: 22,
  },

  ratingCard: {
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderColor: colors.secondary,
  },

  ratingTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },

  ratingText: {
    textAlign: "center",
    marginTop: 4,
    color: colors.mutedText,
  },

  stars: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  selectedRating: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.starRating,
  },

  saveButton: {
    marginTop: 8,
  },

  buttonContent: {
    paddingVertical: 5,
  },

  ratingHint: {
    textAlign: "center",
    marginTop: 8,
    color: colors.mutedText,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorButton: {
    marginTop: 20,
  },
});
