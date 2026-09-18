import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

import { colors } from "../constants/colors";

export default function RatingStars({
  rating = 0,
  size = 20,
  onRate,
  style,
}) {
  const isInteractive = typeof onRate === "function";

  return (
    <View style={[styles.container, style]}>
      {[1, 2, 3, 4, 5].map((star) => {
        const icon = star <= rating ? "star" : "star-outline";

        if (!isInteractive) {
          return (
            <Icon
              key={star}
              source={icon}
              size={size}
              color={colors.starRating}
            />
          );
        }

        return (
          <Pressable
            key={star}
            onPress={() => onRate(star)}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${star} out of 5 stars`}
            hitSlop={8}
            style={styles.starButton}
          >
            <Icon
              source={icon}
              size={size}
              color={colors.starRating}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  starButton: {
    padding: 4,
  },
});
