import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import hotelsSlice from './slices/hotelsSlice'
import bookingSlice from './slices/bookingSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
    hotels : hotelsSlice,
    booking : bookingSlice,
  },
})
