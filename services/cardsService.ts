import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "../config/config";
import { PokemonCard } from "@/types";

const getCards = async ({ pageParam = 1 }) => {
    const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALLCARDS}?page=${pageParam}&pageSize=10`
    );
    return response.data;
};

export const useCards = () => {
    return useInfiniteQuery({
        queryKey: ['cards'],
        queryFn: getCards,
        getNextPageParam: (lastPage, pages) => {
            const totalCount = lastPage.totalCount;
            const currentPage = pages.length;
            const hasNextPage = currentPage * 10 < totalCount;
            
            return hasNextPage ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
    });
};

const getCardById = async (id: string): Promise<PokemonCard> => {
    const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALLCARDS}/${id}`
    );
    return response.data.data;
};

export const useCard = (id: string) => {
    return useQuery({
        queryKey: ['card', id],
        queryFn: () => getCardById(id),
        enabled: !!id,
    });
};