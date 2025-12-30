import { httpService } from '../http.service'
import { makeId } from '../util.service'
import { userService } from '../user'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addStationMsg,
    addTrack,
    removeTrack,
    updateWithImage,
}

async function query(filterBy = null) {
    return httpService.get(`station`,  filterBy)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    var savedStation
    if (station._id) {
        console.log(station)
        savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
    return savedMsg
}

async function addTrack(stationId, track){
    const addedTrack = await httpService.post(`station/${stationId}/track`, track)
    return addedTrack
}

async function removeTrack(stationId, trackId){
    return httpService.delete(`station/${stationId}/${trackId}`)
}

async function updateWithImage(stationId, formData) {
    return await httpService.put(`station/${stationId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}