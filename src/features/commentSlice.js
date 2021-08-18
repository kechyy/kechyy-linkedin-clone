import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    comment: (state, action) => {
      state.status = action.payload;
    },
  }
  
});

export const { comment } = commentSlice.actions;

//Selectors
export const selectComment = (state) => state.status.status;


export default commentSlice.reducer;
