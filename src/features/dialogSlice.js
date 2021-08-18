import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: null,
};

export const dialogSlice = createSlice({
  name: 'open',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    dialog: (state, action) => {
      state.open = action.payload;
    },
  }
  
});

export const { dialog } = dialogSlice.actions;

//Selectors
export const selectDialog = (state) => state.open.open;


export default dialogSlice.reducer;
