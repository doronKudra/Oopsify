import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    UPDATE_STATION,
    ADD_STATION_MSG
} from '../reducers/station.reducer'

import { stationService } from '../../services/station'

// 🔹 LOAD LIST
export function loadStations(filterBy) {
    return async dispatch => {
        try {
            const stations = await stationService.query(filterBy)
            dispatch({ type: SET_STATIONS, stations })
        } catch (err) {
            console.error('Cannot load stations', err)
            throw err
        }
    }
}

// 🔹 LOAD SINGLE
export function loadStation(stationId) {
    return async dispatch => {
        try {
            const station = await stationService.getById(stationId)
            dispatch({ type: SET_STATION, station })
        } catch (err) {
            console.error('Cannot load station', err)
            throw err
        }
    }
}

// 🔹 REMOVE
export function removeStation(stationId) {
    return async dispatch => {
        try {
            await stationService.remove(stationId)
            dispatch({ type: REMOVE_STATION, stationId })
        } catch (err) {
            console.error('Cannot remove station', err)
            throw err
        }
    }
}

// 🔹 ADD
export function addStation(station) {
    return async dispatch => {
        try {
            const savedStation = await stationService.save(station)
            dispatch({ type: ADD_STATION, station: savedStation })
            return savedStation
        } catch (err) {
            console.error('Cannot add station', err)
            throw err
        }
    }
}

// 🔹 UPDATE
export function updateStation(station) {
    return async dispatch => {
        try {
            const savedStation = await stationService.save(station)
            dispatch({ type: UPDATE_STATION, station: savedStation })
            return savedStation
        } catch (err) {
            console.error('Cannot update station', err)
            throw err
        }
    }
}

// 🔹 ADD MESSAGE
export function addStationMsg(stationId, txt) {
    return async dispatch => {
        try {
            const msg = await stationService.addStationMsg(stationId, txt)
            dispatch({ type: ADD_STATION_MSG, msg })
            return msg
        } catch (err) {
            console.error('Cannot add station msg', err)
            throw err
        }
    }
}

// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdAddStationMsg(msg) {
    return {
        type: ADD_STATION_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationService.getEmptyStation())
    await updateStation({
        _id: 'm1oC7',
        name: 'Station-Good',
    })
    await removeStation('m1oC7')
    // TODO unit test addStationMsg
}
