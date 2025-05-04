import { TypeAlbum } from "@/types";

export default function ShowCurrentAlbum({album} : {album: TypeAlbum}){
    return (
        <span className='album-content flex flex-col gap-3 items-center'>
            <h3>Albúm definido no momento</h3>
            <span className='album-cover-area'>
                {album.images[0].url && (<>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`capa do album ${album.name} do artista ${album.artists}`} src={album.images[0].url} style={{maxWidth: '200px'}} />
                </>)}
            </span>
            <span className='album-info'>
                <p className='album-name font-semibold text-center'>{album.name}</p>
                <p className='album-artist'>{album.artists[0].name}</p>
                <p className='album-total_tracks'>{album.total_tracks} faixas • {album.release_date.slice(0,4)}</p>
                <a aria-label="Abrir album em destaque no spotify" href={album.uri}>link para spotify</a>
            </span>
        </span>
    )
}