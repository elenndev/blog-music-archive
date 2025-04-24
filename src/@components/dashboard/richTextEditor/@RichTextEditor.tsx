'use client'
import { useEditor} from '@tiptap/react'
import MenuBar from './MenuBar'
import PostEditor from './PostEditor'
import FloatingMenuBar from './FloatingMenuBar'
import ConfigEditor from './configEditor'
import { toast } from 'react-toastify'
import PostHeader from './PostHeader'
import { TypePost } from '@/types'
import { useState } from 'react'

interface RichTextEditorProps {
    post?: TypePost;
}
export default function RichTextEditor({
    post,
}: RichTextEditorProps) {
    const configs = ConfigEditor({content: post?.content ?? "<p>Write something!</p>"})
    const editor = useEditor(configs);
    const [postHeader, setPostHeader] = useState
        <{cover: null | string; cover_description: null | string}>
        ({cover: null, cover_description: null})

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(!editor){ return }

        const parser = new DOMParser
        const doc = parser.parseFromString(editor.getHTML(), 'text/html')
        const h1s = doc.querySelectorAll('h1')
        if(h1s.length == 0){
            return toast.error('Crie um título (H1) para sua públicação')
        }else if (h1s.length > 1){
            return toast.error("Sua publicação deve ter apenas 1 título (H1)")
        }

        const paragraph = doc.querySelector('p')
        if (!paragraph){
            return toast.error("Sua públicação deve ter pelo menos 1 parágrafo")
        }

        return toast.info("Conteudo ok")
    }

    return (
    <div className='w-[80%] p-4 bg-white shadow-2xl rounded-3xl'>
        <MenuBar editor={editor} />
        <form onSubmit={handleSubmit}>
        <FloatingMenuBar editor={editor}/>
        <PostEditor editor={editor}/>
        <PostHeader setPostHeader={setPostHeader} postHeader={postHeader}/>
        <span className='flex justify-center'>
            <button type='submit' className='bg-blue-600 hover:bg-blue-800 rounded-lg cursor-pointer flex flex-row justify-center px-4 text-white text-[1.5rem] mt-5'>Salvar Publicação</button>
        </span>
        </form>
    </div>
    );
}