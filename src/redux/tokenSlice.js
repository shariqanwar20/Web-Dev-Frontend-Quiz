import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: null,
  },
  reducers: {
    setToken: (state, action) => {

      state.value = action.payload;
    },
    removeToken: (state) => {
      state.value = null;
    },
  },
});

// Export actions
export const { setToken, removeToken } = tokenSlice.actions;

// Export reducer
export default tokenSlice.reducer;
