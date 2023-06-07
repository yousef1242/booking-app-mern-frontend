import { useSelector, useDispatch } from "react-redux";
import "./ownerBookingDashboardRight.css";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { setOwnerHotelInfoApiCall } from "../../redux/apiCalls/hotelApiCall";

const OwnerBookingDashboardRight = () => {
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOwnerHotelInfoApiCall(user?.id));
  }, []);
  return (
    <>
      <div className="col-12 pt-5 col-md-9 h-100 owner-dashboard-booking-right">
        <div className="container w-100 h-100">
          <h2>All booking</h2>
          <div>
            <Table className="text-center" responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>username</th>
                  <th>check-in</th>
                  <th>check-out</th>
                  <th>nights</th>
                  <th>rooms</th>
                  <th>gusts</th>
                  <th>price</th>
                  <th>is-canceled</th>
                </tr>
              </thead>
              <tbody>
                {OwnerHotelInfo?.length > 0 && OwnerHotelInfo[0]?.bookings?.map((book, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{book?.user?.username}</td>
                    <td>
                      {book?.checkInOfBooking
                        ? new Date(book?.checkInOfBooking).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {book?.checkOutOfBooking
                        ? new Date(book?.checkOutOfBooking).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{book?.nightOfBooking}</td>
                    <td>{book?.HowManyRooms}</td>
                    <td>{book?.HowManygusts}</td>
                    <td>${book?.priceOfBooking}</td>
                    <td className={book.isCanceled ? "red-color" : "green-color"}>{book.isCanceled ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerBookingDashboardRight;
