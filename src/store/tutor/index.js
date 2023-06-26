import { combineReducers } from '@reduxjs/toolkit'
import tutor from './tutor'
import course from './courseSlice'
import liveCodeSlice from  './tutorLiveCode'
import implementedCodeSlice from  './implementedCodeSlice'

const reducer = combineReducers({
    tutor,
    course,
    liveCodeSlice,
    implementedCodeSlice
})

export default reducer