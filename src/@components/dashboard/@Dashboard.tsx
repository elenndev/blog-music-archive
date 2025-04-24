'use client'
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "@/styled/themes.";
import { ToastContainer } from "react-toastify"
import RichTextEditor from "./richTextEditor/@RichTextEditor"
import ToggleThemeButton from "../ToggletThemeButton";
import Link from "next/link";


export default function Dashboard(){
    const [theme, setTheme] = useState('dark')
    useEffect(()=>{
        if(!localStorage.getItem("theme")){
            localStorage.setItem("theme", 'dark')
            setTheme(localStorage.getItem("theme") ?? "dark")
        }
    },[])
    return(
        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div className='min-w-full min-h-full py-5 flex flex-col items-center justify-center relative'>
                <span className='w-full'>
                    <ToggleThemeButton changeTheme={setTheme} theme={theme}/>
                    <Link href='/'>Ir pro homepage</Link>
                </span> 
                <ToastContainer/>
                <h1>Just write</h1>
                <h2></h2>
                <RichTextEditor/>
            </div>
        </ThemeProvider>
    )
}