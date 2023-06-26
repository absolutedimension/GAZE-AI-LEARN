import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import tutor from './tutor/tutor'
import liveCodeSlice from './tutor/tutorLiveCode'
import courseSlice from './tutor/courseSlice'
import userStorySlice from './tutor/userStorySlice'
import implementedCodeSlice from './tutor/implementedCodeSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        base,
        locale,
        tutor,
        courseSlice,
        liveCodeSlice,
        userStorySlice,
        implementedCodeSlice,

        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
