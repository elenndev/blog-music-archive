'use client'
import RichTextEditor from "./richTextEditor/@RichTextEditor"

export default function Dashboard(){
    return(<div className='min-w-full min-h-full py-5 flex flex-col items-center justify-center'> 
        <h1>Just write</h1>
        <h2></h2>
        <RichTextEditor/>
    </div>)
}