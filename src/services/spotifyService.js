export const spotifyService = {
    getById,
    search,
    getDemoTrack,
}

const key = import.meta.env.VITE_SPOTKEY

async function init() {
  return await _getValidToken()
}

const token = init()

async function getById(id, type = 'station') {
    const isArray = Array.isArray(id)
    const idToSend = isArray ? id.join(',') : id
    const typeToSearch = type === 'station' ? 'playlists' : type + 's'
    if (isArray && typeToSearch === 'playlists') throw new Error("cannot get an array of playlists, only tracks, albums and artists");


    const url = `https://api.spotify.com/v1/${typeToSearch}${isArray ? '?ids=' : '/'}${idToSend}`

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error(`Spotify getById failed: type=${type} id=${idToSend}`)

    const clearedItem = isArray ? await _clearObject(await res.json(),
        type === 'station' ? 'playlist' : type) :
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
        case 'artist':
            return clearArtist(item)
        default: throw new Error('cannot clear item in clearObject')
    }
}

async function search(txt, type = 'track', limit = 15) {
    const typeToSearch = type === 'station' ? 'playlist' : type
    const txtToSearch = encodeURIComponent(txt)
    const url = `https://api.spotify.com/v1/search?q=${txtToSearch}&type=${typeToSearch}&limit=${limit}`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Spotify searchTracks failed')

    let data = await res.json()
    data = data[typeToSearch + 's'].items.filter(item => item)

    const dataToReturn = data.map(item => _clearObject(item))
    return dataToReturn
}

function clearStation({ id, name, owner, followers, images, description, tracks }) {
    return {
        _id : id,
        name,
        type: 'station',
        owner: {
            _id: owner.id,
            name: owner.display_name,
            type: owner.type,
        },
        ...(followers && { savedCount: followers.total }),
        tracksCount: tracks.total,
        images,
        description,
        ...(tracks.items && { tracks: tracks.items.map(item => clearTrack(item.track)) }),
    }
}

function clearTrack({ id, name, type, album, artists, duration_ms, popularity, images }) {
    return {
        _id: id,
        name,
        type,
        duration: duration_ms,
        images: album?.images || images,
        ...(album && {
            album: {
                _id: album.id,
                name: album.name,
                images: album.images,
                type: album.type,
            }
        }),
        artists: artists.map(a => ({
            _id: a.id,
            name: a.name,
            type: a.type
        })),
        ...(popularity && { popularity }),
    }
}

function clearAlbum({ id, name, type, artists, images, release_date, total_tracks, tracks, popularity }) {
    return {
        id,
        name,
        type,
        images,
        releaseDate: release_date,
        artists: artists.map(a => ({
            _id: a.id,
            name: a.name,
            type: a.type,
        })),
        tracksCount: total_tracks,
        tracks: tracks.items.map(track => clearTrack({ ...track, images: images })),
        popularity,
    }
}

function clearArtist({ id, name, images, popularity, followers, type }) {
    return {
        id,
        name,
        images,
        popularity,
        followersCount: followers.total,
        type,
    }
}

async function _getToken() {
    const auth = btoa(key)

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
    // console.log('data.access_token:', data.access_token)
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

function getDemoTrack() {
    return {
        id: "0lizgQ7Qw35od7CYaoMBZb",
        name: "Santa Tell Me",
        type: "track",
        duration: 204093,
        images: [
            {
                height: 640,
                width: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273a1db745e63940bc06985dea5"
            },
            {
                height: 300,
                width: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02a1db745e63940bc06985dea5"
            },
            {
                height: 64,
                width: 64,
                url: "https://i.scdn.co/image/ab67616d00004851a1db745e63940bc06985dea5"
            }
        ],
        album: {
            id: "27MNgBEnLCKoafz1g2Zu97",
            name: "Santa Tell Me",
            images: [
                {
                    height: 640,
                    width: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b273a1db745e63940bc06985dea5"
                },
                {
                    height: 300,
                    width: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e02a1db745e63940bc06985dea5"
                },
                {
                    height: 64,
                    width: 64,
                    url: "https://i.scdn.co/image/ab67616d00004851a1db745e63940bc06985dea5"
                }
            ],
            type: "album"
        },
        artists: [
            {
                id: "66CXWjxzNUsdJxJ2JdwvnR",
                name: "Ariana Grande",
                type: "artist"
            }
        ],
        popularity: 96
    }
}