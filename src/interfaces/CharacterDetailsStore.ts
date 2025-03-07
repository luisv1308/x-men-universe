import Resource from "./Resource"

interface CharacterDetailsStoreInterface {
    info: { id: number, type: string };
    series: Resource[];
    comics: Resource[];
    loading: boolean;
    error: string | null;
    fetchResources: (id: string, type: "series" | "comics") => Promise<void>;
}

export default CharacterDetailsStoreInterface