import { store } from '../store'

export const UPDATE_CURRENT_TRACK = 'UPDATE_CURRENT_TRACK'
export const SET_TRACK_LIST = 'SET_TRACK_LIST'
export const SET_LIST_IDX = 'SET_LIST_IDX'
export const ADD_TRACK_TO_LIST = 'ADD_TRACK_TO_LIST'
export const ADD_STATION_TO_LIST = 'ADD_STATION_TO_LIST'
export const SET_STATION_SELECTED = 'SET_STATION_SELECTED'

const initialState = {
    track: null,
    trackList: [],
    idx: 0, //?
    // stationSelected: stationId,
    stationId: null,
    isPlaying: false,
}

export function playerReducer(state = initialState, action) {
    // console.log('action:', action)
    switch (action.type) {
        case UPDATE_CURRENT_TRACK:
            return { ...state, track: action.track }
        case SET_TRACK_LIST:
            return { ...state, trackList: action.trackList, idx: 0 }
        case SET_LIST_IDX:
            return { ...state, idx: action.idx }
        case ADD_TRACK_TO_LIST:
            return { ...state, trackList: [...state.trackList, action.track] }
        case ADD_STATION_TO_LIST:
            return {
                ...state,
                trackList: [...state.trackList, ...action.tracks],
            }
        case SET_STATION_SELECTED:
            return {
                ...state,
                stationSelected: {
                    ...state.stationSelected,
                    ...action.stationSelected,
                },
            }

        default:
            return state
    }
}
