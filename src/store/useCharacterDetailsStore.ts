import { create } from "zustand";
import { fetchCharacterComics, fetchCharacterSeries } from "../api/marvelApi";
import CharacterDetailsStore from "../interfaces/characterDetailsStore";

export const useCharacterDetailsStore = create<CharacterDetailsStore>((set, get) => ({
    info: { id: 0, type: "" },
    series: [],
    comics: [],
    loading: false,
    error: null,
    fetchResources: async (id: string, type: "series" | "comics") => {
        //Check if the id and type is the same so we don't fetch the same data twice
        if (get().info.id === parseInt(id) && get().info.type === type) return;
        set({ loading: true, error: null });
        try {
            if (type === "series") {
                const series = await fetchCharacterSeries(parseInt(id));
                set({ series, info: { id: parseInt(id), type: "series" } });
                return;
            }
            const comics = await fetchCharacterComics(parseInt(id));
            set({ comics, info: { id: parseInt(id), type: "comics" } });
        } catch (error) {
            set({ error: "Error fetching resources" });
        } finally {
            set({ loading: false });
        }
    },
}));