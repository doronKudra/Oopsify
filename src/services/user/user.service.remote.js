import { httpService } from '../http.service'
import { useNavigate } from 'react-router'

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
    // addStation,
    // getUsers,
}

// _createLoggedinUser()
// setUser()

async function signup(userCred) {
    // ✅
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

async function login(userCred) {
    // ✅
    try {
        const user = await httpService.post('auth/login', userCred)
        if (!user) throw new Error('Invalid login')
        return saveLoggedinUser(user)
    } catch (err) {
        console.error('Login failed', err)
        throw err
    }
}

async function logout() {
    //✅
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout') //only for clear the cookies
}

// async function setUser() {
//     try {
//         const sessionUser = getLoggedinUser()
//         if(!sessionUser) return
//         const user = await getById(sessionUser._id)
//     } catch (err) {
//         console.error('Login failed', err)
//         throw err
//     }
// }

async function getById(userId) {
    //✅
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function update(userToUpdate) {
    //✅
    const user = await httpService.put(`user/${userToUpdate._id}`, userToUpdate)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser && loggedinUser._id === user._id) saveLoggedinUser(user)
    return user
}

async function saveStation(station) {
    const savedStation = await httpService.put(
        `station/${station._id}`,
        station
    )
    // } else {
    // savedStation = await httpService.post('station', station)
    // }
    return savedStation
}

function remove(userId) {
    //? requireAuth
    return httpService.delete(`user/${userId}`)
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return user
}

function saveLoggedinUser(user) {
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
        },
    }
}

// async function _createLoggedinUser() {
//     if (getLoggedinUser()) return
//     const users = []
//     const user = {
//         id: makeId(),
//         fullname: 'Mustafa Adminsky',
//         username: 'admin',
//         password: 'admin',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//         stations: [
//             '3xqcAMgjHGrv3ElA51zZRj',
//             '7gb4GZz7iIHGilXxD7638E',
//             '4DJztJkufdlND0Hvg4nGkK',
//             '3E0RgJpQug1ibE2jTGI0Hk',
//             '2O3jLuM3inA4vw5fZdGz9W',
//         ],
        // likedTracks: {
        //     name: 'Liked Songs',
        //     tracks: [],
        //     owner: {
        //         username: 'admin',
        //         id: 'admin',
        //     },
        //     images: [{ url: '/src/assets/images/liked-songs.png' }],
        //     id: 'liked-songs',
        //     type: 'station',
        // },
//     }
//     users.push(user)
//     localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(users))
//     login({ username: 'admin', password: 'admin' })
// }
