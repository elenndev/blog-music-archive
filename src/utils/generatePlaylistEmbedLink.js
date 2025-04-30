export function generatePlaylistEmbedLink(link){
    const embed_link = 'https://open.spotify.com/embed/playlist/'
    const playlistLink = embed_link + link.split('playlist/')[1]
    return playlistLink
}