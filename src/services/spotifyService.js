export const spotifyService = {
    getById,
    search,
}


const token = await _getValidToken()
const stationFields = 'tracks.items.track(duration_ms,id,album.name,album.id,artists.name,artists.id),tracks.total,tracks.items(added_at,added_by.id),type,name,owner.display_name,images,id'

// console.log('tracks', await search("eminem", "track"))
// console.log('albums', await search("eminem", "album"))
// console.log(await getById("4otkd9As6YaxxEkIjXPiZ6", 'albums'))
// console.log(await getById("3xqcAMgjHGrv3ElA51zZRj", 'stations'))
// console.log(await getById("4otkd9As6YaxxEkIjXPiZ6", 'albums'))
// console.log(await getById(["4otkd9As6YaxxEkIjXPiZ6","4otkd9As6YaxxEkIjXPiZ6"], 'albums'))

// console.log(await getById(["7ccTcabbJlCJiIqtrSSwBk", "7lQ8MOhq6IN2w8EYcFNSUk"], 'tracks'))

async function getById(id, type = 'station') { //Type must be plural, not singular.
    const isArray = Array.isArray(id)
    const idToSend = isArray ? id.join(',') : id
    const typeToSearch = type === 'station' ? 'playlists' : type + 's'

    const url = `https://api.spotify.com/v1/${type === 'stations' ? 'playlists' : type}${isArray ? '?ids=' : '/'}${idToSend}`

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error(`Spotify getById failed: type=${type} id=${idToSend}`)

    const clearedItem = isArray ? _clearObject(await res.json(),
        type === 'stations' ? 'playlists' : type) :
        _clearObject(await res.json())
    return clearedItem
}


function _clearObject(item, type) {
    if (type) {
        return item[type].map(i => _clearObject(i))
    }

    switch (item.type) {
        case 'playlist':
            return clearStation(item)
        case 'track':
            return clearTrack(item)
        case 'album':
            return clearAlbum(item)
        // case 'station':
        //     return clearStation(item)    
        default: throw new Error('cannot clear item in clearObject')
    }
}


async function search(txt, type = 'track', limit = 15) {
    const url = `https://api.spotify.com/v1/search?q=${txt}&type=${type}&limit=${limit}`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Spotify searchTracks failed')

    const data = await res.json()
    console.log('data:', data[type + 's'])
    return data[type + 's'].items.map(item => {
        if (type === 'album') return item
        if (item) return clearTrack(item)
    })
}


function clearStation({ id, name, type, owner, followers, images, description, tracks }) {
    if (!id || !name || !type || !owner || !followers || !images || !description || !tracks)
        return console.error(`missing data:\n id, name, type, owner, followers, images, description, tracks \n`,
            id, name, type, owner, followers, images, description, tracks)

    return {
        id,
        name,
        type: 'station',
        owner: {
            id: owner.id,
            name: owner.display_name,
            type: owner.type,
        },
        savedCount: followers.total,
        tracksCount: tracks.total,
        images,
        description,
        tracks: tracks.items.map(item => clearTrack(item.track)),
    }
}

function clearTrack({ id, name, type, album, artists, duration_ms, popularity, images }) {
    if (!id || !name || !type || !artists)
        return console.error(`missing data from clearTrack:\n
        id, name, type, artists, duration_ms\n`,
            id, name, type, artists, duration_ms
        )
    return {
        id,
        name,
        type,
        duration_ms,
        images: album?.images || images,
        ...(album && {
            album: {
                id: album.id,
                name: album.name,
                images: album.images,
                type: album.type,
            }
        }),
        artists: artists.map(a => ({
            id: a.id,
            name: a.name,
            type: a.type
        })),
        ...(popularity && { popularity }),
    }
}

function clearAlbum({ id, name, type, artists, images, release_date, total_tracks, tracks, popularity }) {
    console.log('1:', 1)
    return {
        id,
        name,
        type,
        images,
        releaseDate: release_date,
        artists: artists.map(a => ({
            id: a.id,
            name: a.name,
            type: a.type,
        })),
        tracksCount: total_tracks,
        tracks: tracks.items.map(track => clearTrack({ ...track, images: images })),
        popularity,
    }
}

async function _getToken() {
    const auth = btoa(
        'ab2e3abba52b4933ac5493e0dacb58c6:a0dcd426082f4d8b814a5125c79544ec'
    )

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + auth
        },
        body: 'grant_type=client_credentials'
    })

    const data = await res.json()

    localStorage.setItem('spotify_token', data.access_token)
    localStorage.setItem(
        'spotify_token_expires',
        Date.now() + data.expires_in * 1000
    )
    console.log('data.access_token:', data.access_token)
    return data.access_token
}

async function _getValidToken() {
    const token = localStorage.getItem('spotify_token')
    const expires = localStorage.getItem('spotify_token_expires')

    if (token && Date.now() < expires) {
        return token
    }

    return await _getToken()
}

// async function getTrackById(id) {
//     const url = `https://api.spotify.com/v1/tracks/${id}`

//     const res = await fetch(url, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })

//     if (!res.ok) throw new Error('Spotify getTrackById failed')

//     return await res.json()
// }

// async function getStaitonById(id) {
//     const url = `https://api.spotify.com/v1/playlists/${id}?fields=${encodeURIComponent(stationFields)}`

//     const res = await fetch(url, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })

//     if (!res.ok) throw new Error('Spotify getStaitonById failed')

//     return await res.json()
// }