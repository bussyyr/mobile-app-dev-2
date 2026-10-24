import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";

import { colors } from "../constants/colors";

const formatCoordinate = (value) => value.toFixed(6);

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("Location not requested yet.");
  const [permission, setPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const useMyLocation = async () => {
    setIsLoading(true);
    setLocation(null);
    setMessage("Requesting location permission...");

    try {
      const result = await Location.requestForegroundPermissionsAsync();

      setPermission({
        status: result.status,
        canAskAgain: result.canAskAgain,
      });

      if (result.status !== "granted") {
        setMessage("Location permission denied.");
        return;
      }

      setMessage("Getting location...");

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation.coords);
      setMessage("Location received.");
    } catch (error) {
      setMessage("Could not retrieve the current location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Nearby Location" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.heading}>
          Your Location
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          GameBox requests your location only after you choose to use this
          feature.
        </Text>

        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            <View style={styles.statusRow}>
              {isLoading ? (
                <ActivityIndicator animating size="small" />
              ) : (
                <View
                  style={[
                    styles.statusDot,
                    location ? styles.successDot : styles.neutralDot,
                  ]}
                />
              )}

              <Text variant="titleMedium" style={styles.statusText}>
                {message}
              </Text>
            </View>

            {permission ? (
              <View style={styles.permissionRow}>
                <Chip compact icon="shield-check-outline">
                  Permission: {permission.status}
                </Chip>
                <Chip compact icon="help-circle-outline">
                  Ask again: {permission.canAskAgain ? "Yes" : "No"}
                </Chip>
              </View>
            ) : null}

            {location ? (
              <>
                <Divider style={styles.divider} />

                <Text variant="labelLarge" style={styles.coordinateLabel}>
                  Latitude
                </Text>
                <Text variant="headlineSmall" style={styles.coordinate}>
                  {formatCoordinate(location.latitude)}
                </Text>

                <Text variant="labelLarge" style={styles.coordinateLabel}>
                  Longitude
                </Text>
                <Text variant="headlineSmall" style={styles.coordinate}>
                  {formatCoordinate(location.longitude)}
                </Text>
              </>
            ) : null}

            <Button
              mode="contained"
              icon="crosshairs-gps"
              onPress={useMyLocation}
              loading={isLoading}
              disabled={isLoading}
              style={styles.locationButton}
              contentStyle={styles.buttonContent}
            >
              Use My Location
            </Button>
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

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 30,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  neutralDot: {
    backgroundColor: colors.mutedText,
  },

  successDot: {
    backgroundColor: colors.secondary,
  },

  statusText: {
    flex: 1,
  },

  permissionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },

  divider: {
    marginVertical: 18,
    backgroundColor: "#343434",
  },

  coordinateLabel: {
    marginBottom: 4,
    color: colors.mutedText,
  },

  coordinate: {
    fontWeight: "bold",
    marginBottom: 16,
  },

  locationButton: {
    marginTop: 8,
  },

  buttonContent: {
    paddingVertical: 6,
  },
});
