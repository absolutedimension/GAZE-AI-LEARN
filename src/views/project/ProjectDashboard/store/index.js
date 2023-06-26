import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import liveCode from './liveCodeSlice'

const reducer = combineReducers({
    data,
    liveCode
})

export default reducer
