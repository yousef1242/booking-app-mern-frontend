import { toast } from "react-toastify"
import request from "../../ulites/request";
import { setAddBookingMessage, setBookingForUser, setCancelBooking, setOwnerInfoBooking, setOwnerInfoHotel } from "../slices/bookingSlice";

export function addBookingApiCall(bookingData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/bookings/add-book",
        bookingData,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch( setAddBookingMessage(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function setBookingForUserApiCall() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        "/api/bookings/booking-for-user",
        {
          headers: {
            Authorization: "bearen " + getState().auth.user.token,
          },
        }
      );
      dispatch(setBookingForUser(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function setCancelBookingApiCall(bookingId) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/bookings/cancel-booking/${bookingId}`,
      );
      dispatch(setCancelBooking(data));
      toast.success("Book has been canceled")
    } catch (error) {
      console.log(error);
    }
  };
}

