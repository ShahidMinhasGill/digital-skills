import { createSlice } from '@reduxjs/toolkit';
import {fetchUser, fetchQuestions, fetchUserProgress, fetchUserResult, postResponse } from './HomeApi';

const questionsSlice = createSlice({
  name: 'questions',
   initialState: {
    questions: [],
    userProgress: [],
    data: null,
    status: null,
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(postResponse.fulfilled, (state, action) => {
        state.data = action.payload;
      })
   

      .addCase(fetchUserProgress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProgress = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
  },
});

// Export the questions reducer
export default questionsSlice.reducer;