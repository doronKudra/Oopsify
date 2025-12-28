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
    addTrack,
}
// window.cs = stationService //??

async function query(filterBy = {}) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy?.likedStations) {
        let likedStations = filterBy.likedStations
        stations = stations.filter((station) =>
            stations.includes(station._id)
        )
    }
    console.log('stations:',stations)
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
    let savedStation

    if (station._id) {
        const existingStation = await storageService.get(STORAGE_KEY, station.id)

        const mergedTracks = mergeTracks(
            existingStation?.tracks,
            station.tracks
        )

        const stationToSave = {
            ...existingStation,
            ...station,
            tracks: mergedTracks,
        }

        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        const stationToSave = {
            description: station.description,
            id: makeId(),
            images: station.images?.length
                ? station.images.map(img => ({ ...img }))
                : [{ url: '/src/assets/images/default-img.png' }],
            name: station.name,
            tracks: station.tracks ? [...station.tracks] : [],
            owner: { ...station.owner },
        }

        savedStation = await storageService.post(
            STORAGE_KEY,
            stationToSave
        )
    }

    return JSON.parse(JSON.stringify(savedStation))
}

async function addTrack(stationId, track) {
    const station = await getById(stationId)
    const trackMap = new Map((station.tracks || []).map(t => [t.id, t]))
    trackMap.set(track.id, track)

    const updatedStation = {
        ...station,
        tracks: Array.from(trackMap.values()),
    }

    return storageService.put(STORAGE_KEY, structuredClone(updatedStation))
}

async function addStationMsg(stationId, txt) {
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

function mergeTracks(existingTracks = [], incomingTracks = []) {
    const trackMap = new Map()

    existingTracks.forEach(track => {
        trackMap.set(track.id, track)
    })

    incomingTracks.forEach(track => {
        trackMap.set(track.id, track)
    })

    return Array.from(trackMap.values())
}