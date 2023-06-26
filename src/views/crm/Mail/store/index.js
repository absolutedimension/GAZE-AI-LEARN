import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import data from './dataSlice'
import webSocketData from './webSocketSlice'


const reducer = combineReducers({
    state,
    data,
    webSocketData

    
})

export default reducer
