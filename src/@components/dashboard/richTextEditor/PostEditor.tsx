'use client'
import { EditorContent } from '@tiptap/react'
import { Editor } from "@tiptap/react";

export default function PostEditor({ editor }: { editor: Editor | null }){
    if(!editor){
        return <p>Loading...</p>
    }
    return <EditorContent editor={editor}/>
}