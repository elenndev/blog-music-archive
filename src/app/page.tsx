'use client'
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "@/styled/themes.";
import { useEffect, useState } from "react";

export default function Page() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark")
  useEffect(()=>{
          if(!localStorage.getItem("theme")){
              localStorage.setItem("theme", 'dark')
              setTheme(localStorage.getItem("theme") ?? "dark")
          }
      },[])
  
  return (
      <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <div className='w-full h-full flex justify-center items-center text-[2rem]'>
          <p>Check the text editor <Link href={'/dashboard'} className="text-blue-800 cursor-pointer underline">here</Link></p>
      </div>
    </ThemeProvider>
  );
}
