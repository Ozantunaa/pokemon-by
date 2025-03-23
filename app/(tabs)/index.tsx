import { StyleSheet, FlatList, ActivityIndicator, Text, View, Pressable, SafeAreaView } from 'react-native';
import { useCallback } from 'react';
import { useCards } from '@/services/cardsService';
import { Image } from 'expo-image';
import { PokemonCard } from '@/types';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useCards();
  const allCards = data?.pages.flatMap(page => page.data) ?? [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = ({ item }: { item: PokemonCard }) => (
    <Link href={{ pathname: `/card-detail`, params: { id: item.id } }} asChild>
      <Pressable style={styles.cardContainer}>
        <Image
          source={{ uri: item.images.small }}
          style={styles.cardImage}
          contentFit='contain'
        />
        <Text style={styles.cardName}>{item.name}</Text>
      </Pressable>
    </Link>

  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
  cardContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',

  },
  cardImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
  cardName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
});
