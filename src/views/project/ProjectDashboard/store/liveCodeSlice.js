import { createSlice } from '@reduxjs/toolkit'

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };


const liveCodeSlice = createSlice({
    name: 'liveCodeData/state',
    initialState: {
        sideBarExpand: true,
        mobileSideBarExpand: false,
        selectedCategory: {},
        reply: false,
        newMessageDialog: false,
        messages:[],
        isLoading:false,
        loadingMessageId:0,
        isStoryCreated:false

    },
    reducers: {
        updateReply: (state, action) => {
            state.reply = action.payload
        },
        setNewStory: (state, action) => {
            state.isStoryCreated = false;
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
        sendMessageToChatBoxProjectTutor: (state, action) => {
            const responseMessage = {
              id: generateRandomId(),
              message: action.payload,
              isMe: true
            };
           
            state.messages = [...state.messages, responseMessage];
            state.isLoading = true;
            state.loadingMessageId = responseMessage.id;
          },
    },
})

export const {
    updateReply,
    toggleSidebar,
    toggleMobileSidebar,
    toggleNewMessageDialog,
    updateSelectedCategory,
    sendMessageToChatBoxProjectTutor,
    setNewStory,
} = liveCodeSlice.actions

export default liveCodeSlice.reducer
