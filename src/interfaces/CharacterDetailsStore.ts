import Resource from "./Resource"

interface CharacterDetailsStore {
    series: Resource[];
    comics: Resource[];
    loading: boolean;
    error: string | null;
    fetchResources: (id: string, type: "series" | "comics") => Promise<void>;
}

export default CharacterDetailsStore