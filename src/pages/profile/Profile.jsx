import "./profile.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setProfileInfoApiCall,
  setUpdateProfileImageApiCall,
} from "../../redux/apiCalls/profileApiCall";
import ModelUpdateProfile from "../../components/modelUpdateProfile/ModelUpdateProfile";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { profileInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  useEffect(() => {
    dispatch(setProfileInfoApiCall(userId));
  }, []);
  const formHandlerUploadImage = (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error("no file provided")
    }
    const formData = new FormData();
    formData.append("file", image);
    dispatch(setUpdateProfileImageApiCall(formData, userId));
  };
  return (
    <>
      <div className="profile-page">
        <div className="profile-info">
          <div className="profile-info-div-image">
            <img
              src={
                image ? URL.createObjectURL(image) : profileInfo?.userImage?.url
              }
              alt=""
              className="profile-info-image img-fluid"
            />
            {user?.id === userId && (
              <form onSubmit={formHandlerUploadImage}>
                <label className="bi bi-camera-fill" htmlFor="file"></label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file"
                />
                <button type="submit">upload</button>
              </form>
            )}
          </div>
          <h3 className="profile-info-username">{profileInfo?.username}</h3>
          {user?.id === userId && (
            <button
              onClick={() => setOpenModel(true)}
              className="profile-info-btn"
            >
              update profile
            </button>
          )}
        </div>
      </div>
      {openModel && (
        <ModelUpdateProfile
          setOpenModel={setOpenModel}
          profileInfo={profileInfo}
        />
      )}
    </>
  );
};

export default ProfilePage;
