import { store } from '../store'
import { stationService } from '../../services/station'
import { userService } from '../../services/user'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, SET_STATION, UPDATE_STATION, SET_SIDEBAR_STATIONS, } from '../reducers/station.reducer'
import { updateUser } from './user.actions'


export function loadLikedTracks() {
    try {
        const storeUser = store.getState().userModule.user
        const likedTracks = storeUser?.likedTracks
        store.dispatch({ type: SET_STATION, station: likedTracks })
    } catch (err) {

    }
}

export async function loadStations(filterBy) { //station index
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

export async function addStation({ username, id }) {
    try {
        const station = stationService.getEmptyStation({ username, id })
        const savedStation = await stationService.save(station)

        const stationToStore = JSON.parse(JSON.stringify(savedStation))

        store.dispatch({ type: ADD_STATION, station: stationToStore })

        const user = store.getState().userModule.user
        if (user && !user.stations.filter((station) => {station.id === stationToStore.id})) {
            await updateUser({
                ...user,
                stations: [...user.stations, stationToStore],
            })
        }

        return stationToStore
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

export async function addTrackToStation(stationId, track) {
    try {
        const savedStation = await stationService.addTrack(stationId, track)
        store.dispatch({ type: UPDATE_STATION, station: savedStation })

        return savedStation
    } catch (err) {
        console.error('Cannot add track to station', err)
        throw err
    }
}

export async function removeTrackFromStation(station, trackId) {
    try {
        const updatedStation = {
            ...station,
            tracks: station.tracks.filter(t => t.id !== trackId),
        }

        const savedStation = await stationService.save(updatedStation)
        store.dispatch({ type: UPDATE_STATION, station: savedStation })

        return savedStation
    } catch (err) {
        console.error('Cannot remove track from station', err)
        throw err
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationService.getEmptyStation())
    await updateStation({
        id: 'm1oC7',
        name: 'Station-Good',
    })
    await removeStation('m1oC7')
    // TODO unit test addStationMsg
}

export function getDemoStation() {
    return {
        "id": "3E0RgJpQug1ibE2jTGI0Hk",
        "name": "Eminem best song 10 hours",
        "type": "station",
        "owner": {
            "id": "31mqwtxnxte5rztyagll4bg72vv4",
            "name": "RyexFrex",
            "type": "user"
        },
        "savedCount": 45841,
        "tracksCount": 123,
        "images": [
            {
                "height": 640,
                "url": "https://mosaic.scdn.co/640/ab67616d00001e021bec21e57fff76db49e15a70ab67616d00001e026ca5c90113b30c3c43ffb8f4ab67616d00001e02b6ef2ebd34efb08cb76f6eecab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://mosaic.scdn.co/300/ab67616d00001e021bec21e57fff76db49e15a70ab67616d00001e026ca5c90113b30c3c43ffb8f4ab67616d00001e02b6ef2ebd34efb08cb76f6eecab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                "width": 300
            },
            {
                "height": 60,
                "url": "https://mosaic.scdn.co/60/ab67616d00001e021bec21e57fff76db49e15a70ab67616d00001e026ca5c90113b30c3c43ffb8f4ab67616d00001e02b6ef2ebd34efb08cb76f6eecab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                "width": 60
            }
        ],
        "description": "with Mockinbirth, Whitout me,The Real Slim Shady,Lose Yourself, Superman",
        "tracks": [
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            },
            {
                "id": "3yfqSUWxFvZELEM4PmlwIR",
                "name": "The Real Slim Shady",
                "type": "track",
                "duration_ms": 284200,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "6t7956yu5zYf5A829XRiHC",
                    "name": "The Marshall Mathers LP",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851dbb3dd82da45b7d7f31b1b42",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 86
            },
            {
                "id": "1v7L65Lzy0j0vdpRjJewt1",
                "name": "Lose Yourself",
                "type": "track",
                "duration_ms": 322226,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1rfORa9iYmocEsnnZGMVC4",
                    "name": "Just Lose It",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b273b6ef2ebd34efb08cb76f6eec",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e02b6ef2ebd34efb08cb76f6eec",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00004851b6ef2ebd34efb08cb76f6eec",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 81
            },
            {
                "id": "4woTEX1wYOTGDqNXuavlRC",
                "name": "Superman",
                "type": "track",
                "duration_ms": 350320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    },
                    {
                        "id": "5jNmxPYz8QE5rYp4GDil8t",
                        "name": "Dina Rae",
                        "type": "artist"
                    }
                ],
                "popularity": 84
            },
            {
                "id": "561jH07mF1jHuk7KlaeF0s",
                "name": "Mockingbird",
                "type": "track",
                "duration_ms": 250760,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "1kTlYbs28MXw7hwO0NLYif",
                    "name": "Encore (Deluxe Version)",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2731bec21e57fff76db49e15a70",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e021bec21e57fff76db49e15a70",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048511bec21e57fff76db49e15a70",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 87
            },
            {
                "id": "7lQ8MOhq6IN2w8EYcFNSUk",
                "name": "Without Me",
                "type": "track",
                "duration_ms": 290320,
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                        "width": 640,
                        "height": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                        "width": 300,
                        "height": 300
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                        "width": 64,
                        "height": 64
                    }
                ],
                "album": {
                    "id": "2cWBwpqMsDJC1ZUwz813lo",
                    "name": "The Eminem Show",
                    "images": [
                        {
                            "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                            "width": 640,
                            "height": 640
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                            "width": 300,
                            "height": 300
                        },
                        {
                            "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                            "width": 64,
                            "height": 64
                        }
                    ],
                    "type": "album"
                },
                "artists": [
                    {
                        "id": "7dGJo4pcD2V6oG8kP0tJRR",
                        "name": "Eminem",
                        "type": "artist"
                    }
                ],
                "popularity": 88
            }
        ]
    }
}