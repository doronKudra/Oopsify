import { store } from "../store"

export const UPDATE_CURRENT_TRACK = 'UPDATE_CURRENT_TRACK'
export const SET_TRACK_LIST = 'SET_TRACK_LIST'
export const SET_LIST_IDX = 'SET_LIST_IDX'
export const ADD_TRACK_TO_LIST = 'ADD_TRACK_TO_LIST'

const initialState = {
    track: {
        "id": "0RiNcFUdQtXydBAYnwIG94",
        "name": "BHVL",
        "type": "track",
        "duration": 280936,
        "images": [
            { "url": "https://i.scdn.co/image/ab67616d0000b273481f91f4c6bad263e8b76adc" },
            { "url": "https://i.scdn.co/image/ab67616d00001e02481f91f4c6bad263e8b76adc" },
            { "url": "https://i.scdn.co/image/ab67616d00004851481f91f4c6bad263e8b76adc" }
        ],
        album: {
            "id": "2XcbU8zU1yA29WyLAsg8RL",
            "name": "BHVL / Elevator",
            "type": "album"
        },
        artists: [
            {
                "id": "4HsyzV3FBsr7AkXr2KU1HW",
                "name": "Radio Diffusion",
                "type": "artist"
            }
        ],
        videoId: "4du2Ricvsig"
    },
    trackList: [

    ],
    idx: 0, //?
}

export function playerReducer(state = initialState, action) {
    console.log('action:', action)
    switch (action.type) {
        case UPDATE_CURRENT_TRACK:
            return { ...state, track: action.track }

        case SET_TRACK_LIST:
            return { ...state, trackList: action.trackList }

        case SET_LIST_IDX:
            return { ...state, idx: action.idx }
        case ADD_TRACK_TO_LIST:
            return { ...state, trackList: [...state.trackList, action.track] }

        default:
            return state
    }
}

