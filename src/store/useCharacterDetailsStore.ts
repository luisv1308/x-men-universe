import { create } from "zustand";
import { fetchCharacterComics, fetchCharacterSeries } from "../api/marvelApi";
import CharacterDetailsStore from "../interfaces/characterDetailsStore";

export const useCharacterDetailsStore = create<CharacterDetailsStore>((set) => ({
    series: [],
    comics: [],
    loading: false,
    error: null,
    fetchResources: async (id: string, type: "series" | "comics") => {
        set({ loading: true, error: null });
        try {
            if (type === "series") {
                console.log(id);
                const series = await fetchCharacterSeries(parseInt(id));
                
                set({ series });
                return;
            }
            const comics = await fetchCharacterComics(parseInt(id));
            
            set({ comics });
        } catch (error) {
            set({ error: "Error fetching resources" });
        } finally {
            set({ loading: false });
        }
    },
}));