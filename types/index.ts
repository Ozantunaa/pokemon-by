export interface PokemonCard {
    id: string;
    name: string;
    images: {
        small: string;
        large: string;
    };
    level: string
    hp: string
    evolvesFrom: string
    abilities: {
        name: string;
        type: string;
        text: string;
    }[]
    types: string[]
}