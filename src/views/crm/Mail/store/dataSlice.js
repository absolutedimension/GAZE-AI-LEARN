import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCrmMails, apiGetCrmMail } from 'services/CrmService'






export const getMails = createAsyncThunk(
    'crmMail/data/getMails',
    async (params) => {
        const response = await apiGetCrmMails(params)
        return response.data
    }
)

export const getMail = createAsyncThunk(
    'crmMail/data/getMail',
    async (params) => {
        const response = await apiGetCrmMail(params)
        return response.data
    }
)


const webSocketDataSlice = createSlice({
    name: 'webSocket/data',
    initialState: {
        mailListLoading: false,
        mailLoading: false,
        mailList: [],
        mail: {},
        selectedMailId: '',
    },
    reducers: {
        // sendMessage: (state, action) => {
        //     state.mailList = action.payload
        // },
        updateMail: (state, action) => {
            state.mail = action.payload
        },
        updateMailId: (state, action) => {
            if (action.payload) {
                state.mailLoading = true
            }
            state.selectedMailId = action.payload
        },
    },
    extraReducers: {
        [getMails.fulfilled]: (state, action) => {
            state.mailListLoading = false
            state.mailList = action.payload
        },
        [getMail.fulfilled]: (state, action) => {
            state.mailLoading = false
            state.mail = action.payload
        },
        [getMails.pending]: (state) => {
            state.mailListLoading = true
        },
        [getMail.pending]: (state) => {
            state.mailLoading = true
        },
    },
})

const dataSlice = createSlice({
    name: 'crmMail/data',
    initialState: {
        history: "",
        isConnected: false,
        error: "",
        
    },
    reducers: {
        // messageSent: (state, action) => {
        //     state.history= [...state.history, action.payload]
        // },
        // messageRecieved: (state, action) => {
        //     state.history= [...state.history, action.payload]
        // },
        // webSocketConnected: (state, action) => {
        //     if (action.payload) {             
        //         state.isConnected=true
        //     }         
        // },
        // webSocketDisconneted: (state, action) => {
        //     state.isConnected=false
        // },
        // webSocketError: (state, action) => {
        //     state.error= action.payload
        // },
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

export const { updateMailList, updateMail, updateMailId } = dataSlice.actions


export default dataSlice.reducer
