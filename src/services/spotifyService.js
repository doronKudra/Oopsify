export const spotifyService = {
    getStaitonById,
    searchTracks,
}


const token = await getValidToken()

const stationFields =
    'tracks.items.track(duration_ms,id,album.name,album.id,artists.name,artists.id),' +
    'tracks.total,tracks.items(added_at,added_by.id),' +
    'type,name,owner.display_name,images,id'


async function getToken() {
    const auth = btoa(
        'ab2e3abba52b4933ac5493e0dacb58c6:a0dcd426082f4d8b814a5125c79544ec' // exposed, stolen, doomed
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

async function getValidToken() {
    const token = localStorage.getItem('spotify_token')
    const expires = localStorage.getItem('spotify_token_expires')

    if (token && Date.now() < expires) {
        return token
    }

    return await getToken()
}


async function getStaitonById(id) {
    const url = `https://api.spotify.com/v1/playlists/${id}?fields=${encodeURIComponent(stationFields)}`

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Spotify request failed')

    return await res.json()
}

async function searchTracks(txt) {
    const url = `https://api.spotify.com/v1/search?q=${txt}&type=track`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Search failed')

    const data = await res.json()
    return data.tracks.items
    // return data.tracks.items.map(track => clearTrack(track))
}

function clearTrack(track) {
    return {
        id: track.id,
        duration_ms: track.duration_ms,
        album: {
            id: track.album.id,
            name: track.album.name
        },
        artists: track.artists.map(a => ({
            id: a.id,
            name: a.name
        }))
    }
}

//TODO:
//1.getTrackById
//2.searchStations & playlists & albums & artists


export const demoSong = {
    id: '2cWBwpqMsDJC1ZUwz813lo',
    artist: 'Eminem',
    title: 'The Eminem Show',
    imgUrl: "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
    duration_ms: 290320,
    addedBy: '{minimal-user}',
    likedBy: ['{minimal-user}'],
    addedAt: 162521765262,
}



// var trackExample = {
//     id: 's1001',
//     title: 'The Meters - Cissy Strut',
//     url: 'youtube/song.mp4',
//     imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
//     addedBy: '{minimal-user}',
//     likedBy: ['{minimal-user}'],
//     addedAt: 162521765262,
// }

// var stationExample = {
//     _id: '5cksxjas89xjsa8xjsa8jxs09',
//     name: 'Funky Monks',
//     tags: ['Funk', 'Happy'],
//     createdBy: {
//         _id: 'u101',
//         fullname: 'Puki Ben David',
//         imgUrl: 'http://some-photo/',
//     },
//     likedByUsers: ['{minimal-user}', '{minimal-user}'],
//     songs: [
//         {
//             id: 's1001',
//             title: 'The Meters - Cissy Strut',
//             url: 'youtube/song.mp4',
//             imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
//             addedBy: '{minimal-user}',
//             likedBy: ['{minimal-user}'],
//             addedAt: 162521765262,
//         },
//         {
//             id: 'mUkfiLjooxs',
//             title: "The JB's - Pass The Peas",
//             url: 'youtube/song.mp4',
//             imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
//             addedBy: {},
//         },
//     ],
//     msgs: [
//         {
//             id: 'm101',
//             from: '{mini-user}',
//             txt: 'Manish?',
//         },
//     ],
// }

// const user = {
//     _id: '',
//     // likedStations: ['{mini-stations}']
//     likedStationIds: ['s101', 's102'],
//     likedSongIds: ['s1001', 's1002'],
// }