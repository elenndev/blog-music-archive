'use client'
import { useState } from "react"
import IframePlaylist from "../IframePlaylist"
import {generatePlaylistEmbedLink} from '@/utils/generatePlaylistEmbedLink'
import { useDashboard } from "@/hooks/useDashboard"
import { toast } from "react-toastify"
import { StyledButtonSecondary } from "@/styled/styles"


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
            
            const updatedInfo = await updateBlogQuickInfo('spotlightPlaylist', embedPlaylistLink)
            if(updatedInfo.status == 200){
                setPlaylist(embedPlaylistLink)
                toast.info("Playlist atualizada")
                setInputPlaylist("")
            } else {
                setInputPlaylist("")
                toast.error(`${updatedInfo.errorMessage ?? "Erro ao tentar atualizar playlist"}`)
            }
            setLoadingPlaylist(false)
        }

    }

    return (
        <div className="featured-playlist flex flex-col gap-2">
            {loadingPlaylist ? (<p>Salvando playlist, aguarde</p>) : 
            (<>
                <h2 className="container-header">Definir playlist em destaque</h2>
                <form onSubmit={handleSubmitPLaylist}
                className='flex flex-col gap-2'>
                    <label>Informe o link da sua playlist:</label>
                    <input type="url" 
                    name="playlist-link" 
                    className="playlist-link border border-[var(--SecondaryColor)] px-5 rounded-2xl" 
                    placeholder="Link da playlist"
                    value={inputPlaylist} onChange={(e)=> setInputPlaylist(e.target.value)}/>
                    <StyledButtonSecondary type="submit" className={`w-fit ${loadingPlaylist && 'opacity-30'}`}
                    disabled={loadingPlaylist}>Enviar</StyledButtonSecondary>
                </form>
                <span className="see-playlist">
                    <h3 className='text-center'>Playlist em destaque atual</h3>
                        {playlist?
                            <IframePlaylist playlist={playlist}/>
                        : <p className='text-center'>Nenhuma playlist no momento</p>}
                </span>
            </>)
            }
        </div>
    )
}