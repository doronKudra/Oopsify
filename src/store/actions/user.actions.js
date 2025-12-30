import { userService } from '../../services/user'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { SET_USER, SET_WATCHED_USER, SET_LIKED_TRACKS, UPDATE_USER ,SET_LIKED_STATIONS, UPDATE_OWNED_STATION } from '../reducers/user.reducer'
import { stationService } from '../../services/station/station.service.remote'
import { ADD_SIDEBAR_STATION, REMOVE_SIDEBAR_STATION} from '../reducers/station.reducer'


export async function login(credentials) { //✅
    try {
        const user = await userService.login(credentials)
        if (user) store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) { //✅
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
}

export async function logout() { //✅
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}


export async function updateUser(user) { //✅
    try {
        const savedUser = await userService.update(user)
        store.dispatch({ type: UPDATE_USER, user: savedUser })
        return savedUser
    } catch (err) {
        console.error('Cannot update station', err)
        throw err
    }
}

export async function setUserStation(station) { //✅
    try {
        const savedStation = await userService.saveStation(station)
        if (station.id === 'liked-tracks') store.dispatch({ type: SET_LIKED_TRACKS, station: savedStation.tracks })
        else store.dispatch({ type: UPDATE_OWNED_STATION, station: savedStation._id })

    } catch (err) {
        console.error('Cannot update station', err)
        throw err
    }
}



// export async function addTrackToStation(track, station) {
//     try {
//         const storeUser = store.getState().userModule.user
//         const stationToSave = { ...station, tracks: [...station.tracks, track] }
//         const updatedUser = { ...storeUser, likedTracks: { ...storeUser.likedTracks, tracks: updatedTracks } }
//         userService.update()

//     } catch (err) {

//     }
//     store.dispatch({ type: UPDATE_USER_STATION, station: stationToSave })
// }

export async function toggleLikedTrack(track) { //✅
    const storeUser = store.getState().userModule.user
    if (!storeUser?.likedTracks?.tracks) throw new Error('userActions: no user or likedTracks in toggleLikedTrack')

    const likedTracks = storeUser.likedTracks
    const tracks = likedTracks.tracks
    const updatedTracks = tracks.some(t => t._id === track._id)
        ? tracks.filter(t => t._id !== track._id) // remove
        : [ ...tracks,track] // add
    const userToSave = {...storeUser, likedTracks:{...likedTracks, tracks: updatedTracks} }

    await userService.update(userToSave)
    store.dispatch({ type: SET_LIKED_TRACKS, tracks: updatedTracks })
}

// export async function toggleLiked(clickedTrack) {
//     const user = store.getState().userModule.user
//     if (!user) return console.log('userActions: no user in toggleLiked')

//     const likedTracks = user.likedTracks.tracks
//     const isLiked = likedTracks.some((track) => track._id === track._id)
//     let updatedTracks

//     if (isLiked) updatedTracks = likedTracks.filter(track => track._id !== track._id)
//     else updatedTracks = [...likedTracks, clickedTrack]

//     store.dispatch({ type: SET_LIKED_TRACKS, updatedTracks })
// }



// export function updateUserLikedTracks(tracks) {
//     return (dispatch) => {
//         dispatch({
//             type: SET_LIKED_TRACKS,
//             tracks,
//         })
//     }
// }

export async function toggleLikedStation(station) {
    const user = store.getState().userModule.user
    if (!user) return console.log('userActions: no user in toggleLikedStation')
    const likedStations = user.stations
    const isLiked = likedStations.some(stationId => stationId === station._id)
    let updatedStations
    if (isLiked) {
        updatedStations = likedStations.filter(
            (stationId) => stationId !== station._id
        )
        store.dispatch({ type: REMOVE_SIDEBAR_STATION, stationId: station._id })
    } else {
        updatedStations = [...likedStations, station._id]
        store.dispatch({ type: ADD_SIDEBAR_STATION, station }) // sidebar stations sit in store
    }
    // updateUserLikedStations(updatedStations)
    const userToUpdate = {
        ...user,
        stations: [...updatedStations],
    }
    await updateUser(userToUpdate)
}



export async function loadUser(userId) { // dont know why... maybe for userDetails?
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}


// export async function loadUsers() {
//     try {
//         store.dispatch({ type: LOADING_START })
//         const users = await userService.getUsers()
//         store.dispatch({ type: SET_USERS, users })
//     } catch (err) {
//         console.log('UserActions: err in loadUsers', err)
//     } finally {
//         store.dispatch({ type: LOADING_DONE })
//     }
// }

// export async function removeUser(userId) {
//     try {
//         await userService.remove(userId)
//         store.dispatch({ type: REMOVE_USER, userId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }
