'use client'
import { useState } from "react"
import SetSpotlightAlbum from "./SetSpotlightAlbum"
import { TypeAlbum } from "@/types";
import ShowCurrentAlbum from "./ShowCurrentAlbum";
import { useDashboard } from "@/hooks/useDashboard";
import { toast } from "react-toastify";

interface albumSpotlighProps {
    storedAlbum?: TypeAlbum;
}
export default function AlbumSpotlight({storedAlbum}: albumSpotlighProps){
    const [album, setAlbum] = useState<null | TypeAlbum>(storedAlbum ?? null)
    const [loadingAlbum, setLoadingAlbum] = useState(false)
    const { updateBlogQuickInfo } = useDashboard()

    async function changeSpotlightAlbum(newAlbum: TypeAlbum){
        setLoadingAlbum(true)
        const updatedInfo = await updateBlogQuickInfo('spotlightAlbum', newAlbum.uri)
        if(updatedInfo.status == 200){
            setAlbum(newAlbum)
        } else {
            toast.error(`${updatedInfo.errorMessage ?? "Erro ao tentar atualizar a playlist"}`)
        }
        setLoadingAlbum(false)
    }

    return(<>
        {loadingAlbum ? (<p>Salvando albúm</p>) : (<>
            <SetSpotlightAlbum changeSpotlightAlbum={changeSpotlightAlbum}/>
            {album ? (<ShowCurrentAlbum album={album}/>) : (<p>Nenhum album selecionado ainda</p>)}
        </>)}
    </>)
}