export interface TypeAlbum {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
    total_tracks: number;
    uri: string;
    release_date: string;
}