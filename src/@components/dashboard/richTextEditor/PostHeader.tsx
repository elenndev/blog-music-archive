'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import * as S from '@/styled/styledDashboard';

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
        <S.StyledContainer className='w-[95%] bg-[var(--HighlightColor)]'>
            <fieldset 
            className='flex flex-col 
            w-fit p-4 items-center gap-3'>
                <span className='flex flex-col w-[85%]'>
                    <label htmlFor='postHeader'>Adicione uma capa a sua publicação, informando o link da imagem</label>
                    <input type='url' id='postHeader' name='postHeader' 
                    className='rounded-3xl border border-[var(--DecorateColor)] px-5' 
                    value={headerUrl} 
                    onChange={(e)=> setHeaderUrl(e.target.value)}>
                    </input>
                </span>

                <span className='flex flex-col w-[85%]'>
                    <label htmlFor='headerAlt'>Adicione uma descrição(alt) para a imagem</label>
                    <input type='text' minLength={5} id='headerAlt' name='headerAlt' 
                    value={headerAlt} 
                    className='rounded-3xl border border-[var(--DecorateColor)] px-5'
                    onChange={(e)=> setHeaderAlt(e.target.value)}></input>
                </span>

                <S.StyledButtonSecondary onClick={()=>handleSetHeader()} 
                type='button'>
                    Definir capa
                </S.StyledButtonSecondary>

            </fieldset>

            <span className='flex flex-col gap-4 items-center 
            bg-[var(--MainColor)] border border-[var(--SecondaryColor)] text-[var(--SecondaryColor)] 
            min-h-[250px] max-h-[400px] min-w-[300px] max-w-[98%] mb-4'>
                <p className='text-left w-full ml-2'>Preview:</p>
                {postHeader?.cover && postHeader.cover != '' 
                && postHeader?.cover_description && postHeader.cover_description != '' &&
                showPreview && 

                // eslint-disable-next-line @next/next/no-img-element
                (<img src={postHeader.cover} alt={postHeader.cover_description} width={800} height={200} style={{objectFit: 'cover', width: '90%', height: '200px'}}></img>)}
            </span>
        </S.StyledContainer>
    )
}