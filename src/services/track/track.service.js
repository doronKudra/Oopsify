import rawTracks from '../../data/demo-tracks.json'

export const tracks = normalizeTracks(rawTracks)
console.log('tracks:', tracks)


function normalizeTracks(tracks) {
    return tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists?.[0]?.name || null,
        album: track.album?.name || null,
        duration_ms: track.duration_ms,
        popularity: track.popularity,
        cover_art: track.album?.images?.[0]?.url || null,
        uri: track.uri,
    }))
}
