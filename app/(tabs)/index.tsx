import { StyleSheet, FlatList, ActivityIndicator, Text, View, Pressable, SafeAreaView } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useCards } from '@/services/cardsService';
import { Image } from 'expo-image';
import { PokemonCard } from '@/types';
import { Link } from 'expo-router';
import { useCardsStore } from '@/stores/cardsStore';
import Loading from '@/components/Loading';
import { CardItem } from '@/components/CardItem';

export default function HomeScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useCards();
  const { loadSavedCards, isSaved } = useCardsStore();

  const allCards = data?.pages.flatMap(page => page.data) ?? [];

  useEffect(() => {
    loadSavedCards();
  }, []);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = ({ item }: { item: PokemonCard }) => {
    const saved = isSaved(item.id);
    return <CardItem item={item} saved={saved} />;
  }

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <Loading/>
    );
  };

  if (isLoading) return <Loading/>

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        data={allCards}
        renderItem={renderItem}
        keyExtractor={(item: PokemonCard) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 10,
  },
});
