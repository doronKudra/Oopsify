import { getDemoStation } from "../actions/station.actions"

export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'
export const SET_SIDEBAR_STATIONS = 'SET_SIDEBAR_STATIONS'
export const ADD_SIDEBAR_STATION = 'ADD_SIDEBAR_STATION'
export const REMOVE_SIDEBAR_STATION = 'REMOVE_SIDEBAR_STATION'

const initialState = {
    stations: [],
    sidebarStations: [],
    station: null,
}

export function stationReducer(state = initialState, action) {
    let stations
    switch (action.type) {
        case SET_STATIONS:
            return { ...state, stations: [...action.stations] }
        case SET_SIDEBAR_STATIONS: // load user stations use this reducer
            return { ...state, sidebarStations: [...action.stations] }
        case SET_STATION:
            return { ...state, station: action.station }
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            return { ...state, stations, lastRemovedStation }
        case ADD_STATION:
            return { ...state, stations: [...state.stations, action.station] }
        case ADD_SIDEBAR_STATION:
            return { ...state, sidebarStations: [...state.sidebarStations, action.station] }
        case REMOVE_SIDEBAR_STATION:
            let sidebarStations = state.sidebarStations.filter(station => station._id !== action.stationId)
            return { ...state, sidebarStations: sidebarStations }
        case UPDATE_STATION:
            stations = state.stations.map(station =>
                station._id === action.station._id ? { ...action.station } : station)
            const currentStation = state.station?._id === action.station._id ? { ...action.station } : state.station
            return { ...state, stations, station: currentStation }
        case ADD_STATION_MSG:
            if (action.msg && state.station) {
                return { ...state, station: { ...state.station, msgs: [...state.station.msgs || [], action.msg] } }
            }
        default:
            return state
    }
}

// unitTestReducer()

// function unitTestReducer() {
//     var state = initialState
//     const station1 = { id: 'b101', name: 'Station 1' }
//     const station2 = { id: 'b102', name: 'Station 2' }

//     state = stationReducer(state, { type: SET_STATIONS, stations: [station1] })
//     console.log('After SET_STATIONS:', state)

//     state = stationReducer(state, { type: ADD_STATION, station: station2 })
//     console.log('After ADD_STATION:', state)

//     state = stationReducer(state, { type: UPDATE_STATION, station: { ...station2, vendor: 'Good' } })
//     console.log('After UPDATE_STATION:', state)

//     state = stationReducer(state, { type: REMOVE_STATION, stationId: station2._id })
//     console.log('After REMOVE_STATION:', state)

//     state = stationReducer(state, { type: SET_STATION, station: station1 })
//     console.log('After SET_STATION:', state)

//     const msg = { id: 'm' + parseInt('' + Math.random() * 100), txt: 'Some msg', by: { id: 'u123', fullname: 'test' } }
//     state = stationReducer(state, { type: ADD_STATION_MSG, stationId: station1._id, msg })
//     console.log('After ADD_STATION_MSG:', state)
// }

