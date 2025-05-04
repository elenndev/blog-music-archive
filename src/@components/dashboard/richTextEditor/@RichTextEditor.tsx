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
import * as S from '@/styled/styledDashboard'

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
    <S.StyledTextEditor>
        <MenuBar editor={editor} />
        <form onSubmit={handleSubmit} className=' flex w-full flex-col items-center px-3 gap-5'>
            <FloatingMenuBar editor={editor}/>
            <PostEditor editor={editor}/>
            <PostHeader setPostHeader={setPostHeader} postHeader={postHeader}/>
            <span className='flex justify-center'>
                <S.StyledButtonPrimary type='submit' 
                className='text-[1.5rem] mt-5'>
                    Salvar Publicação
                </S.StyledButtonPrimary>
            </span>
        </form>
    </S.StyledTextEditor>
    );
}