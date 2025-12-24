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

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter((user) => user._id !== action.userId),
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_LIKED_TRACKS:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    likedTracks: {
                        ...state.user.likedTracks,
                        tracks: action.tracks,
                    },
                },
            }
            break
        case SET_LIKED_STATIONS:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    likedStations: [
                        ...state.user.likedStations,
                        action.id
                    ],
                },
            }
            break
        case UPDATE_USER:
            newState = { ...state, user: { ...state.user, ...action.user } }
            break
        default:
    }
    // For debug:
    window.userState = newState
    return newState
}
