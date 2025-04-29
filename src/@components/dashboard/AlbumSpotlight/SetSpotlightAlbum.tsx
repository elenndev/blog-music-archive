'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TypeAlbum } from '../../../types';
import {getSpotifyToken} from '@/utils/spotifyAuth'
import {toast} from 'react-toastify'

interface setAlbumProps {
    changeSpotlightAlbum: (album: TypeAlbum) => void;
}

export default function SetSpotlightAlbum({changeSpotlightAlbum} : setAlbumProps){
    const [query, setQuery] = useState<string>('');  
    const [albums, setAlbums] = useState<TypeAlbum[]>([]);  
    const [selectedAlbum, setSelectedAlbum] = useState<TypeAlbum | null>(null); 
    const [token, setToken] = useState<string>(''); 

    useEffect(() => {
        const authenticate = async () => {
            const _token = await getSpotifyToken().catch(error =>{
                console.log(error)
                const errorMessage = error instanceof Error ? error.message : "Erro ao se conectar com o Spotify API"
                toast.error(errorMessage)
            });
            setToken(_token);
        };
        authenticate();
    }, []);

    useEffect(() => {
        if(!token){
            return
        }
        const searchAlbum = async () => {
            if (!query) {
                setAlbums([]);
                return;
            }
            try {
                const result = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        q: query,
                        type: 'album',
                    },
                });
                setAlbums(result.data.albums.items);

            } catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error? error.message : 'Erro ao buscar os álbuns'
                toast.error(errorMessage) 
            }
        };


        const debounceSearch = setTimeout(() => {
            searchAlbum();
        }, 300); 

        return () => clearTimeout(debounceSearch); 
    }, [query, token]); 

    return (
        <div className='featured-album'  style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <p className="container-header">Definir o albúm da semana</p>
            <span>
                <div style={{ width: '30%' }}>
                    <h2>Pesquisar álbum</h2>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Digite o nome do álbum"
                    />
                </div>
                <div style={{ width: '30%' }} className="search-results max-h-[400px]">
                    <h2>Resultados</h2>
                    <ul className='max-h-[300px] overflow-y-scroll'>
                        {albums.map(album => (
                            <li
                                key={album.id}
                                onClick={async () => setSelectedAlbum(album)}
                                style={{ cursor: 'pointer', marginBottom: '10px' }}
                            >
                                {album.name} - {album.artists[0].name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ width: '30%' }} className="see-album">
                    {selectedAlbum ? (
                        <>
                            <div>
                            <span className='relative'>
                                 {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt={`capa do album ${selectedAlbum.name} do artista ${selectedAlbum.artists}`} src={selectedAlbum.images[0]?.url} style={{maxWidth: '200px'}} />
                            </span>

                                <h3>{selectedAlbum.name}</h3>
                                <p>Artista: {selectedAlbum.artists[0].name}</p>
                            </div>
                            
                            <button type='button' className='btn btn-primary handle_setFeaturedAlbum' onClick={() => changeSpotlightAlbum(selectedAlbum)}>Definir album</button>
                        </>
                    ) : (
                        <p>Selecione um álbum para ver os detalhes</p>
                    )}
                </div>
            </span>
        </div>
    );
}

