import { createSlice } from "@reduxjs/toolkit";

export const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: null,
    hotelsSearch: null,
    Singlehotels: {},
    OwnerHotelInfo: [],
  },
  reducers: {
    setHotels(state, action) {
      state.hotels = action.payload;
    },
    setHotelsSearch(state, action) {
      state.hotelsSearch = action.payload;
    },
    setSingleHotel(state, action) {
      state.Singlehotels = action.payload;
    },
    setUpdateHotelRoomsNumber(state, action) {
      state.Singlehotels.rooms = action.payload.rooms;
    },
    setUpdateHotelReviewAdd(state, action) {
      state.Singlehotels.reviews = action.payload.reviews;
    },
    setDeleteHotelReview(state, action) {
      state.Singlehotels.reviews = action.payload.reviews;
    },
    setOwnerHotelInfo(state, action) {
      state.OwnerHotelInfo = action.payload;
    },
    setOwnerAddHotel(state, action) {
      state.OwnerHotelInfo.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setHotels,
  setHotelsSearch,
  setSingleHotel,
  setUpdateHotelRoomsNumber,
  setUpdateHotelReviewAdd,
  setDeleteHotelReview,
  setOwnerHotelInfo,
  setOwnerAddHotel,
} = hotelsSlice.actions;

export default hotelsSlice.reducer;
