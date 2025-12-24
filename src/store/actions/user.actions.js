import { userService } from '../../services/user'
import { socketService } from '../../services/socket.service'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import {
    REMOVE_USER,
    SET_USER,
    SET_USERS,
    SET_WATCHED_USER,
    SET_LIKED_TRACKS,
    UPDATE_USER,
    SET_LIKED_STATIONS,
} from '../reducers/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({ type: SET_USER, user })
            socketService.login(user.id)
            return user
        } catch (err) {
            console.log('Cannot login', err)
            throw err
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: SET_USER, user })
            socketService.login(user.id)
            return user
        } catch (err) {
            console.error('Signup failed:', err)
            throw err
        }
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null,
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(user) {
    try {
        const savedUser = await userService.update(user)
        console.log('savedUser:', savedUser)
        store.dispatch({ type: UPDATE_USER, user: savedUser })
        return savedUser
    } catch (err) {
        console.error('Cannot update station', err)
        throw err
    }
}

export function updateUserLikedStations(stations) {
    return (dispatch) => {
        dispatch({
            type: SET_LIKED_STATIONS,
            likedStations: [...stations],
        })
    }
}

export function updateUserLikedTracks(tracks) {
    return (dispatch) => {
        dispatch({
            type: SET_LIKED_TRACKS,
            tracks,
        })
    }
}

export async function toggleLikedStation(clickedStationId) {
    const user = store.getState().userModule.user
    const likedStations = user?.likedStations || []
    const isLiked = likedStations.some(
        (stationId) => stationId === clickedStationId
    )
    let updatedStations
    if (isLiked) {
        updatedStations = likedStations.filter(
            (stationId) => stationId !== clickedStationId
        )
    } else {
        updatedStations = [...likedStations, clickedStationId]
    }
    // updateUserLikedStations(updatedStations)
    const userToUpdate = {
        ...user,
        likedStations: [...updatedStations],
    }
    await updateUser(userToUpdate)
}

export async function toggleLiked(clickedTrack) {
    const user = store.getState().userModule.user
    const likedTracks = user?.likedTracks?.tracks || []
    const isLiked = likedTracks.some((track) => track.id === clickedTrack.id)
    let updatedTracks

    if (isLiked) {
        updatedTracks = likedTracks.filter(
            (track) => track.id !== clickedTrack.id
        )
    } else {
        updatedTracks = [...likedTracks, clickedTrack]
    }
    updateUserLikedTracks(updatedTracks)
    const userToUpdate = {
        ...user,
        likedTracks: { ...user.likedTracks, tracks: updatedTracks },
    }
    await updateUser(userToUpdate)
}
