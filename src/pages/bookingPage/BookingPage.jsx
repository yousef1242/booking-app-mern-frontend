import { useEffect } from "react";
import "./bookingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { setBookingForUserApiCall, setCancelBookingApiCall } from "../../redux/apiCalls/bookingApiCall";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const { bookingUser } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBookingForUserApiCall());
  }, []);
  return (
    <>
      <div className="booking-page py-5">
        <div className="container">
          {bookingUser?.length > 0 ? (
            <>
              {bookingUser?.map((book) => (
                <div key={book?._id} className="book-section">
                  <div className="header-info">
                    <div className="child">
                      <h3 className="booking-details-title text-start">
                        Your booking information
                      </h3>
                      <h5 className="text-start fw-bold mb-3">
                        Hotel : {book?.place?.title}
                      </h5>
                      <div className="info-section-booking">
                        <span className="me-2">
                          <i class="bi bi-moon-stars me-1"></i>
                          {book?.nightOfBooking} nights
                        </span>
                        <span className="ms-2">
                          <i class="bi bi-calendar3 me-1"></i>
                          {new Date(
                            book?.checkInOfBooking
                          ).toLocaleDateString()}
                        </span>
                        <span className="ms-2">-</span>
                        <span className="ms-2">
                          <i class="bi bi-calendar3 me-1"></i>{" "}
                          {new Date(
                            book?.checkOutOfBooking
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      {book?.isCanceled ? (
                        <span
                          style={{
                            color: "var(--red-color)",
                            textDecoration: "underline",
                          }}
                        >
                          canceled
                        </span>
                      ) : (
                        <button onClick={() => dispatch(setCancelBookingApiCall(book?._id))} className="cancel-btn">cancel this trip</button>
                      )}
                    </div>
                    <div className="child">
                      <h5 className="price-booking">${book?.priceOfBooking}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2 className="no-booking-text">No booking</h2>
              <Link className="link-booking" to={`/hotels?search=`}>Book now</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
