import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiAskCourseDetails } from 'services/AiBotService'
// Define the initial state
const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

// Define the async thunk to fetch the course data
export const fetchCourseData = createAsyncThunk('course/fetchCourseData', async (topic_name) => {
  try {
   
    const response = await apiAskCourseDetails(topic_name); // Replace 'your-api-url' with the actual API endpoint
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch course data');
  }
});

// Create the course slice
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        const responseMessage = { 
            id: generateRandomId(), 
            message: action.payload, 
            isMe: false
          };
        state.messages = [...state.messages, responseMessage];
        state.isLoading = false;
        })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCourseData = (state) => state.course.data;
export const selectCourseLoading = (state) => state.course.isLoading;
export const selectCourseError = (state) => state.course.error;

export default courseSlice.reducer;
