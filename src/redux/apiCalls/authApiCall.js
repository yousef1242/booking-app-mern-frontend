import { toast } from "react-toastify";
import request from "../../ulites/request";
import { logout, setRegisterMessage, setUser } from "../slices/authSlice";
import Cookies from "js-cookie";

export function registerApiCall(dataForm) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", dataForm);
      dispatch(setRegisterMessage(data.message));
      console.log(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function loginApiCall(dataForm) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", dataForm);
      dispatch(setUser(data));
      Cookies.set("userInfoDetailsUserInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}


export function logoutApiCall() {
  return async (dispatch) => {
    try {
      dispatch(logout());
      Cookies.remove("userInfoDetailsUserInfo");
    } catch (error) {
      console.log(error);
    }
  };
}


