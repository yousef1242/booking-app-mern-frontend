import request from "../../ulites/request";
import Cookies from "js-cookie";
import { setAuthantication, setProfileInfo, setUser, setUserImage } from "../slices/authSlice";
import { toast } from "react-toastify"

export function setProfileInfoApiCall(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/${userId}`);
      dispatch(setProfileInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setUpdateProfileInfoApiCall(newData, userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/update-profile-info/${userId}`,
        newData,
        {
          headers : {
            Authorization : "bearen "+getState().auth.user.token
          }
        }
      );
        dispatch(setProfileInfo(data));
        dispatch(setAuthantication(data.username))
        const user = JSON.parse(Cookies.get("userInfoDetailsUserInfo"));
        user.username = data.username;
        Cookies.set("userInfoDetailsUserInfo", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };
}


export function setUpdateProfileImageApiCall(newData, userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/update-profile-image/${userId}`,
        newData,
        {
          headers : {
            Authorization : "bearen "+getState().auth.user.token
          }
        }
      );
        dispatch(setProfileInfo(data));
        dispatch(setUserImage(data?.userImage));
        toast.success("new images has been downloaded")
        const user = JSON.parse(Cookies.get("userInfoDetailsUserInfo"));
        user.userImage = data?.userImage;
        Cookies.set("userInfoDetailsUserInfo", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };
}
