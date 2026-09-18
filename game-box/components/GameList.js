import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import GameCard from "./GameCard";
import { colors } from "../constants/colors";

export default function GameList({
  games,
  myGames = [],
  navigation,
  viewMode = "card",
  contentContainerStyle,
  ListHeaderComponent,
  ListEmptyComponent,
}) {
  const isCardView = viewMode === "card";

  const getRating = (game) => {
    if (game.rating !== undefined && game.rating !== null) {
      return game.rating;
    }

    const savedGame = myGames.find((item) => item.id === game.id);
    return savedGame?.rating;
  };

  const renderGame = ({ item }) => (
    <GameCard
      game={item}
      rating={getRating(item)}
      variant={isCardView ? "grid" : "list"}
      style={isCardView ? styles.gridCard : undefined}
      onPress={() =>
        navigation.navigate("GameDetails", {
          gameId: item.id,
        })
      }
    />
  );

  return (
    <FlatList
      key={viewMode}
      data={games}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderGame}
      numColumns={isCardView ? 2 : 1}
      columnWrapperStyle={isCardView ? styles.cardRow : undefined}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        ListEmptyComponent ?? (
          <Text variant="bodyMedium" style={styles.emptyText}>
            No games available.
          </Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  cardRow: {
    gap: 12,
  },

  gridCard: {
    flex: 1,
  },

  emptyText: {
    color: colors.mutedText,
  },
});
