import { createSlice } from '@reduxjs/toolkit'

const liveCodeSlice = createSlice({
    name: 'liveCodeData/state',
    initialState: {
        sideBarExpand: true,
        mobileSideBarExpand: false,
        selectedCategory: {},
        reply: false,
        newMessageDialog: false,
    },
    reducers: {
        updateReply: (state, action) => {
            state.reply = action.payload
        },
        toggleSidebar: (state, action) => {
            state.sideBarExpand = action.payload
        },
        toggleMobileSidebar: (state, action) => {
            state.mobileSideBarExpand = action.payload
        },
        toggleNewMessageDialog: (state, action) => {
            state.newMessageDialog = action.payload
        },
        updateSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
    },
})

export const {
    updateReply,
    toggleSidebar,
    toggleMobileSidebar,
    toggleNewMessageDialog,
    updateSelectedCategory,
} = liveCodeSlice.actions

export default liveCodeSlice.reducer
