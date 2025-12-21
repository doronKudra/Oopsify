import { configureStore } from '@reduxjs/toolkit'
import { stationReducer } from './reducers/station.reducer'
import { userReducer } from './reducers/user.reducer'
import { systemReducer } from './reducers/system.reducer'

export const store = configureStore({
    reducer: {
        stationModule: stationReducer,
        userModule: userReducer,
        systemModule: systemReducer,
    }
})