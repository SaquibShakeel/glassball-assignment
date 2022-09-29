import { createSlice, configureStore } from "@reduxjs/toolkit";

let initialState = {
  user: {
    uid: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { login, logout } = authSlice.actions;

export default store;
