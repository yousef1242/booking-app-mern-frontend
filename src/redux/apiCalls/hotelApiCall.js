import { toast } from "react-toastify";
import request from "../../ulites/request";
import {
  setDeleteHotelReview,
  setHotels,
  setHotelsSearch,
  setOwnerAddHotel,
  setOwnerHotelInfo,
  setSingleHotel,
  setUpdateHotelReviewAdd,
  setUpdateHotelRoomsNumber,
} from "../slices/hotelsSlice";

export function setHotelApiCall() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/hotels`);
      dispatch(setHotels(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setHotelSearchApiCall(searchValue) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `/api/hotels/search?search=${searchValue}`
      );
      dispatch(setHotelsSearch(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setSingleHotelApiCall(hotelId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/hotels/${hotelId}`);
      dispatch(setSingleHotel(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setUpdateHotelRoomsNumberApiCall(hotelId, newNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/hotels/update-hotel/rooms/${hotelId}`,
        newNumber
      );
      dispatch(setUpdateHotelRoomsNumber(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setHotelAddReviewApiCall(hotelId, newData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/hotels/add-review-hotel/${hotelId}`,
        newData,
        {
          headers: {
            Authorization: "bearen " + getState().auth.user.token,
          },
        }
      );
      dispatch(setUpdateHotelReviewAdd(data));
      toast.success("Review was added successfully");
    } catch (error) {
      console.log(error);
    }
  };
}

export function setDeleteReviewApiCall(hotelId, reviewId) {
  return async (dispatch) => {
    try {
      const { data } = await request.delete(
        `/api/hotels/${hotelId}/delete/review`,
        { data: { reviewId } }
      );
      dispatch(setDeleteHotelReview(data));
      console.log(data);
      toast.success("Review was deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
}

export function setDeleteHotelApiCall(hotelId) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/hotels/delete-hotel/${hotelId}`);
      dispatch(setOwnerHotelInfo(null));
      toast.success("Hotel has been deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
}

export function setOwnerHotelInfoApiCall(ownerId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/hotels/owner/${ownerId}`);
      dispatch(setOwnerHotelInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setAddHotelApiCall(newPost) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/hotels/add-hotel`, newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    }
  };
}

export function setUpdateHotelApi(hotelId,newDetails) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(`/api/hotels/update-hotel/${hotelId}`, newDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };
}
