import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { colors } from "../constants/colors";

export default function PlatformInfo() {
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title
        title="Web version"
        subtitle="React Native selected PlatformInfo.web.js"
        left={(props) => <Avatar.Icon {...props} icon="web" />}
      />

      <Card.Content>
        <Text variant="bodyMedium" style={styles.text}>
          This version appears when the project runs in the browser.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderStyle: "dashed",
  },

  text: {
    color: colors.mutedText,
  },
});
