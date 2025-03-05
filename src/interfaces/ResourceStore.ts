import Resource from "./Resource";

interface ResourceStore {
    resource: Resource;
    loading: boolean;
    error: string | null;
    fetchResources: (id: string, type: "series" | "comics") => Promise<void>
}

export default ResourceStore