import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import dialogReducer from '../features/dialogSlice';
import commentReducer from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    open: dialogReducer,
    status: commentReducer
  },
});
