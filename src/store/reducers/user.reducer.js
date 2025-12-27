import { userService } from '../../services/user'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_LIKED_TRACKS = 'SET_LIKED_TRACKS'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_LIKED_STATIONS = 'SET_LIKED_STATIONS'
export const UPDATE_OWNED_STATION = 'UPDATE_OWNED_STATION'

const initialState = {
    user: null,
    users: [],
    watchedUser: null,
}

export function userReducer(state = initialState, action) {
    console.log('action:',action)
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.userId),
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_LIKED_TRACKS:
            return {
                ...state,
                user: {
                    ...state.user,
                    likedTracks: {
                        ...state.user.likedTracks,
                        tracks: action.tracks,
                    },
                },
            }
        case UPDATE_OWNED_STATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    likedStations: [
                        ...state.user.likedStations,
                        action.station
                    ],
                },
            }
        case SET_LIKED_STATIONS:
            return {
                ...state,
                user: {
                    ...state.user,
                    likedStations: [
                        ...state.user.likedStations,
                        action.id
                    ],
                },
            }
        case SET_WATCHED_USER:
            return { ...state, watchedUser: action.user }
        case UPDATE_USER:
            return { ...state, user: { ...state.user, ...action.user } }
        default:
            return state
    }
}
