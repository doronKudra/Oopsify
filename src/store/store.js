import { configureStore } from '@reduxjs/toolkit'
import { stationReducer } from './reducers/station.reducer'
import { userReducer } from './reducers/user.reducer'
import { systemReducer } from './reducers/system.reducer'
import { playerReducer } from './reducers/player.reducer'

export const store = configureStore({
    reducer: {
        stationModule: stationReducer,
        playerModule: playerReducer,
        userModule: userReducer,
        systemModule: systemReducer,
    }
})

store.subscribe(() => {
    console.log('playerState changed:', store.getState())
})