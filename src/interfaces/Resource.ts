interface Resource {
    id: number;
    title: string;
    description: string;
    thumbnail: { path: string; extension: string };
    path: string;
    extension: string;
}

export default Resource