import { SET_USER } from '../../store/reducers/user.reducer'
import { store } from '../../store/store'
import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    remove,
    update,
    saveStation,
    getLoggedinUser,
    saveLoggedinUser,
    // getUsers,
}


setUser()


async function signup(userCred) { // ✅
    console.log('singup.....:')
    try {
        let user = await httpService.post('auth/signup', userCred)
        user.likedTracks = _getEmptyLikedTrack(user)
        saveLoggedinUser(user)
        return await update(user)
    } catch (err) {
        console.log('signup failed', err)
        throw err
    }
}

async function login(userCred) { // ✅
    try {
        const user = await httpService.post('auth/login', userCred)
        if (!user) throw new Error('Invalid login')
        return saveLoggedinUser(user)
    } catch (err) {
        console.error('Login failed', err)
        throw err
    }
}

async function logout() { //✅
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout') //only for clear the cookies
}

async function setUser() {
    const sessionUser = getLoggedinUser()
    if(!sessionUser) return
    const user = await getById(sessionUser._id)
    store.dispatch({ type: SET_USER, user })
}

async function getById(userId) { //✅
    const user = await httpService.get(`user/${userId}`)
    return user
}


async function update(userToUpdate) { //✅
    console.log('userToUpdate:', userToUpdate)
    const user = await httpService.put(`user/${userToUpdate._id}`, userToUpdate)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser && loggedinUser._id === user._id) saveLoggedinUser(user)
    return user
}

async function saveStation(station) {
    console.log('station:', station)
    const savedStation = await httpService.put(`station/${station.id}`, station)
    // } else {
    // savedStation = await httpService.post('station', station)
    // }
    return savedStation
}



function remove(userId) { //? requireAuth
    return httpService.delete(`user/${userId}`)
}


function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return user
}

function saveLoggedinUser({ _id, username, fullname }) {
    const user = {
        _id,
        username,
        fullname
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    // setUser(user._id)
    return user
}

function _getEmptyLikedTrack(user) {
    return {
        name: 'Liked Songs',
        tracks: [],
        images: [{ url: '/src/assets/images/liked-songs.png' }],
        id: 'liked-tracks',
        owner: {
            name: user.fullname,
            id: user._id,
        }
    }
}