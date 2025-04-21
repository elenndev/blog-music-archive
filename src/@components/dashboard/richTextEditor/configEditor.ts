import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Foo from './Foo'
import { Editor } from "@tiptap/react";

interface configEditorParams {
  onChange: (contentValue: string)=> void, 
  content: string 
}
export default function ConfigEditor(params: configEditorParams){
  const {content, onChange} = params
    const editor = {
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
              Highlight, Image, Foo, 
              Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                  try {
                    // construct URL
                    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
        
                    // use default validation
                    if (!ctx.defaultValidate(parsedUrl.href)) {
                      return false
                    }
        
                    // disallowed protocols
                    const disallowedProtocols = ['ftp', 'file', 'mailto']
                    const protocol = parsedUrl.protocol.replace(':', '')
        
                    if (disallowedProtocols.includes(protocol)) {
                      return false
                    }
        
                    // only allow protocols specified in ctx.protocols
                    const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))
        
                    if (!allowedProtocols.includes(protocol)) {
                      return false
                    }
        
                    // disallowed domains
                    const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                    const domain = parsedUrl.hostname
        
                    if (disallowedDomains.includes(domain)) {
                      return false
                    }
        
                    // all checks have passed
                    return true
                  } catch {
                    return false
                  }
                },
                shouldAutoLink: url => {
                  try {
                    // construct URL
                    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
        
                    // only auto-link if the domain is not in the disallowed list
                    const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                    const domain = parsedUrl.hostname
        
                    return !disallowedDomains.includes(domain)
                  } catch {
                    return false
                  }
                },
        
              })
            ],
            content: content,
            immediatelyRender: false,
            editorProps: {
              attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
              },
            },
            onUpdate: ({ editor }: {editor: Editor}) => {
              onChange(editor.getHTML());
            },
    };

    return editor
}

