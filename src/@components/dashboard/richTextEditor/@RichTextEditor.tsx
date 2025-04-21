'use client'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import MenuBar from './MenuBar'
import { useState } from 'react'
import PostEditor from './PostEditor'

interface RichTextEditorProps {
    postContent?: string;
}
export default function RichTextEditor({
    postContent,
}: RichTextEditorProps) {
    const [content, setContent] = useState(postContent ?? "<p>Write somenthing!</p>")
    function onChange(content: string){setContent(content)}

    const editor = useEditor({
        extensions: [
          StarterKit.configure({
            bulletList: {
              HTMLAttributes: {
                class: "list-disc ml-3",
              },
            },
            orderedList: {
              HTMLAttributes: {
                class: "list-decimal ml-3",
              },
            },
          }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Highlight,
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
          attributes: {
            class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
          },
        },
        onUpdate: ({ editor }) => {
          onChange(editor.getHTML());
        },
    });

    return (
    <div>
        <MenuBar editor={editor} />
        <PostEditor editor={editor}/>
    </div>
    );
}