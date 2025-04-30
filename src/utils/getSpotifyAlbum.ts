import axios from "axios";
import { getSpotifyToken } from "./spotifyAuth";
import { TypeAlbum } from "@/types";

export async function getSpotifyAlbum(albumId: string){
    const token = await getSpotifyToken()
    const req = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if(req.data){
        const album = req.data as TypeAlbum
        return album
    } else {
        throw new Error("Error when trying to get the album id from spotify api")
    }
}