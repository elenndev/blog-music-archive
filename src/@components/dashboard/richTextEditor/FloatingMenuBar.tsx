import { Editor } from "@tiptap/react";
import { FloatingMenu } from '@tiptap/react'
import GetIcon from "./GetIcon";

export default function FloatingMenuBar({ editor }: { editor: Editor | null }) {
    return(<>
        {editor && (<>
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div data-testid="floating-menu" className="floating-menu bg-gray-700 flex flex-row justify-center rounded-2xl p-1 px-3 gap-3 shadow-md">
                    <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        <GetIcon iconSize="1rem" label="H1" iconColor="#ddd"/>
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        <GetIcon iconSize="1rem" label="H2" iconColor="#ddd"/>
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <GetIcon iconSize="1rem" label="Bullet List" iconColor="#ddd"/>
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <GetIcon iconSize="1rem" label="Bold" iconColor="#ddd"/>
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <GetIcon iconSize="1rem" label="Italic" iconColor="#ddd"/>
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        <GetIcon iconSize="1rem" label="Strike" iconColor="#ddd"/>
                    </button>
                </div>
            </FloatingMenu>
        </>)}
    </>)
}