import React, { useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  Chip,
  Searchbar,
  Text,
} from "react-native-paper";

import { colors } from "../constants/colors";
import PlatformInfo from "../components/PlatformInfo";

const DEALS_API_URL =
  "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=30&pageSize=30";

const getSecureImageUrl = (url) => {
  if (!url) {
    return "";
  }

  return url.replace(/^http:\/\//, "https://");
};

export default function ApiPostsScreen({ navigation }) {
  const [deals, setDeals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchDeals = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(DEALS_API_URL, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 GameBox React Native",
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Request failed with status ${response.status}. ${errorBody}`
        );
      }

      const data = await response.json();
      setDeals(Array.isArray(data) ? data : []);
      setHasLoaded(true);
    } catch (requestError) {
      setError(
        `Could not load game deals. ${requestError.message}.`
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return deals;
    }

    return deals.filter((deal) => {
      const title = deal.title.toLowerCase();
      const storeId = deal.storeID.toLowerCase();

      return title.includes(search) || storeId.includes(search);
    });
  }, [deals, searchText]);

  const platformLabel = Platform.select({
    android: "Android spacing is active",
    ios: "iOS spacing is active",
    web: "Web spacing is active",
    default: "Default platform spacing is active",
  });

  const renderDeal = ({ item }) => {
    const savings = Number(item.savings).toFixed(0);

    return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={() =>
        navigation.navigate("DealDetails", {
          deal: item,
        })
      }
    >
      {item.thumb && (
        <Card.Cover
          source={{ uri: getSecureImageUrl(item.thumb) }}
          style={styles.cover}
        />
      )}

      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {item.title}
          </Text>

          <Chip compact icon="sale">
            {savings}% off
          </Chip>
        </View>

        <View style={styles.priceRow}>
          <Text variant="titleMedium" style={styles.salePrice}>
            ${item.salePrice}
          </Text>

          <Text variant="bodyMedium" style={styles.normalPrice}>
            ${item.normalPrice}
          </Text>
        </View>

        <Text variant="bodySmall" style={styles.body}>
          Deal rating: {item.dealRating} / 10
        </Text>
      </Card.Content>
    </Card>
  );
  };

  let content;

  if (loading) {
    content = (
      <View style={styles.centerContent}>
        <ActivityIndicator animating size="large" />
        <Text variant="bodyMedium" style={styles.statusText}>
          Loading game deals...
        </Text>
      </View>
    );
  } else if (error) {
    content = (
      <View style={styles.centerContent}>
        <Text variant="titleMedium" style={styles.errorText}>
          {error}
        </Text>

        <Button
          mode="contained"
          icon="reload"
          onPress={fetchDeals}
          style={styles.retryButton}
        >
          Retry
        </Button>
      </View>
    );
  } else if (!hasLoaded) {
    content = (
      <View style={styles.centerContent}>
        <Text variant="headlineSmall" style={styles.emptyTitle}>
          Game Deals
        </Text>

        <Text variant="bodyMedium" style={styles.statusText}>
          We're running on {Platform.OS}. Load game deals from CheapShark
          and filter them locally.
        </Text>

        <Button
          mode="contained"
          icon="cloud-download-outline"
          onPress={fetchDeals}
          style={styles.retryButton}
        >
          Load Deals
        </Button>
      </View>
    );
  } else {
    content = (
      <FlatList
        data={filteredDeals}
        keyExtractor={(item) => item.dealID}
        renderItem={renderDeal}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.heading}>
              Game Deals
            </Text>

            <Text variant="bodyMedium" style={styles.subtitle}>
              Deals are fetched once from CheapShark. Search filters the
              already loaded data.
            </Text>

            <Text variant="bodySmall" style={styles.platformText}>
              We're running on {Platform.OS}. {platformLabel}.
            </Text>

            <PlatformInfo />

            <Searchbar
              placeholder="Search game title"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.search}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.noMatches}>
            <Text variant="titleMedium">No matching deals</Text>
            <Text variant="bodyMedium" style={styles.statusText}>
              Try another search word.
            </Text>
          </View>
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="REST API" />
        {hasLoaded && !loading && !error && (
          <Appbar.Action icon="reload" onPress={fetchDeals} />
        )}
      </Appbar.Header>

      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  statusText: {
    marginTop: 8,
    textAlign: "center",
    lineHeight: 21,
    color: colors.mutedText,
  },

  errorText: {
    marginBottom: 8,
    textAlign: "center",
    color: colors.secondary,
  },

  retryButton: {
    marginTop: 16,
  },

  emptyTitle: {
    fontWeight: "bold",
  },

  list: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 16,
    paddingTop: Platform.select({
      android: 6,
      ios: 14,
      web: 2,
      default: 8,
    }),
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    marginBottom: 10,
    lineHeight: 21,
    color: colors.mutedText,
  },

  platformText: {
    marginBottom: Platform.select({
      android: 10,
      ios: 16,
      web: 8,
      default: 12,
    }),
    color: colors.secondary,
  },

  search: {
    backgroundColor: colors.surface,
  },

  card: {
    marginBottom: 14,
    backgroundColor: colors.surface,
  },

  cover: {
    height: 120,
    backgroundColor: colors.background,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  cardTitle: {
    flex: 1,
    fontWeight: "bold",
  },

  body: {
    marginTop: 10,
    lineHeight: 21,
    color: colors.mutedText,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginTop: 14,
  },

  salePrice: {
    fontWeight: "bold",
    color: colors.secondary,
  },

  normalPrice: {
    color: colors.mutedText,
    textDecorationLine: "line-through",
  },

  noMatches: {
    alignItems: "center",
    paddingTop: 40,
  },
});
