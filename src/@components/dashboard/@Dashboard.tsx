'use client'
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "@/styled/themes";
import { ToastContainer } from "react-toastify"
import RichTextEditor from "./richTextEditor/@RichTextEditor"
import ToggleThemeButton from "../ToggletThemeButton";
import Link from "next/link";
import AlbumSpotlight from "./AlbumSpotlight/@AlbumSpotlight";
import SetPlaylistSpotlight from "./SetPlaylistSpotlight";
import { TypeAlbum } from "@/types";

interface dashboardProps{
    playlist?: string;
    album?: TypeAlbum;

}
export default function Dashboard({playlist, album} : dashboardProps){
    const [theme, setTheme] = useState('dark')

    useEffect(()=>{
        const getTheme = localStorage.getItem("theme")
        if(getTheme){
            setTheme(getTheme)
        }else{
            localStorage.setItem("theme", 'dark')
        }
    },[])

    return(
        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div className='min-w-full min-h-full py-5 flex flex-col items-center justify-center relative'>
                <ToastContainer theme={theme}/>
                <span className='w-full'>
                    <ToggleThemeButton changeTheme={setTheme} theme={theme}/>
                    <Link href='/'>Ir pro homepage</Link>
                </span> 
                <RichTextEditor/>
                <AlbumSpotlight storedAlbum={album}/>
                <SetPlaylistSpotlight playlistUrl={playlist}/>
            </div>
        </ThemeProvider>
    )
}