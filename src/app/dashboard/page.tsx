import Dashboard from "@/@components/dashboard/@Dashboard";
import ButtonLogout from "@/@components/ButtonLogout"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import axios from "axios"
import { TypeBlogQuickInfo } from "@/types";
import { getSpotifyAlbum } from "@/utils/getSpotifyAlbum"


export default async function Page(){
    const session = await getServerSession()
    if(!session){
        return redirect('/login')
    }
    async function getAllBlogQuickInfo(){
        try{
            const url = process.env.NEXT_PUBLIC_BASE_URL
            const req = await axios.get(`${url}/api/blog-content/quick-info`,{
                params: {info_name: 'all'}    
            })
            console.log('data', req.data.quickInfo)
            if(req.data.quickInfo){
                return req.data.quickInfo as TypeBlogQuickInfo[]
            } else {
                return false
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            return false
        }
    }

    const blogQuickInfos = await getAllBlogQuickInfo() 

    const playlist: undefined | string = blogQuickInfos ? blogQuickInfos.find(info => info.info_name == 'spotlightPlaylist')?.info_value : undefined
    const albumString: undefined | string = blogQuickInfos ? blogQuickInfos.find(info => info.info_name == 'spotlightAlbum')?.info_value : undefined
    const album = albumString ? await getSpotifyAlbum(albumString) : undefined

    return (<>
    <ButtonLogout/>
    <Dashboard playlist={playlist} album={album}/>
    </>)
}

