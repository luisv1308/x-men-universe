import { create } from "zustand";
import { fetchSingleComic, fetchSingleSeries } from "../api/marvelApi";
import ResourceStore from "../interfaces/ResourceStore";
import Resource from "../interfaces/Resource";

export const useResourcesDetailsStore = create<ResourceStore>((set) => ({
    resource: {} as Resource,
    loading: false,
    error: null,
    fetchResources: async (id: string, type: "series" | "comics") => {
        set({ loading: true, error: null });
        try {
            if (type === "series") {
                const series = await fetchSingleSeries(parseInt(id));
                set({ resource: series });
                return;
            }
            const comics = await fetchSingleComic(parseInt(id));
            set({ resource: comics });
        } catch (error) {
            set({ error: "Error fetching resources" });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useResourcesDetailsStore;