import { youtubeService } from "../../services/youtubeService"
import { ON_PLAY, UPDATE_CURRENT_TRACK } from "../reducers/player.reducer"
import { store } from "../store"



export const playerActions = {
    onTrackToPlay,
    onPlay,
    onPause,
}

async function onTrackToPlay(track) {
    const artistName = track.artists.map(artist => artist.name + ' ')
    const trackName = track.name
    const videoId = await youtubeService.search(artistName, trackName)
    const trackToSave = { ...track, videoId: videoId }
    store.dispatch({type:UPDATE_CURRENT_TRACK,track: trackToSave})
}
async function onPlay() {
    store.dispatch({type:ON_PLAY,isPlaying: true})
}
async function onPause() {
    store.dispatch({type:ON_PLAY,isPlaying: false})
}

