export const youtubeService = {
    search,
}

const key = import.meta.env.VITE_KEYZ
const key2 = import.meta.env.VITE_KEYD

export const i = 'i'

async function search(artistName, txt) {
    const artists = Array.isArray(artistName) ? artistName.join('') : artistName
    const toSearch = `${artists} ${txt} official audio`
    const url = new URL('https://www.googleapis.com/youtube/v3/search')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('q', toSearch)
    url.searchParams.set('type', 'video')
    url.searchParams.set('maxResults', '1')
    url.searchParams.set('key', key)

    const data = await fetch(url).then(res => res.json())
    if (!data.items[0]) alert('Track is not found, please try another track or wait sometime')
    return data.items[0]?.id.videoId
}