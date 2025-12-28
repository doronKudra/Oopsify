import { storageService } from '../async-storage.service'
import { makeId } from '../util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER = 'user'

export const userService = {
    // login,
    // logout,
    // signup,
    // getUsers,
    // getById,
    // remove,
    // update,
    // getLoggedinUser,
    // saveLoggedinUser,
}

// _createLoggedinUser() // use if local storage userDB is empty

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
    const user = await storageService.put(STORAGE_KEY_USER, userToUpdate)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER)
    const user = users.find((user) => user.username === userCred.username)

    if (!user) throw new Error('User not found')
    if (user.password !== userCred.password) throw new Error('Wrong password')

    return saveLoggedinUser(user)
}

async function signup(user) {
    console.log('user:',user)
    if (!user.imgUrl)
        user.imgUrl =
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    const userToSave = {
        fullname: user.fullname,
        username: user.username,
        password: user.password,
        imgUrl: user.imgUrl,
        stations: user.stations || [],
        likedTracks: {
            name: 'Liked Songs',
            tracks: user.likedTracks?.tracks || [],
            owner: {
                username: user.username,
                _id: user._id,
            },
            images: [{ url: '/src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
            type: 'station',
        },
    }
    const savedUser = await storageService.post(STORAGE_KEY_USER, userToSave)
    saveLoggedinUser(savedUser)
    return savedUser
}

async function logout() {
    // localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    // return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function saveLoggedinUser(user) {
    const loggedinUser = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        password: user.password,
        imgUrl: user.imgUrl,
        stations: user.stations,
        likedTracks: {
            name: 'Liked Songs',
            tracks: user.likedTracks.tracks,
            owner: {
                username: user.fullname,
                _id: user._id,
            },
            images: [{ url: '/src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
            type: 'station',
        },
    }
    // localStorage.setItem(
    //     STORAGE_KEY_LOGGEDIN_USER,
    //     JSON.stringify(loggedinUser)
    // )
    sessionStorage.setItem(
        STORAGE_KEY_LOGGEDIN_USER,
        JSON.stringify(loggedinUser)
    )
    return loggedinUser
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createLoggedinUser() {
    if (getLoggedinUser()) return
    const users = []
    const user = {
        id: makeId(),
        fullname: 'Mustafa Adminsky',
        username: 'admin',
        password: 'admin',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        stations: [
            '3xqcAMgjHGrv3ElA51zZRj',
            '7gb4GZz7iIHGilXxD7638E',
            '4DJztJkufdlND0Hvg4nGkK',
            '3E0RgJpQug1ibE2jTGI0Hk',
            '2O3jLuM3inA4vw5fZdGz9W',
        ],
        likedTracks: {
            name: 'Liked Songs',
            tracks: [],
            owner: {
                username: 'admin',
                id: 'admin',
            },
            images: [{ url: '/src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
            type: 'station',
        },
    }
    users.push(user)
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(users))
    login({ username: 'admin', password: 'admin' })
}
