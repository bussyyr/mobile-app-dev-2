import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { colors } from "../constants/colors";

export default function PlatformInfo() {
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title
        title="iOS version"
        subtitle="React Native selected PlatformInfo.ios.js"
        left={(props) => <Avatar.Icon {...props} icon="apple-ios" />}
      />

      <Card.Content>
        <Text variant="bodyMedium" style={styles.text}>
          This version uses iOS-specific copy and a softer outlined card.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: colors.surface,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  text: {
    color: colors.mutedText,
  },
});
