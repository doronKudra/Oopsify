const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'
import { stationService as local } from './station.service.local'
import { stationService as remote } from './station.service.remote'

function getEmptyStation(owner) {
	return {
		name: 'My Playlist',
        description: '',
        owner,
        images: [],
        tracks: [],
	}
}

function getDefaultFilter() {
    return {
        
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const stationService = { getEmptyStation, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stationService = stationService
