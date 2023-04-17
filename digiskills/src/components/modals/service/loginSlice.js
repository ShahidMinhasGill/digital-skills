import { createSlice } from '@reduxjs/toolkit';
import { login ,fetchUser} from './loginApi';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: null,
    expiry: null,
    isLoading: false,
    error: null,
    user:null
  },
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.expiry = action.payload.expiry;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

// export const { loginStart, loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;
