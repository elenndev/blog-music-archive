'use client'
import { useState } from "react"
import SetSpotlightAlbum from "./SetSpotlightAlbum"
import { TypeAlbum } from "@/types";
import ShowCurrentAlbum from "./ShowCurrentAlbum";

interface albumSpotlighProps {
    storedAlbum?: TypeAlbum;
}
export default function AlbumSpotlight({storedAlbum}: albumSpotlighProps){
    const [album, setAlbum] = useState<null | TypeAlbum>(storedAlbum ?? null)

    function changeSpotlightAlbum(newAlbum: TypeAlbum){
        setAlbum(newAlbum)
        // updateInd the database
    }
    return(<>
        <SetSpotlightAlbum changeSpotlightAlbum={changeSpotlightAlbum}/>
        {album ? (<ShowCurrentAlbum album={album}/>) : (<p>Nenhum album selecionado ainda</p>)}
    </>)
}