import { utilService } from "../../services/util.service"
import { youtubeService } from "../../services/youtubeService"
import { ADD_TRACK_TO_LIST, SET_LIST_IDX, SET_TRACK_LIST, UPDATE_CURRENT_TRACK } from "../reducers/player.reducer"
import { store } from "../store"



export const playerActions = {
    onTrackToPlay,
    isTrackPlaying,
    getPrevNextTrack,
    onTrackList,
    onShuffle,
    onAddTrackToList,
    playPrevNextTrack,
}

//FOR PREVIEW
async function onTrackToPlay(track) {
    const artistName = track.artists.map(artist => artist.name + ' ')
    const trackName = track.name
    const videoId = await youtubeService.search(artistName, trackName) || "7q2B4M5EiBkqrlsNW8lB7N"
    const trackToSave = { ...track, videoId: videoId }
    store.dispatch({ type: UPDATE_CURRENT_TRACK, track: trackToSave })
    _pushToList(track)
}

//ADD TRACK TO THE END OF THE LIST
function onAddTrackToList(track) {
    store.dispatch({ type: ADD_TRACK_TO_LIST, track: track })
}

//REPLACE THE CURRENT PLAYLIST
function onTrackList(tracks) {
    store.dispatch({ type: SET_TRACK_LIST, trackList: tracks })
    onTrackToPlay(tracks[0])
}

//FOR PREVIEW TO SHOW PLAYING SONG STYLE
function isTrackPlaying(id) { // for lists display
    const isPlaying = store.getState().playerModule.track.id === id
    return isPlaying
}


//ONLY MEDIA PLAYER USES!

function playPrevNextTrack(value) {
    const trackList = store.getState().playerModule.trackList
    
    const reqIdx = store.getState().playerModule.idx + value
    const track = trackList[reqIdx]
    if (!trackList || !trackList.length || !track) return
    onTrackToPlay(track).then(() => store.dispatch({ type: SET_LIST_IDX, idx: reqIdx }))
}

function getPrevNextTrack(value) { //value = -1 || 1 // the same as checking if next || prev track
    const trackList = store.getState().playerModule.trackList
    if (!trackList || !trackList.length) return false
    
    const reqIdx = store.getState().playerModule.idx + value
    const track = trackList[reqIdx]
    return track ? track : false
}

function onShuffle() {
    let trackList = [...store.getState().playerModule.trackList]
    if (!trackList || !trackList.length) return
    
    const currIdx = store.getState().playerModule.idx
    const currTrack = trackList.splice(currIdx, 1)
    const shuffeled = [...currTrack, ...utilService.shuffleArray(trackList)]
    store.dispatch({ type: SET_TRACK_LIST, trackList: shuffeled })
}

function _pushToList(track) {
    const trackList = [...store.getState().playerModule.trackList]
    if (!trackList || !trackList.length) return
    const currIdx = store.getState().playerModule.idx + value
    trackList.splice(currIdx, 0, track)
}

function onReapet(value) {
    
}



