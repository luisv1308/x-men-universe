import { create } from "zustand";
import {
  fetchCharacters,
  fetchCharacterById,
  fetchCharactersByStartsWith,
} from "../api/marvelApi";
import Character from "../interfaces/Character";

interface CharacterStore {
  characters: Character[];
  filteredCharacters: Character[];
  loading: boolean;
  error: string | null;
  page: number;
  selectedCharacter: Character | null;

  fetchXMenCharacters: (page?: number) => Promise<void>;
  searchCharacter: (query: string) => void;
  setPage: (page: number) => void;
  fetchCharacterDetails: (id: number) => Promise<void>;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  filteredCharacters: [],
  selectedCharacter: null,
  loading: false,
  error: null,
  page: 0,
  setPage: (page) => set({ page }),
  searchCharacter: async (query) => {
    set({ loading: true, error: null });
    const localPage = get().page;

    // Checar query no es vacio
    if (query.trim() === "") {
      get().fetchXMenCharacters(localPage).then(() => {
        set({});
      });
      return;
    }

    try {
      const fetchedCharacters = await fetchCharactersByStartsWith(query); // Agregamos el query
      set({ filteredCharacters: fetchedCharacters });
    } catch (error) {
      set({ error: "Error al buscar personajes xxxxxxx" });
    } finally {
      set({ loading: false });
    }
  },
  fetchXMenCharacters: async (page = 0) => {
    set({ loading: true, error: null });
    try {
      const allCharacters = await fetchCharacters(20, page * 20);

      set({
        characters: allCharacters,
        filteredCharacters: allCharacters,
        page,
      });
    } catch (error) {
      set({ error: "Error al cargar personajes" });
    } finally {
      set({ loading: false });
    }
  },
  fetchCharacterDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const character = await fetchCharacterById(id);
      set({ selectedCharacter: character });
    } catch (error) {
      set({ error: "Error al cargar detalles del personaje" });
    } finally {
      set({ loading: false });
    }
  },
}));

