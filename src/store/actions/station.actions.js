import { store } from '../store'
import { stationService } from '../../services/station'
import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    UPDATE_STATION,
    SET_SIDEBAR_STATIONS,
} from '../reducers/station.reducer'

export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch({ type: SET_STATIONS, stations })
    } catch (err) {
        console.error('Cannot load stations', err)
        throw err
    }
}

export async function loadSidebarStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch({ type: SET_SIDEBAR_STATIONS, stations })
    } catch (err) {
        console.error('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        store.dispatch({ type: SET_STATION, station })
    } catch (err) {
        console.error('Cannot load station', err)
        throw err
    }
}

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch({ type: REMOVE_STATION, stationId })
    } catch (err) {
        console.error('Cannot remove station', err)
        throw err
    }
}

export async function addStation({ userName, id }) {
    try {
        const station = stationService.getEmptyStation({ userName, id })
        console.log('we got here ', station)
        const savedStation = await stationService.save(station).then(store.dispatch({ type: ADD_STATION, station }))

        return savedStation
    } catch (err) {
        console.error('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_STATION, station: savedStation })
        return savedStation
    } catch (err) {
        console.error('Cannot update station', err)
        throw err
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
