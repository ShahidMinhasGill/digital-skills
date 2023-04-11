import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk to fetch the questions
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const response = await axios.get('https://walrus-app-xqntt.ondigitalocean.app/api/v2/questions/');
    return response.data;
  }
);

export const postResponse = createAsyncThunk(
  'response/postResponse',
  async (data) => {
    const response = await axios.post('https://walrus-app-xqntt.ondigitalocean.app/api/v2/submit_answer/', data);
    return response.data;
  }
);

export const fetchUserProgress = createAsyncThunk(
  "userProgress/fetchUserProgress",
  async (id) => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(`https://walrus-app-xqntt.ondigitalocean.app/user_progress_api/${id}/`, {
        headers: { Authorization: `token ${token}` },
      });
      return response.data;
    } catch (error) {
      return error.response.data
    }
  }
);
// fetch current user
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const token = sessionStorage.getItem('token')
    const response = await axios.get('https://walrus-app-xqntt.ondigitalocean.app/api/auth/user', {
      headers: { Authorization: `token ${token}` },
    });
    sessionStorage.setItem('user',JSON.stringify(response.data))
    return response.data;
  }
);
export const fetchUserResult = createAsyncThunk(
  "userResult/fetchUserResult",
  async (id) => {
    const getUser = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(getUser);
    const response = await axios.get(`https://walrus-app-xqntt.ondigitalocean.app/user_result_api/${user?.id}/`, {
    });
    // const response = await axios.get(`https://walrus-app-xqntt.ondigitalocean.app/user_result_api/${id}/`);
    return response.data;
  }
);
