import { Link, useLocation } from "react-router-dom";
import "./linksSwitchDashboard.css";
import { useSelector } from "react-redux";

const LinksSwitchDashboard = () => {
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  const location = useLocation()
  return (
    <>
      <div className="links-switch-component d-flex d-md-none">
        <Link className={location.pathname === "/owner/dashboard" ? "url-connect" : ""} to={`/owner/dashboard`}>
          <i class="bi bi-border-all"></i> Dashboard
        </Link>
        {OwnerHotelInfo?.length > 0 && (
          <>
            {" "}
            <Link className={location.pathname === "/owner/dashboard/bookings" ? "url-connect" : ""} to={`/owner/dashboard/bookings`}>
              <i class="bi bi-journal-plus"></i> Bookings
            </Link>
            <Link className={location.pathname === "/owner/dashboard/hotel" ? "url-connect" : ""} to={`/owner/dashboard/hotel`}>
              <i class="bi bi-bank"></i> Hotel
            </Link>
          </>
        )}
        {!OwnerHotelInfo?.length > 0 && (
          <Link className={location.pathname === "/owner/dashboard/add-hotel" ? "url-connect" : ""} to={`/owner/dashboard/add-hotel`}>
            <i class="bi bi-file-plus"></i> Add hotel
          </Link>
        )}
      </div>
    </>
  );
};

export default LinksSwitchDashboard;
