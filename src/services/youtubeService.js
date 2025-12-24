
export const youtubeService = {
    search,
}

export const i = 'i'

async function search(artistName, txt) {
    const artists = Array.isArray(artistName) ? artistName.join('') : artistName
    const K = 'AIzaSyCS-4YqC0l808VN436qtDrDyLyTpmwUtYc' //zohar
    const K2 = 'AIzaSyAsP1qn92sD74u1A7XBQ3dn65wl8C45BE0'
    const toSearch = `${artists} ${txt} official audio`
    const url = new URL('https://www.googleapis.com/youtube/v3/search')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('q', toSearch)
    url.searchParams.set('type', 'video')
    url.searchParams.set('maxResults', '1')
    url.searchParams.set('key', K)

    const data = await fetch(url).then(res => res.json())
    if (!data.items[0]) alert('Track is not found, please try another track or wait sometime')
    return data.items[0]?.id.videoId
}