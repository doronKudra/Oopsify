import { storageService } from '../async-storage.service'
import { makeId } from '../util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER = 'user'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

_createLoggedinUser()

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY_USER)
    return users.map((user) => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY_USER, userId)
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER, userId)
}

async function update(userToUpdate) {
    // const loggedinUser = getLoggedinUser()
    // const user = await storageService.query(STORAGE_KEY_LOGGEDIN_USER)
    // console.log('user:', user)
    // user.likedTracks.tracks = userToUpdate.likedTracks.tracks
    await storageService.put(STORAGE_KEY_USER, user)

    // When admin updates other user's details, do not update loggedinUser
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER)
    const user = users.find((user) => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(user) {
    if (!user.imgUrl)
        user.imgUrl =
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    const userToSave = {
        // _id: user._id || makeId(),
        fullName: user.fullName,
        userName: user.userName,
        password: user.password,
        imgUrl: user.imgUrl,
        likedStations: user.likedStations || [],
        likedTracks: {
            name: 'Liked Songs',
            tracks: user.likedTracks.tracks || [],
            createdBy: user.userName,
            images: [{ url: 'src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
        },
    }
    const savedUser = await storageService.post(STORAGE_KEY_USER, userToSave)
    return saveLoggedinUser(savedUser)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function saveLoggedinUser(user) {
    const loggedinUser = {
        fullName: user.fullName,
        userName: user.userName,
        password: user.password,
        imgUrl: user.imgUrl,
        likedStations: user.likedStations,
        likedTracks: {
            name: 'Liked Songs',
            tracks: user.likedTracks.tracks,
            createdBy: 'admin',
            images: [{ url: 'src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
        },
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(loggedinUser))
    return loggedinUser
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createLoggedinUser() {
    if (getLoggedinUser()) return
    const users = []
    console.log('hi')
    const user = {
        fullName: 'Mustafa Adminsky',
        userName: 'admin',
        password: 'admin',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        likedStations: [],
        likedTracks: {
            name: 'Liked Songs',
            tracks: [],
            createdBy: 'admin',
            images: [{ url: 'src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
        },
    }
    users.push(user)
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(users))
    login({ userName: 'admin', password: 'admin' })
}
