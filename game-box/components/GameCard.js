import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { colors } from "../constants/colors";
import RatingStars from "./RatingStars";

export default function GameCard({
  game,
  rating,
  onPress,
  variant = "large",
  style,
}) {
  if (variant === "list") {
    return (
      <Card
        mode="elevated"
        style={[styles.card, styles.listCard, style]}
        onPress={onPress}
      >
        <View style={styles.listContent}>
          {game.imageUrl && (
            <Image
              source={{ uri: game.imageUrl }}
              style={styles.listImage}
            />
          )}

          <View style={styles.listText}>
            <Text
              variant="titleMedium"
              style={styles.listTitle}
              numberOfLines={1}
            >
              {game.title}
            </Text>

            <Text variant="bodySmall" numberOfLines={1}>
              {game.genre} • {game.releaseYear}
            </Text>

            <Text
              variant="bodySmall"
              style={styles.developer}
              numberOfLines={1}
            >
              {game.developer}
            </Text>

            {rating !== undefined && rating !== null && (
              <RatingStars
                rating={rating}
                size={16}
                style={styles.listRating}
              />
            )}
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card
      mode="elevated"
      style={[styles.card, style]}
      onPress={onPress}
    >
      {game.imageUrl && (
        <Card.Cover
          source={{ uri: game.imageUrl }}
          style={[
            styles.cover,
            variant === "grid" && styles.gridCover,
          ]}
        />
      )}

      <Card.Content>
        <Text
          variant={variant === "grid" ? "titleMedium" : "titleLarge"}
          style={[
            styles.title,
            variant === "grid" && styles.gridTitle,
          ]}
          numberOfLines={variant === "grid" ? 2 : undefined}
        >
          {game.title}
        </Text>

        <Text
          variant={variant === "grid" ? "bodySmall" : "bodyMedium"}
          style={styles.info}
          numberOfLines={1}
        >
          {game.genre} • {game.releaseYear}
        </Text>

        <Text
          variant="bodySmall"
          style={styles.developer}
          numberOfLines={1}
        >
          {game.developer}
        </Text>

        {rating !== undefined && rating !== null && (
          <RatingStars
            rating={rating}
            size={variant === "grid" ? 16 : 22}
            style={styles.rating}
          />
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    backgroundColor: colors.surface,
  },

  listCard: {
    marginBottom: 10,
  },

  cover: {
    height: 120,
  },

  gridCover: {
    height: 82,
  },

  title: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },

  gridTitle: {
    minHeight: 42,
  },

  info: {
    marginBottom: 4,
    color: colors.mutedText,
  },

  developer: {
    color: colors.mutedText,
  },

  rating: {
    marginTop: 10,
  },

  listContent: {
    flexDirection: "row",
    padding: 10,
  },

  listImage: {
    width: 86,
    height: 56,
    borderRadius: 6,
    marginRight: 12,
  },

  listText: {
    flex: 1,
    justifyContent: "center",
  },

  listTitle: {
    fontWeight: "bold",
    marginBottom: 2,
  },

  listRating: {
    marginTop: 4,
  },
});
