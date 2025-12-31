import { getDemoStation } from '../actions/station.actions'

export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'
export const SET_SIDEBAR_STATIONS = 'SET_SIDEBAR_STATIONS'
export const ADD_SIDEBAR_STATION = 'ADD_SIDEBAR_STATION'
export const REMOVE_SIDEBAR_STATION = 'REMOVE_SIDEBAR_STATION'
export const ADD_TRACK = 'ADD_TRACK'
export const REMOVE_TRACK = 'REMOVE_TRACK'
export const SET_SHUFFLED = 'SET_SHUFFLED'

const initialState = {
    stations: [],
    sidebarStations: [],
    station: null,
    shuffled: {
        recommendedStations: [],
        discoverStations: [],
        trendingStations: [],
        vibeStations: [],
    },
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
            const lastRemovedStation = state.stations.find(
                (station) => station._id === action.stationId
            )
            stations = state.stations.filter(
                (station) => station._id !== action.stationId
            )
            return { ...state, stations, lastRemovedStation }
        case ADD_STATION:
            return { ...state, stations: [...state.stations, action.station] }
        case ADD_SIDEBAR_STATION:
            return {
                ...state,
                sidebarStations: [...state.sidebarStations, action.station],
            }
        case REMOVE_SIDEBAR_STATION:
            let sidebarStations = state.sidebarStations.filter(
                (station) => station._id !== action.stationId
            )
            return { ...state, sidebarStations: [...sidebarStations] }
        case UPDATE_STATION:
            stations = state.stations.map((station) =>
                station._id === action.station._id
                    ? { ...action.station }
                    : station
            )
            const currentStation =
                state.station?._id === action.station._id
                    ? { ...action.station }
                    : state.station
            return { ...state, stations, station: currentStation }
        case ADD_STATION_MSG:
            if (action.msg && state.station) {
                return {
                    ...state,
                    station: {
                        ...state.station,
                        msgs: [...(state.station.msgs || []), action.msg],
                    },
                }
            }
        case ADD_TRACK:
            return {
                ...state,
                station: { ...state.station, tracks: [...action.tracks] },
            }
        case REMOVE_TRACK:
            let updatedTracks = state.station.tracks.filter(
                (track) => track._id !== action.trackId
            )
            return {
                ...state,
                station: { ...state.station, tracks: [...updatedTracks] },
            }
        case SET_SHUFFLED:
            return {
                ...state,
                shuffled: {...state.shuffled, ...action.shuffled}
            }
        default:
            return state
    }
}