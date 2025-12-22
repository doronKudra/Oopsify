
export const youtubeService = {
    search,
}

export const i = 'i'

async function search(artistName, txt) {
    const artists = Array.isArray(artistName) ? artistName.join('') : artistName

    const KEY = 'AIzaSyAjEOAbhCL4hie4UHqednti2vWLTRgHnCo'
    const toSearch = `${artists} ${txt} official audio`
    const url = new URL('https://www.googleapis.com/youtube/v3/search')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('q', toSearch)
    url.searchParams.set('type', 'video')
    url.searchParams.set('maxResults', '1')
    url.searchParams.set('key', KEY)

    const data = await fetch(url).then(res => res.json())
    return data.items[0]?.id.videoId
}