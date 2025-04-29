import axios from "axios"
import BlogQuickInfoDB from "../../../../../models/blogQuickInfosModel"
import { NextRequest, NextResponse } from "next/server"
import { getSpotifyToken } from "@/utils/spotifyAuth"

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url)
    const whichInfo = searchParams.get("whichInfo")
    
    try{
        let quickInfo
        if (whichInfo == 'all'){
            quickInfo = await BlogQuickInfoDB.find()
        }else{
            quickInfo = await BlogQuickInfoDB.findOne({info_name: whichInfo})
        }

        if(quickInfo == null || quickInfo.lenght == 0){
            return NextResponse.json({quickInfo: []},{status: 200})
        } else if(!quickInfo){
            throw new Error("Erro na chamada ao db")
        }

        if(quickInfo && whichInfo == 'album'){
            const albumId = quickInfo.info_value
            const token = await getSpotifyToken().catch(error=>{
                const errorMessage = error instanceof Error ? error.message : "Error when trying to get the spotify token"
                return NextResponse.json({error: errorMessage}, {status:  500})
            })
            const resultAlbum = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(!resultAlbum.data){
                throw new Error("Error when trying to get the album id from spotify api")
            }
            quickInfo.info_value = resultAlbum.data;
        }

        return NextResponse.json({quickInfo},{status: 200})
        
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        return NextResponse.json({error: errorMessage},{status:500})
    }
}