import { create } from "zustand";
import { fetchCharacters } from "../api/marvelApi";

interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface CharacterStore {
    characters: Character[];
    loading: boolean;
    error: string | null;
    loadCharacters: (limit?: number, offset?: number) => Promise<void>;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
    characters: [],
    loading: false,
    error: null,
    loadCharacters: async (limit = 20, offset = 0) => {
        set({ loading: true, error: null });
        try {
            const data = await fetchCharacters(limit, offset);
            set({ characters: data, loading: false });
        } catch (error) {
            set({ loading: false, error: "Error fetching characters" });
        }
    },
}));

export default useCharacterStore;