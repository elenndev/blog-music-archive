'use client'
import { useState } from "react"
import IframePlaylist from "../IframePlaylist"
import {generatePlaylistEmbedLink} from '@/utils/generatePlaylistEmbedLink'
import { useDashboard } from "@/hooks/useDashboard"
import { toast } from "react-toastify"


export default function SetPlaylistSpotlight({playlistUrl} : {playlistUrl?: string}){
    const [playlist, setPlaylist] = useState(playlistUrl)
    const [inputPlaylist, setInputPlaylist] = useState("")
    const [loadingPlaylist, setLoadingPlaylist] = useState(false)
    const { updateBlogQuickInfo } = useDashboard()

    async function handleSubmitPLaylist(e: React.FormEvent){
        e.preventDefault()
        if(inputPlaylist != " "){
            const embedPlaylistLink = generatePlaylistEmbedLink(inputPlaylist) as string
            setLoadingPlaylist(true)
            
            const updatedInfo = await updateBlogQuickInfo(embedPlaylistLink)
            if(updatedInfo.status == 200){
                setPlaylist(embedPlaylistLink)
                toast.info("Playlist atualizada")
                setLoadingPlaylist(false)
                setInputPlaylist("")
            } else {
                setInputPlaylist("")
                toast.error(`${updatedInfo.errorMessage ?? "Erro ao tentar atualizar playlist"}`)
                setLoadingPlaylist(false)
            }
        }

    }

    return (
        <div className="featured-playlist">
            <p className="container-header">Definir playlist em destaque</p>
            <form onSubmit={handleSubmitPLaylist}>
                <label>Informe o link da sua playlist:</label>
                <input type="url" name="playlist-link" className="playlist-link" placeholder="Link da playlist"
                value={inputPlaylist} onChange={(e)=> setInputPlaylist(e.target.value)}/>
                <button type="submit" className="btn btn-primary"
                disabled={loadingPlaylist}>Enviar</button>
            </form>
            <span className="see-playlist">
                <p>Playlist em destaque atual</p>
                {loadingPlaylist ? (<p>Carregando playlist, aguarde</p>) : (<>
                    {playlist?
                        <IframePlaylist playlist={playlist}/>
                    : <p>Nenhuma playlist no momento</p>}
                </>)}
            </span>
        </div>
    )
}