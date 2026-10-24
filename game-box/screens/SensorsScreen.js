import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Accelerometer, Magnetometer } from "expo-sensors";
import {
  ActivityIndicator,
  Appbar,
  Card,
  Divider,
  Text,
} from "react-native-paper";

import { colors } from "../constants/colors";

const INITIAL_DATA = {
  x: 0,
  y: 0,
  z: 0,
};

const formatValue = (value) => value.toFixed(2);

export default function SensorsScreen({ navigation }) {
  const [accelerometerData, setAccelerometerData] = useState(INITIAL_DATA);
  const [accelerometerStatus, setAccelerometerStatus] = useState(
    "Checking accelerometer..."
  );
  const [isAccelerometerAvailable, setIsAccelerometerAvailable] =
    useState(null);
  const [magnetometerData, setMagnetometerData] = useState(INITIAL_DATA);
  const [magnetometerStatus, setMagnetometerStatus] = useState(
    "Checking magnetometer..."
  );
  const [isMagnetometerAvailable, setIsMagnetometerAvailable] =
    useState(null);

  useEffect(() => {
    let isScreenActive = true;
    let accelerometerSubscription;
    let magnetometerSubscription;

    const startAccelerometer = async () => {
      try {
        const available = await Accelerometer.isAvailableAsync();

        if (!isScreenActive) {
          return;
        }

        setIsAccelerometerAvailable(available);

        if (!available) {
          setAccelerometerStatus("Accelerometer is not available on this device.");
          return;
        }

        Accelerometer.setUpdateInterval(250);
        setAccelerometerStatus("Listening for movement...");

        accelerometerSubscription = Accelerometer.addListener((sensorData) => {
          if (isScreenActive) {
            setAccelerometerData(sensorData);
          }
        });
      } catch (error) {
        if (isScreenActive) {
          setIsAccelerometerAvailable(false);
          setAccelerometerStatus("Could not start the accelerometer.");
        }
      }
    };

    const startMagnetometer = async () => {
      try {
        const available = await Magnetometer.isAvailableAsync();

        if (!isScreenActive) {
          return;
        }

        setIsMagnetometerAvailable(available);

        if (!available) {
          setMagnetometerStatus("Magnetometer is not available on this device.");
          return;
        }

        Magnetometer.setUpdateInterval(300);
        setMagnetometerStatus("Listening for magnetic field changes...");

        magnetometerSubscription = Magnetometer.addListener((sensorData) => {
          if (isScreenActive) {
            setMagnetometerData(sensorData);
          }
        });
      } catch (error) {
        if (isScreenActive) {
          setIsMagnetometerAvailable(false);
          setMagnetometerStatus("Could not start the magnetometer.");
        }
      }
    };

    startAccelerometer();
    startMagnetometer();

    // Stop the continuous sensor updates when this screen is no longer active.
    return () => {
      isScreenActive = false;
      accelerometerSubscription?.remove();
      magnetometerSubscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Device Sensors" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.heading}>
          Device Sensors
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Move or rotate a physical device to observe live sensor values.
        </Text>

        <SensorDataCard
          title="Accelerometer"
          description="Movement and orientation values"
          status={accelerometerStatus}
          isAvailable={isAccelerometerAvailable}
          data={accelerometerData}
        />

        <SensorDataCard
          title="Magnetometer"
          description="Magnetic field values that change as the device rotates"
          status={magnetometerStatus}
          isAvailable={isMagnetometerAvailable}
          data={magnetometerData}
          style={styles.magnetometerCard}
        />

        <Card mode="outlined" style={styles.tipCard}>
          <Card.Content>
            <Text variant="titleSmall" style={styles.tipTitle}>
              Try this
            </Text>

            <Text variant="bodyMedium" style={styles.tipText}>
              Hold the phone flat, then vertically, and rotate it slowly. The
              accelerometer and magnetometer values update continuously while
              this screen is open.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

function SensorDataCard({
  title,
  description,
  status,
  isAvailable,
  data,
  style,
}) {
  return (
    <Card mode="elevated" style={[styles.card, style]}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.cardTitle}>
          {title}
        </Text>

        <Text variant="bodySmall" style={styles.cardDescription}>
          {description}
        </Text>

        <View style={styles.statusRow}>
          {isAvailable === null ? (
            <ActivityIndicator animating size="small" />
          ) : (
            <View
              style={[
                styles.statusDot,
                isAvailable ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          )}

          <Text variant="labelLarge" style={styles.statusText}>
            {status}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.valueGrid}>
          <SensorValue label="X" value={data.x} />
          <SensorValue label="Y" value={data.y} />
          <SensorValue label="Z" value={data.z} />
        </View>
      </Card.Content>
    </Card>
  );
}

function SensorValue({ label, value }) {
  return (
    <View style={styles.valueItem}>
      <Text variant="labelLarge" style={styles.valueLabel}>
        {label}
      </Text>
      <Text variant="headlineSmall" style={styles.value}>
        {formatValue(value)}
      </Text>
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

  magnetometerCard: {
    marginTop: 16,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  cardDescription: {
    marginBottom: 14,
    lineHeight: 19,
    color: colors.mutedText,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 28,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  activeDot: {
    backgroundColor: colors.secondary,
  },

  inactiveDot: {
    backgroundColor: "#E57373",
  },

  statusText: {
    color: colors.mutedText,
  },

  divider: {
    marginVertical: 18,
    backgroundColor: "#343434",
  },

  valueGrid: {
    flexDirection: "row",
  },

  valueItem: {
    flex: 1,
    alignItems: "center",
  },

  valueLabel: {
    marginBottom: 6,
    color: colors.mutedText,
  },

  value: {
    fontWeight: "bold",
  },

  tipCard: {
    marginTop: 16,
    backgroundColor: colors.surface,
  },

  tipTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  tipText: {
    lineHeight: 21,
    color: colors.mutedText,
  },
});
