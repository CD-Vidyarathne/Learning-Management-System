import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import { alertsSlice } from './alertsSlice.jsx'


const rootReducer = combineReducers({
	alerts:alertsSlice.reducer
})

const store = configureStore({
	reducer:rootReducer
})

export default store;

