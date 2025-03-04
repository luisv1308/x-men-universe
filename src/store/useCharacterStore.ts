import { create } from "zustand";
import { fetchCharacters, fetchCharacterById } from "../api/marvelApi";
import  Character  from "../interfaces/Character";

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

export const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  filteredCharacters: [],
  selectedCharacter: null,
  loading: false,
  error: null,
  page: 0,
  setPage: (page) => set({ page }),
  searchCharacter: (query) => {
    set((state) => ({
      filteredCharacters: state.characters.filter((char) =>
        char.name.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
  fetchXMenCharacters: async (page = 0) => {
    set({ loading: true, error: null });
    try {
      const allCharacters = await fetchCharacters(20, page * 20);
      
      set({ 
        characters: allCharacters, 
        filteredCharacters: allCharacters,
        page
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
