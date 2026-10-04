import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";

import { colors } from "../constants/colors";

const getSecureImageUrl = (url) => {
  if (!url) {
    return "";
  }

  return url.replace(/^http:\/\//, "https://");
};

export default function PostDetailsScreen({ route, navigation }) {
  const deal = route.params?.deal;

  if (!deal) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Deal Details" />
        </Appbar.Header>

        <View style={styles.emptyContainer}>
          <Text variant="titleMedium" style={styles.emptyTitle}>
            Deal details unavailable
          </Text>

          <Text variant="bodyMedium" style={styles.emptyText}>
            Go back to the deals list and select a deal again.
          </Text>

          <Button
            mode="contained"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Back to Deals
          </Button>
        </View>
      </View>
    );
  }

  const savings = Number(deal.savings).toFixed(0);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Deal Details" />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Card mode="elevated" style={styles.card}>
          {deal.thumb && (
            <Card.Cover
              source={{ uri: getSecureImageUrl(deal.thumb) }}
              style={styles.cover}
            />
          )}

          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              {deal.title}
            </Text>

            <View style={styles.infoRow}>
              <Chip icon="identifier" compact>
                Deal ID {deal.dealID}
              </Chip>

              <Chip icon="store" compact>
                Store {deal.storeID}
              </Chip>
            </View>

            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Price
            </Text>

            <View style={styles.priceRow}>
              <Text variant="headlineSmall" style={styles.salePrice}>
                ${deal.salePrice}
              </Text>

              <Text variant="titleMedium" style={styles.normalPrice}>
                ${deal.normalPrice}
              </Text>

              <Chip icon="sale" compact>
                {savings}% off
              </Chip>
            </View>

            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Ratings
            </Text>

            <View style={styles.infoRow}>
              <Chip icon="star-outline" compact>
                Deal rating {deal.dealRating} / 10
              </Chip>

              <Chip icon="chart-line" compact>
                Metacritic {deal.metacriticScore || "N/A"}
              </Chip>
            </View>

            <Text variant="titleMedium" style={styles.tagsTitle}>
              Steam
            </Text>

            <View style={styles.infoRow}>
              <Chip icon="steam" compact>
                {deal.steamRatingText || "No Steam rating"}
              </Chip>

              <Chip icon="account-group-outline" compact>
                {deal.steamRatingCount || "0"} ratings
              </Chip>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
    backgroundColor: colors.surface,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyText: {
    textAlign: "center",
    color: colors.mutedText,
  },

  backButton: {
    marginTop: 16,
  },

  cover: {
    height: 150,
    backgroundColor: colors.background,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  divider: {
    marginVertical: 18,
    backgroundColor: "#343434",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  body: {
    lineHeight: 24,
  },

  priceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: 10,
  },

  salePrice: {
    fontWeight: "bold",
    color: colors.secondary,
  },

  normalPrice: {
    color: colors.mutedText,
    textDecorationLine: "line-through",
  },

  tagsTitle: {
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
  },
});
