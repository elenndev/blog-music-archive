import axios from 'axios';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET


export async function getSpotifyToken(){
    const result = await axios('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    });
    return result.data.access_token;
}
