import rawTracks from '../../data/demo-tracks.json'

export const tracks = normalizeTracks(rawTracks)

export function normalizeTracks(tracks) {
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

export function getDemoStation() {
    const tracks = normalizeTracks(rawTracks)
    return {
        id: 'demo_station_001',
        name: 'Demo Album',
        artist: 'Eminem',
        description: 'A sample station built from normalized tracks',
        created_at: new Date().toISOString(),
        cover_art: tracks[0]?.cover_art || null,
        stats: {
            total_tracks: tracks.length,
            avg_popularity:
                tracks.reduce(
                    (sum, track) => sum + (track.popularity || 0),
                    0
                ) / tracks.length,
            total_duration_ms: tracks.reduce(
                (sum, track) => sum + (track.duration_ms || 0),
                0
            ),
        },
        tracks: tracks.map((track, index) => ({
            order: index + 1,
            ...track,
        })),
    }
}
