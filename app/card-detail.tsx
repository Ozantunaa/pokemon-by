import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useCard } from '@/services/cardsService';
import { useCardsStore } from '@/stores/cardsStore';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const CardDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: card, isLoading } = useCard(id as string);
  const { saveCard, removeSavedCard, isSaved } = useCardsStore();

  const toggleSave = async () => {
    if (!card) return;

    if (isSaved(card.id)) {
      await removeSavedCard(card.id);
    } else {
      await saveCard(card);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Card Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style='auto' />
      <View style={styles.content}>
        <Image
          source={{ uri: card.images.large }}
          style={styles.cardImage}
          contentFit='contain'
        />
        <Pressable
          style={styles.saveButton}
          onPress={toggleSave}
        >
          <Ionicons
            name={isSaved(card.id) ? "bookmark" : "bookmark-outline"}
            size={28}
            color={isSaved(card.id) ? "#e74c3c" : "#2d3436"}
          />
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.cardName}>{card.name}</Text>
            <View style={styles.hpContainer}>
              <Text style={styles.hp}>HP {card.hp}</Text>
            </View>
          </View>

          {card.types && <View style={styles.typeContainer}>
            <Text style={styles.labelText}>Type</Text>
            <Text style={styles.typeText}>{card.types.join(', ')}</Text>
          </View>}

          {card.level && <View style={styles.levelContainer}>
            <Text style={styles.labelText}>Level</Text>
            <Text style={styles.levelText}>{card.level}</Text>
          </View>}

          {card.evolvesFrom && (
            <View style={styles.evolutionContainer}>
              <Text style={styles.labelText}>Evolves from</Text>
              <Text style={styles.evolutionText}>{card.evolvesFrom}</Text>
            </View>
          )}

          {card.abilities?.map((ability, index) => (
            <View key={index} style={styles.abilityContainer}>
              <View style={styles.abilityHeader}>
                <Text style={styles.abilityTitle}>{ability.name}</Text>
                <View style={styles.abilityTypeTag}>
                  <Text style={styles.abilityTypeText}>{ability.type}</Text>
                </View>
              </View>
              <Text style={styles.abilityText}>{ability.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default CardDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  cardName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    flex: 1,
    marginRight: 8,
  },
  hpContainer: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  hp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  typeContainer: {
    marginBottom: 16,
  },
  labelText: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 4,
  },
  typeText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '600',
  },
  levelContainer: {
    marginBottom: 16,
  },
  levelText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '600',
  },
  evolutionContainer: {
    marginBottom: 16,
  },
  evolutionText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '600',
  },
  abilityContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
  },
  abilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  abilityTypeTag: {
    backgroundColor: '#74b9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  abilityTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  abilityText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
  saveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});