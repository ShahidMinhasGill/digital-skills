import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const login = createAsyncThunk('auth/login', async (credentials) => {
//   try {
//     const response = await axios.post('https://walrus-app-xqntt.ondigitalocean.app/api/login/', credentials);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data);
//   }
// });
export const login = createAsyncThunk(
  'login/login',
  async (userData) => {
    const response = await axios.post('https://walrus-app-xqntt.ondigitalocean.app/api/login/', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
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
    return response.data;
  }
);
