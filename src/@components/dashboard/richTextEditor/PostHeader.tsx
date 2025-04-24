'use client'
import { useState } from "react";
import { toast } from "react-toastify";

interface postHeaderProps {
    postHeader?: {
        cover: null | string;
        cover_description: null | string; },
    setPostHeader: ( param:
        {cover: null | string;
        cover_description: null | string} ) => void;
}
export default function PostHeader({postHeader, setPostHeader} : postHeaderProps){
    const [showPreview, setShowPreview] = useState(false)
    const [headerUrl, setHeaderUrl] = useState(postHeader?.cover ?? '')
    const [headerAlt, setHeaderAlt] = useState(postHeader?.cover_description ?? '' )

    function handleSetHeader(){
        const allowImageSrc = ['webp','jpeg','jpg']

        const testImageSrc = (url: string) =>{
            let testing = false
            allowImageSrc.forEach(value => {
                testing = url.endsWith(value)
            })
            return testing
        }

        if(!testImageSrc){
            return toast.error("Imagem com formato inválido [Formatos permitidos: webp, jpeg, jpg]")
        }

        setPostHeader({cover: headerUrl, cover_description: headerAlt})
        setShowPreview(true)
    }

    return (
        <div className='w-fit flex flex-col items-center'>
            <fieldset>
                <label htmlFor='postHeader'>Adicione uma capa a sua publicação, informando o link da imagem</label>
                <input type='url' id='postHeader' name='postHeader' className='border' 
                value={headerUrl} 
                onChange={(e)=> setHeaderUrl(e.target.value)}>
                </input>

                <label htmlFor='headerAlt'>Adicione uma descrição(alt) para a imagem</label>
                <input type='text' minLength={5} id='headerAlt' name='headerAlt' value={headerAlt} className='border'
                onChange={(e)=> setHeaderAlt(e.target.value)}></input>
                <button onClick={()=>handleSetHeader()}>Definir capa</button>
            </fieldset>

            <span className='w-[90%] flex flex-col gap-4 items-center bg-[#ddd] border min-h-[300px]'>
                <p className='text-left w-full ml-2'>Preview:</p>
                {postHeader?.cover && postHeader.cover != '' 
                && postHeader?.cover_description && postHeader.cover_description != '' &&
                showPreview && 

                // eslint-disable-next-line @next/next/no-img-element
                (<img src={postHeader.cover} alt={postHeader.cover_description} width={800} height={200} style={{objectFit: 'cover', width: '90%', height: '200px'}}></img>)}
            </span>
        </div>
    )
}