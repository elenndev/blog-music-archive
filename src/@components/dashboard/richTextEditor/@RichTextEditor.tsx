'use client'
import { useEditor} from '@tiptap/react'
import MenuBar from './MenuBar'
import { useState } from 'react'
import PostEditor from './PostEditor'
import FloatingMenuBar from './FloatingMenuBar'
import ConfigEditor from './configEditor'

interface RichTextEditorProps {
    postContent?: string;
}
export default function RichTextEditor({
    postContent,
}: RichTextEditorProps) {
    const [content, setContent] = useState(postContent ?? "<p>Write something!</p>")
    function onChange(content: string){
      setContent(content)
    }
    const configs = ConfigEditor({content, onChange})
    const editor = useEditor(configs);

    function handleSubmit(e: React.FormEvent){
      e.preventDefault()
      console.log(`Here is the content of the text Editor \n ${content}`)
    }

    return (
    <div className='w-[80%] p-4 bg-white shadow-2xl rounded-3xl'>
      <form onSubmit={handleSubmit}>
        <MenuBar editor={editor} />
        <FloatingMenuBar editor={editor}/>
        <PostEditor editor={editor}/>
        <span className='flex justify-center'>
          <button type='submit' className='bg-blue-600 hover:bg-blue-800 rounded-lg cursor-pointer flex flex-row justify-center px-4 text-white text-[1.5rem] mt-5'>Save</button>
        </span>
      </form>
    </div>
    );
}