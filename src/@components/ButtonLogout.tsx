'use client'
import {signOut} from 'next-auth/react'
import {redirect} from 'next/navigation'
export default function ButtonLogout(){
    function handleLogout(){
        signOut()
        redirect('/login')
    }
    return(<button type='button' onClick={()=>handleLogout()}>Logout</button>)
}