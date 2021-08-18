import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem('user')
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!localStorage.getItem('user') 
    },
    logout: (state) => {
      state.user= null;
      state.isAuthenticated = !!localStorage.getItem('user')
    },
  }
  
});

export const { login, logout } = userSlice.actions;

//Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;


export default userSlice.reducer;
