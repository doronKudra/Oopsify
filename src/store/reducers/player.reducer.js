import { store } from "../store"

export const UPDATE_CURRENT_TRACK = 'UPDATE_CURRENT_TRACK'
export const ON_PLAY = 'ON_PLAY'
const initialState = {
    track: null,
    tracks: [],
    index: 0, //?
}

export function playerReducer(state = initialState, action) {
    // console.log('action:', action)
    switch (action.type) {
        case UPDATE_CURRENT_TRACK:
            return { ...state, track: action.track }
        case ON_PLAY:
            return { ...state, isPlaying: action.isPlaying }
        default:
            return state
    }
}

