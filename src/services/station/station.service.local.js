import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addStationMsg,
}
window.cs = stationService

async function query(filterBy = {}) {
    var stations = await storageService.query(STORAGE_KEY)
    // const likedStationIds = !Array.isArray(filterBy.likedStations) ? Object.values(filterBy.likedStations) : filterBy.likedStations
    console.log('filterBy',filterBy)
    if (filterBy?.likedStations) {
        let likedStations = filterBy.likedStations
        // if(typeof likedStations === 'object') likedStations = Object.keys(filterBy.likedStations)
        console.log('stations',stations)
        stations = stations.filter((station) =>
            likedStations.includes(station.id)
        )
    }
    return stations
}

async function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station.id) {
        const stationToSave = {
            id: station.id,
            tracks: station.tracks,
        }
        savedStation = await storageService.put(STORAGE_KEY,{...station, ...stationToSave})
    } else {
        const stationToSave = {
            description: station.description,
            id: makeId(),
            images: station.images.length ? [...station.images] : [{url:'/src/assets/images/default-img.png'}],
            name: station.name,
            tracks: station.tracks,
            owner: station.owner,
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}
