import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: null,
  email: null,
  token: null,
  subscriptions: []
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccountData(state, action) {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.subscriptions = action.payload.subscriptions;
    },
    removeAccountData() {
      return initialState;
    }, 
  }
});

export const { updateAccountData, removeAccountData } = accountSlice.actions;
export { accountSlice };
