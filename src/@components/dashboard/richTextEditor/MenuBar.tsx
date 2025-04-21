'use client'
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
    //The image extension is only responsible for displaying images. It doesn’t upload images to your server, for that you can integrate the FileHandler extension
    function OpenAddImageTab(){
        setNewImage("")
        setAddingImage(true)
    }

    function saveNewImage(){
        setAddingImage(false)
        const url = newImage
        if (url != "" && editor){
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const [newImage, setNewImage] = useState<string>("")
    const [addingImage, setAddingImage] = useState(false)
    
    if (!editor) {
        return null;
    }
    const Options = [
        {
            label: "H1",
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            label: "H2",
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            label: "H3",
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            label: "Bold",
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            label: "Italic",
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            label: "Strike",
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            label: "Left",
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            label: "Center",
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            label: "Right",
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            label: "Bullet List",
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            label: "Ordered List",
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            label: "Highlight",
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
        {
            label: "Add Image",
            onClick: () => { OpenAddImageTab()},
            pressed: editor.isActive("highlight"),
        },
    ];

    return (<>
        <div className='relative flex justify-center'>
            <span className='bg-[black]'>
                {Options.map((option, index) => (
                    <button
                        key={index}
                        onClick={option.onClick}
                        style={{
                            marginRight: "4px",
                            backgroundColor: option.pressed ? "#ddd" : "#fff"
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </span>
            {addingImage && (
                <span className='flex flex-col border bg-[white]'>
                    <p>{"Enter the image link (url)"}</p>
                    <input value={newImage} type='text' className='border' onChange={(e) => setNewImage(e.target.value)}/>
                    <button onClick={()=>saveNewImage()}>Add</button>
                </span>
            )}
        </div>
    </>);
}
