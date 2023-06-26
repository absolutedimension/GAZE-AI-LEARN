import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'






const webSocketData = createSlice({
    name: 'webSocket/data',
    initialState: {
        history: [],
        isConnected: false,
        error: [],
        
    },
    reducers: {
        messageSent: (state, action) => {
            state.history= [...state.history, action.payload]
        },
        messageRecieved: (state, action) => {
            state.history= [...state.history, action.payload]
        },
        webSocketConnected: (state, action) => {
            if (action.payload) {             
                state.isConnected=true
            }         
        },
        webSocketDisconneted: (state, action) => {
            state.isConnected=false
        },
        webSocketError: (state, action) => {
            state.error= action.payload
        },
    },
    extraReducers: {
        // [getMails.fulfilled]: (state, action) => {
        //     state.mailListLoading = false
        //     state.mailList = action.payload
        // },
        // [getMail.fulfilled]: (state, action) => {
        //     state.mailLoading = false
        //     state.mail = action.payload
        // },
        // [getMails.pending]: (state) => {
        //     state.mailListLoading = true
        // },
        // [getMail.pending]: (state) => {
        //     state.mailLoading = true
        // },
    },
})

export const {  messageSent,messageRecieved,webSocketConnected,webSocketDisconneted,webSocketError } = webSocketData.actions

export default webSocketData.reducer
