import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";
import {
  Avatar,
  Appbar,
  Button,
  Card,
  Divider,
  Text,
} from "react-native-paper";

import { colors } from "../constants/colors";

const SUPPORT_PHONE = "+358401234567";
const SUPPORT_EMAIL = "support@gamebox.example";
const CHEAPSHARK_URL = "https://www.cheapshark.com";

export default function LinkingScreen({ navigation }) {
  const [message, setMessage] = useState("");

  const openExternalUrl = async (url, label) => {
    setMessage("");

    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        setMessage(`This device cannot open ${label}.`);
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      setMessage(`Could not open ${label}.`);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Support & Links" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.heading}>
          Need help?
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          These actions ask the operating system to open another app or
          service on your device.
        </Text>

        <Card mode="elevated" style={styles.card}>
          <Card.Title
            title="GameBox Support"
            subtitle="Choose how you want to contact us"
            left={(props) => (
              <Avatar.Icon {...props} icon="headset" />
            )}
          />

          <Card.Content>
            <Text variant="bodyMedium" style={styles.cardText}>
              Test linking actions with the phone, messaging, email, and
              browser applications available on your device.
            </Text>

            <Divider style={styles.divider} />

            <Button
              mode="contained"
              icon="phone-outline"
              onPress={() =>
                openExternalUrl(`tel:${SUPPORT_PHONE}`, "the phone app")
              }
              style={styles.actionButton}
            >
              Call Support
            </Button>

            <Button
              mode="outlined"
              icon="message-text-outline"
              onPress={() =>
                openExternalUrl(`sms:${SUPPORT_PHONE}`, "the messaging app")
              }
              style={styles.actionButton}
            >
              Send SMS
            </Button>

            <Button
              mode="outlined"
              icon="email-outline"
              onPress={() =>
                openExternalUrl(`mailto:${SUPPORT_EMAIL}`, "the email app")
              }
              style={styles.actionButton}
            >
              Send Email
            </Button>

            <Button
              mode="text"
              icon="open-in-new"
              onPress={() =>
                openExternalUrl(CHEAPSHARK_URL, "the CheapShark website")
              }
              style={styles.websiteButton}
            >
              Open CheapShark Website
            </Button>

            {message ? (
              <Text variant="bodySmall" style={styles.message}>
                {message}
              </Text>
            ) : null}
          </Card.Content>
        </Card>
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
    padding: 20,
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    marginBottom: 20,
    lineHeight: 21,
    color: colors.mutedText,
  },

  card: {
    backgroundColor: colors.surface,
  },

  cardText: {
    lineHeight: 21,
    color: colors.mutedText,
  },

  divider: {
    marginVertical: 18,
    backgroundColor: "#343434",
  },

  actionButton: {
    marginBottom: 12,
  },

  websiteButton: {
    alignSelf: "flex-start",
  },

  message: {
    marginTop: 12,
    color: colors.secondary,
  },
});
