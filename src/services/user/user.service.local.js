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
    if (loggedinUser.id === user.id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER)
    const user = users.find((user) => user.userName === userCred.userName)

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
        fullName: user.fullName,
        userName: user.userName,
        password: user.password,
        imgUrl: user.imgUrl,
        likedStations: user.likedStations || [],
        likedTracks: {
            name: 'Liked Songs',
            tracks: user.likedTracks?.tracks || [],
            owner: {
                userName: user.userName,
                id: user.id,
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
        id: user.id,
        fullName: user.fullName,
        userName: user.userName,
        password: user.password,
        imgUrl: user.imgUrl,
        likedStations: user.likedStations,
        likedTracks: {
            name: 'Liked Songs',
            tracks: user.likedTracks.tracks,
            owner: {
                userName: user.userName,
                id: user.id,
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
        fullName: 'Mustafa Adminsky',
        userName: 'admin',
        password: 'admin',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        likedStations: [
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
                userName: 'admin',
                id: 'admin',
            },
            images: [{ url: '/src/assets/images/liked-songs.png' }],
            id: 'liked-songs',
            type: 'station',
        },
    }
    users.push(user)
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(users))
    login({ userName: 'admin', password: 'admin' })
}
