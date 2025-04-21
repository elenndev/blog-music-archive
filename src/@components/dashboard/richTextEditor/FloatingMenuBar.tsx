import { Editor } from "@tiptap/react";
import { FloatingMenu } from '@tiptap/react'

export default function FloatingMenuBar({ editor }: { editor: Editor | null }) {
    return(<>
        {editor && (<>
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div data-testid="floating-menu" className="floating-menu">
                    <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                    H1
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                    H2
                    </button>
                    <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                    Bullet list
                    </button>
                </div>
            </FloatingMenu>
        </>)}
    </>)
}