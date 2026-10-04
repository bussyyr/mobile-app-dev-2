import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { colors } from "../constants/colors";

export default function PlatformInfo() {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Title
        title="Android version"
        subtitle="React Native selected PlatformInfo.android.js"
        left={(props) => <Avatar.Icon {...props} icon="android" />}
      />

      <Card.Content>
        <Text variant="bodyMedium" style={styles.text}>
          This version uses Android-specific copy and elevation.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: colors.surface,
    elevation: 6,
  },

  text: {
    color: colors.mutedText,
  },
});
