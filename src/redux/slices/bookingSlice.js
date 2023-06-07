import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    addBookingMessage: null,
    bookingUser: null,
  },
  reducers: {
    setAddBookingMessage(state, action) {
      state.addBookingMessage = action.payload;
    },
    setBookingForUser(state, action) {
      state.bookingUser = action.payload;
    },
    setCancelBooking(state, action) {
      state.bookingUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddBookingMessage,
  setBookingForUser,
  setCancelBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
