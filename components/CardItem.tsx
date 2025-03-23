import { StyleSheet, Pressable, Text } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { PokemonCard } from '@/types';

interface CardItemProps {
    item: PokemonCard;
    saved: boolean;
}

export function CardItem({ item, saved }: CardItemProps) {
    return (
        <Link href={{ pathname: `/card-detail`, params: { id: item.id } }} asChild>
            <Pressable style={styles.cardContainer}>
                <Image
                    source={{ uri: item.images.small }}
                    style={styles.cardImage}
                    contentFit='contain'
                />
                <Text style={[styles.cardName, saved && { color: 'gold' }]}>
                    {item.name} {saved && "(Saved)"}
                </Text>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
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
});