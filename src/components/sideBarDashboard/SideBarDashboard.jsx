import { Link } from "react-router-dom";
import "./sideBarDashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setOwnerHotelInfoApiCall } from "../../redux/apiCalls/hotelApiCall";

const SideBarDashboard = () => {
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOwnerHotelInfoApiCall(user?.id));
  }, []);
  return (
    <>
      <div className="col-3 p-4 py-5 d-none d-md-block side-bar-dashboard">
        <h3>Owner dashboard</h3>
        <Link to={`/owner/dashboard`}>
          <i class="bi bi-border-all"></i> Dashboard
        </Link>
        {OwnerHotelInfo?.length > 0 && (
          <>
            {" "}
            <Link to={`/owner/dashboard/bookings`}>
              <i class="bi bi-journal-plus"></i> Bookings
            </Link>
            <Link to={`/owner/dashboard/hotel`}>
              <i class="bi bi-bank"></i> Hotel
            </Link>
          </>
        )}
        {!OwnerHotelInfo?.length > 0 && (
          <Link to={`/owner/dashboard/add-hotel`}>
            <i class="bi bi-file-plus"></i> Add hotel
          </Link>
        )}
      </div>
    </>
  );
};

export default SideBarDashboard;
