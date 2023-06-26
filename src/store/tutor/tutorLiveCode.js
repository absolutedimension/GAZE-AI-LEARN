import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { apiAskCourseDetails, apiAskUniverse } from 'services/AiBotService'


export const initialState = {
    id: 1,
    messages: [],
    history: [],
    newHistory: [],
    isMe: false,
    takeTest: false,
    newCardAddedIndex: 0,
    extractedData: [],
    updatedHistory: "",
    userStories:[]
  }
  
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };
  
  
  
  
  export const getChatGPTApiData = createAsyncThunk('liveProject/getChatGPTApiData', async (data) => {
    console.log("Inside api call" + data);
  
    const response = await apiAskUniverse(data)
  
  
    return response.data
  })
  
  export const getCourseDetailsApiData = createAsyncThunk('liveProject/getCourseDetailsApiData', async (data) => {
    // console.log("Inside api call"+data);
  
    const response = await apiAskCourseDetails(data)
  
  
    return response.data
  })





const liveCodeSlice = createSlice({
    name: 'liveCodeSlice/state',
    initialState: {
        sideBarExpand: true,
        mobileSideBarExpand: false,
        selectedCategory: {},
        reply: false,
        newMessageDialog: false,
        messages: [],
        history: [],
        newHistory: [],
        isMe: false,
        takeTest: false,
        newCardAddedIndex: 0,
        extractedData: [],
        updatedHistory: "",
        userStories:[]
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
    sendMessageToChatBoxProjectTutor
  
} = liveCodeSlice.actions


export default liveCodeSlice.reducer
