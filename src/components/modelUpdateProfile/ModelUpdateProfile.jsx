import { useDispatch } from "react-redux";
import "./modelUpdateProfile.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { setUpdateProfileInfoApiCall } from "../../redux/apiCalls/profileApiCall";
import {toast} from "react-toastify"

const ModelUpdateProfile = ({ profileInfo, setOpenModel }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(profileInfo?.username);
  const [email, setEmail] = useState(profileInfo?.email);
  const formSibmitHandler = (e) => {
    e.preventDefault();
    dispatch(setUpdateProfileInfoApiCall({username,email},userId));
    setOpenModel(false);
    toast.success("Profile has been updated");
  };
  return (
    <>
      <div className="model-update-profile">
        <div className="update-profile">
          <div className="top-header">
            <h5>Update profile</h5>
            <i onClick={() => setOpenModel(false)} class="bi bi-x-lg"></i>
          </div>
          <form onSubmit={formSibmitHandler}>
            <div className="form-group">
              <label htmlFor="username">Update Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Update Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                placeholder="Email"
              />
            </div>
            <button className="form-btn-update">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModelUpdateProfile;
