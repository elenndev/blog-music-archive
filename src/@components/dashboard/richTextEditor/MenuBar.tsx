'use client'
import { Editor } from "@tiptap/react";
import { useState } from "react";
import GetIcon from "./GetIcon";
import { TypeToolbarOptions } from "@/types";

type optionType = {
    label: TypeToolbarOptions;
    onClick: () => void;
    pressed: boolean
}

export default function MenuBar({ editor }: { editor: Editor | null }) {
    const [newImage, setNewImage] = useState("")
    const [addingImage, setAddingImage] = useState(false)

    const [newLink, setNewLink] = useState("")
    const [addingNewLink, setAddingNewLink] = useState(false)

    //The image extension is only responsible for displaying images. It doesn’t upload images to your server, for that you can integrate the FileHandler extension
    function OpenAddImageTab(){
        setAddingNewLink(false)
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


    function openLinkTab(){
        setAddingImage(false)
        setNewLink("")
        setAddingNewLink(true)
    }
    function saveNewLink(){
        setAddingNewLink(false)
        if(editor && newLink!= ""){
            editor.chain().focus().toggleLink({href: newLink}).run()

        }
    }

    function cleanTabs(){
        setAddingImage(false)
        setAddingNewLink(false)
        setNewImage("")
        setNewLink("")
    }
    
    if (!editor) {
        return null;
    }
    const Options: optionType[] = [
        {
            label: "H1",
            onClick: () => {
                editor.chain().focus().toggleHeading({ level: 1 }).run()
            },
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            label: "H2",
            onClick: () => {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
                cleanTabs()
            },
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            label: "H3",
            onClick: () => {
                editor.chain().focus().toggleHeading({ level: 3 }).run()
                cleanTabs()
            },
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            label: "Bold",
            onClick: () => {
                editor.chain().focus().toggleBold().run()
                cleanTabs()
            },
            pressed: editor.isActive("bold"),
        },
        {
            label: "Italic",
            onClick: () => {
                editor.chain().focus().toggleItalic().run()
                cleanTabs()
            },
            pressed: editor.isActive("italic"),
        },
        {
            label: "Strike",
            onClick: () => {
                editor.chain().focus().toggleStrike().run()
                cleanTabs()
            },
            pressed: editor.isActive("strike"),
        },
        {
            label: "Left",
            onClick: () => {
                editor.chain().focus().setTextAlign("left").run()
                cleanTabs()
            },
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            label: "Center",
            onClick: () => {
                editor.chain().focus().setTextAlign("center").run()
                cleanTabs()
            },
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            label: "Right",
            onClick: () => {
                editor.chain().focus().setTextAlign("right").run()
                cleanTabs()
            },
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            label: "Bullet List",
            onClick: () => {
                editor.chain().focus().toggleBulletList().run()
                cleanTabs()
            },
            pressed: editor.isActive("bulletList"),
        },
        {
            label: "Ordered List",
            onClick: () => {
                editor.chain().focus().toggleOrderedList().run()
                cleanTabs()
            },
            pressed: editor.isActive("orderedList"),
        },
        {
            label: "Highlight",
            onClick: () => {
                editor.chain().focus().toggleHighlight({color: '#fbff03'}).run()
                cleanTabs()
            },
            pressed: editor.isActive("highlight"),
        },
        {
            label: "Add Image",
            onClick: () => { OpenAddImageTab()},
            pressed: editor.isActive("image"),
        },
        {
            label: "Link",
            onClick: () => {openLinkTab()},
            pressed: editor.isActive("link"),
        },
    ];

    return (<>
        <div className='relative flex flex-col gap-2 items-center w-full'>
            <span className='w-full flex flex-wrap justify-center py-3'>
                {Options.map((option, index) => (
                    <button className='flex flex-row gap-2 cursor-pointer p-2 rounded-md'
                        key={index}
                        onClick={option.onClick}
                        style={{
                            marginRight: "4px",
                            backgroundColor: option.pressed ? "#ddd" : "#fff"
                        }}
                    >
                        <GetIcon label={option.label} iconSize={"1.5rem"}/>
                    </button>
                ))}
            </span>
            {addingImage && (
                <span className='flex flex-col bg-[#fff] p-4 px-6 mb-4
                rounded-md items-center w-fit max-w-[95%] shadow-[0_0_10px_#5854542b]'>
                    <p>{"Enter the image link (url)"}</p>
                    <span className='flex flex-row gap-x-2'>
                        <input value={newImage} type='text' className='bg-[#fff] border border-yellow-300 rounded-md w-fit max-w-[80%]' onChange={(e) => setNewImage(e.target.value)}/>
                        <button onClick={()=>saveNewImage()} className='bg-blue-600 rounded-lg flex flex-row justify-center px-4 text-white'>Add Image</button>
                    </span>
                </span>
            )}
            {addingNewLink && (
                <span className='flex flex-col bg-[#fff] p-4 px-6 mb-4
                rounded-md items-center w-fit max-w-[95%] shadow-[0_0_10px_#0000002b]'>
                    <p>Enter the link</p>
                    <span className='flex flex-row gap-x-2'>
                        <input value={newImage} type='text' className='bg-[#fff] border border-blue-600 rounded-md w-fit max-w-[80%]' onChange={(e) => setNewLink(e.target.value)}/>
                        <button onClick={()=>saveNewLink()} className='bg-blue-600 rounded-lg flex flex-row justify-center px-4 text-white'>Add Link</button>
                    </span>
                </span>
            )}
        </div>
    </>);
}
