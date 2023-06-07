import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: Cookies.get("userInfoDetailsUserInfo")
      ? JSON.parse(Cookies.get("userInfoDetailsUserInfo"))
      : null,
    registerMessage: null,
    profileInfo : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRegisterMessage: (state, action) => {
      state.registerMessage = action.payload;
    },
    logout(state){
        state.user = null
    },
    setProfileInfo(state, action){
        state.profileInfo = action.payload;
    },
    setAuthantication(state, action){
        state.user.username = action.payload;
    },
    setUserImage(state, action){
        state.user.userImage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setRegisterMessage, logout, setProfileInfo, setAuthantication, setUserImage } = authSlice.actions;

export default authSlice.reducer;
