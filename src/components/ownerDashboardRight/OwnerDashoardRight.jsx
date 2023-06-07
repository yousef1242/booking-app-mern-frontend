import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ownerDashoardRight.css";
import ChartOwnerDashboard from "../chartOwnerDashboard/ChartOwnerDashboard";
import { setOwnerHotelInfoApiCall } from "../../redux/apiCalls/hotelApiCall";

const OwnerDashoardRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  const totalPrice = OwnerHotelInfo?.length > 0
    && OwnerHotelInfo[0]?.bookings
        .reduce((acc, item) => acc + item.priceOfBooking, 0)
        .toLocaleString()
  useEffect(() => {
    dispatch(setOwnerHotelInfoApiCall(user?.id));
  }, []);
  return (
    <>
      <div className="col-12 col-md-9 py-md-5 h-100 owner-dashboard-right">
        <div className="header-card">
          <div className="row w-100 m-0">
            <h4 className="fw-bold mb-5">Overview</h4>
            <div className="col-12 col-sm-6 col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-around">
              <div className="card">
                <div className="icon bg-purple">
                  <i class="bi bi-menu-button"></i>
                </div>
                <div className="info">
                  <h6 className=" color-purple">{OwnerHotelInfo?.length}</h6>
                  <h5>Total Hotels</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-around">
              <div className="card">
                <div className="icon bg-green">
                  <i class="bi bi-menu-button"></i>
                </div>
                <div className="info">
                  <h6 className=" color-green">
                    {OwnerHotelInfo?.length > 0 ? OwnerHotelInfo[0]?.bookings?.length : 0}
                  </h6>
                  <h5>Total Booking</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-around">
              <div className="card">
                <div className="icon bg-orange">
                  <i class="bi bi-menu-button"></i>
                </div>
                <div className="info">
                  <h6 className=" color-orange">
                    ${OwnerHotelInfo?.length > 0 ? totalPrice  : 0}
                  </h6>
                  <h5>Total Earning</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {OwnerHotelInfo?.length > 0 && (
          <div className="chart-owner-dashboard w-100 mt-5">
            <h2 className="mb-4 text-center fw-bold">Chart of booking</h2>
            <ChartOwnerDashboard data={OwnerHotelInfo[0]?.bookings} />
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerDashoardRight;
