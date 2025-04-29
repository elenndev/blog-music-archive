export async function getSpotifyAlbum(albumId){
    const token = await getSpotifyToken()
    const resultAlbum = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if(!resultAlbum.data){
        throw new Error("Error when trying to get the album id from spotify api")
    }
}