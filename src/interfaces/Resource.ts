interface Resource {
    id: number;
    title: string;
    description: string;
    thumbnail: { path: string; extension: string };
    path: string;
    extension: string;
    urls: { type: string; url: string }[]
}

export default Resource