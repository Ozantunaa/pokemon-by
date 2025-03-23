import { create } from "zustand";
import { PokemonCard } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Cards {
    selectedCard: PokemonCard | null;
    savedCards: PokemonCard[];
    setSelectedCard: (card: PokemonCard | null) => void;
    saveCard: (card: PokemonCard) => Promise<void>;
    removeSavedCard: (cardId: string) => Promise<void>;
    loadSavedCards: () => Promise<void>;
    isSaved: (cardId: string) => boolean;
}

export const useCardsStore = create<Cards>((set, get) => ({
    selectedCard: null,
    savedCards: [],
    setSelectedCard: (card) => set({ selectedCard: card }),

    saveCard: async (card) => {
        try {
            const currentSavedCards = [...get().savedCards];
            const updatedSavedCards = [...currentSavedCards, card];
            await AsyncStorage.setItem('savedCards', JSON.stringify(updatedSavedCards));
            set({ savedCards: updatedSavedCards });
        } catch (error) {
            console.error('Error saving card:', error);
        }
    },

    removeSavedCard: async (cardId) => {
        try {
            const currentSavedCards = [...get().savedCards];
            const updatedSavedCards = currentSavedCards.filter(card => card.id !== cardId);
            await AsyncStorage.setItem('savedCards', JSON.stringify(updatedSavedCards));
            set({ savedCards: updatedSavedCards });
        } catch (error) {
            console.error('Error removing saved card:', error);
        }
    },

    loadSavedCards: async () => {
        try {
            const savedCardsJson = await AsyncStorage.getItem('savedCards');
            const savedCards = savedCardsJson ? JSON.parse(savedCardsJson) : [];
            set({ savedCards });
        } catch (error) {
            console.error('Error loading saved cards:', error);
        }
    },

    isSaved: (cardId) => {
        return get().savedCards.some(card => card.id === cardId);
    },
}));
