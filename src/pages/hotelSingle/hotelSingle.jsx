import Dropdown from "react-bootstrap/Dropdown";
import "./hotelSingle.css";
import swal from "sweetalert";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  setDeleteReviewApiCall,
  setSingleHotelApiCall,
  setUpdateHotelRoomsNumberApiCall,
} from "../../redux/apiCalls/hotelApiCall";
import "./hotelSingle.css";
import { addBookingApiCall } from "../../redux/apiCalls/bookingApiCall";
import ModelDescriptionHotel from "../../components/modelDescriptionHotel/modelDescriptionHotel";
import ModelShowReview from "../../components/modelShowReview/ModelShowReview";
import ModelAddReview from "../../components/modelAddReview/ModelAddReview";
import { toast } from "react-toastify";

const SingleHotel = () => {
  const [show, setShow] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [night, setNight] = useState(1);
  const [gusts, setGusts] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [checkIn, setCheckIn] = useState();
  const [reviewDes, setReview] = useState("");
  const [checkOut, setCheckOut] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpenAddReview, setModelOpenAddReview] = useState(false);
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const { Singlehotels } = useSelector((state) => state.hotels);
  const { user } = useSelector((state) => state.auth);
  const today = new Date().toISOString().split("T")[0];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSingleHotelApiCall(hotelId));
  }, []);
  const formHandlerSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn) {
      return toast.error("Please choose a check-in date");
    }
    if (!checkOut) {
      return toast.error("Please choose a check-out date");
    }
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkInDate.toString() === "Invalid Date") {
      return toast.error("Invalid check-in date format");
    }
    if (checkOutDate.toString() === "Invalid Date") {
      return toast.error("Invalid check-out date format");
    }
    if (checkOutDate <= checkInDate) {
      return toast.error("Check-out date must be after check-in date");
    }
    const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setNight(diffDays);
    dispatch(
      addBookingApiCall({
        placeId: Singlehotels?._id,
        checkIn: checkIn,
        checkOut: checkOut,
        night: diffDays,
        price: diffDays * Singlehotels?.price * rooms,
        gusts: gusts,
        rooms: rooms,
        ownerThisPlace: Singlehotels?.owner,
      })
    );
    console.log(Singlehotels?.owner);
    dispatch(
      setUpdateHotelRoomsNumberApiCall(Singlehotels?._id, { rooms: rooms })
    );
    swal({
      title: "You have booked successfully!",
      icon: "success",
      button: "Ok!",
    });
  };
  return (
    <>
      {modelOpen && (
        <ModelDescriptionHotel
          setModelOpen={setModelOpen}
          description={Singlehotels?.description}
        />
      )}
      {Singlehotels ? (
        <div key={hotelId} className="single-hotel py-4">
          <div className="container">
            <h2 className="fw-bold mb-3">{Singlehotels?.title}</h2>
            <div className="small-inf mb-5">
              <span
                onClick={handleShow}
                className=" text-decoration-underline"
                style={{ cursor: "pointer" }}
              >
                {Singlehotels?.reviews?.length} reviews
              </span>
              {Singlehotels?.includeBreacfast && (
                <span className="ms-3" style={{ color: "rgb(108 100 100)" }}>
                  <i className="bi bi-window-plus"></i> Breakfast included
                </span>
              )}
              <span
                className=" text-decoration-underline ms-3"
                style={{ cursor: "pointer" }}
              >
                {Singlehotels?.distance}
              </span>
            </div>
            <div className="row pe-md-5 ps-md-5 images">
              <div className="col-12 col-md-6">
                {Singlehotels &&
                  Singlehotels.images &&
                  Singlehotels.images.length > 0 && (
                    <img
                      style={{ cursor: "pointer" }}
                      className="lone-image img-fluid"
                      src={Singlehotels?.images[0] && Singlehotels?.images[0]}
                      alt=""
                    />
                  )}
              </div>
              <div className="col-6 d-none d-md-flex">
                <div className="row">
                  {Singlehotels?.images?.slice(1, 5).map((image, index) => (
                    <div className="col-6 con-images">
                      <img
                        style={{ cursor: "pointer" }}
                        className={
                          index === 1
                            ? "second-image img-fluid other-images h-auto"
                            : "img-fluid other-images h-auto" && index === 3
                            ? "forth-image img-fluid other-images h-auto"
                            : "img-fluid other-images h-auto"
                        }
                        src={image}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row m-0 w-100 mt-4">
              <div className="col-12 col-md-8">
                <h3 className="mb-2 text-start">{Singlehotels?.title}</h3>
                <div
                  className="bed-guests"
                  style={{
                    borderBottom: "1px solid #777f",
                    paddingBottom: "20px",
                  }}
                >
                  <span className=" me-3 fs-6 fw-normal">
                    {Singlehotels?.maxGuests} guests .
                  </span>
                  <span className="fs-6 fw-normal">
                    {Singlehotels?.bed} bed .
                  </span>
                  <span className="fs-6 ms-3 fw-normal">
                    {Singlehotels?.rooms} rooms avilable .
                  </span>
                </div>
                <div className="description">
                  <p className="mt-4">
                    {Singlehotels?.description?.slice(0, 454)}...
                  </p>
                  <div
                    className="show-more pb-4"
                    style={{
                      borderBottom: "1px solid #777f",
                    }}
                  >
                    <span
                      className=" fw-bold text-decoration-underline"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setModelOpen(true)}
                    >
                      show more
                    </span>
                  </div>
                  <div
                    className="place-offer pt-4 pb-2"
                    style={{
                      borderBottom: "1px solid #777f",
                    }}
                  >
                    <h3 className="mb-4 fw-bold text-start">
                      What this place offers
                    </h3>
                    {Singlehotels?.features?.map((feature) => (
                      <div className="feature mb-3">
                        <h5>{feature}</h5>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="review-section pt-4">
                  <h3 className="text-start">
                    {Singlehotels?.reviews?.length} reviews{" "}
                    <span
                      className="ms-3 text-decoration-underline"
                      style={{
                        color: "rgb(108 100 100)",
                        cursor: "pointer",
                        fontSize: "17px",
                      }}
                      onClick={handleShow}
                    >
                      show all reviews
                    </span>
                  </h3>
                  <div className="row w-100 mt-4 align-items-center">
                    {Singlehotels?.reviews?.slice(0, 5).map((review) => (
                      <div className="col-12 review-div">
                        <div className="user-info-review">
                          <div className="child div-image-review">
                            <Link to={`/profile/${review?.owner?._id}`}>
                              <img
                                className="image-user-review img-fluid"
                                src={review?.owner?.userImage.url}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="child">
                            <Link
                              style={{ color: "black", textDecoration: "none" }}
                              to={`/profile/${review?.owner?._id}`}
                              className="d-block text-capitalize"
                            >
                              {review?.owner?.username}
                            </Link>
                            <span className="span-time">
                              <Moment className="me-2" fromNow ago>
                                {review?.date}
                              </Moment>
                              ago
                            </span>
                          </div>
                        </div>
                        <p className="des-review">
                          {review?.title.slice(0, 400)}...
                        </p>
                        <span
                          className=" fw-bold text-decoration-underline"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setReview(review?.title);
                            setOpenReview(true);
                          }}
                        >
                          show more
                        </span>
                        {user?.id === review?.owner?._id && (
                          <span
                            className=" fw-bold text-decoration-underline ms-3"
                            style={{
                              cursor: "pointer",
                              color: "var(--red-color)",
                            }}
                            onClick={() => {
                              dispatch(
                                setDeleteReviewApiCall(
                                  Singlehotels?._id,
                                  review?._id
                                )
                              );
                            }}
                          >
                            delete review
                          </span>
                        )}
                      </div>
                    ))}
                    {Singlehotels?.reviews?.length > 0 && (
                      <button
                        className="all-review-show"
                        variant="primary"
                        onClick={handleShow}
                      >
                        show all reviews
                      </button>
                    )}
                    {user && (
                      <span
                        onClick={() => setModelOpenAddReview(true)}
                        className="add-review-btn"
                        variant="primary"
                        style={{ cursor: "pointer" }}
                      >
                        Add review
                      </span>
                    )}
                    <Offcanvas show={show} onHide={handleClose}>
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>All reviews</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <div className="row w-100 mt-4 m-0 align-items-center">
                          {Singlehotels?.reviews?.map((review) => (
                            <div className="col-12 review-div">
                              <div className="user-info-review">
                                <div className="child div-image-review">
                                  <Link to={`/profile/${review?.owner?._id}`}>
                                    <img
                                      className="image-user-review img-fluid"
                                      src={review?.owner?.userImage.url}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="child">
                                  <Link
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                    to={`/profile/${review?.owner?._id}`}
                                    className="d-block text-capitalize"
                                  >
                                    {review?.owner?.username}
                                  </Link>
                                  <span className="span-time">
                                    <Moment className="me-2" fromNow ago>
                                      {review?.date}
                                    </Moment>
                                    ago
                                  </span>
                                </div>
                              </div>
                              <p className="des-review">{review?.title}</p>
                            </div>
                          ))}
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                </div>
              </div>
              {!user?.isHotelOwner && (
                <div className="col-12 col-md-4 mt-4 mt-md-0">
                  <div className="card-booking">
                    <div className="price-review mb-4 d-flex align-items-center justify-content-between pe-2 ps-2">
                      <div className="child price">
                        ${Singlehotels?.price} night
                      </div>
                      <div className="child review">
                        {Singlehotels?.reviews?.length} reviews
                      </div>
                    </div>
                    <div className="form-div">
                      <form onSubmit={formHandlerSubmit}>
                        <div className="row">
                          <div className="col-6 check-in-form position-relative pe-0">
                            <label
                              htmlFor="check-in"
                              className="form-label-card text-uppercase fw-bold checkin-label"
                            >
                              Check-in
                            </label>
                            <input
                              className="checkin-input w-100"
                              type="date"
                              id="check-in"
                              onChange={(e) => setCheckIn(e.target.value)}
                              min={today}
                            />
                          </div>
                          <div className="col-6 check-in-form position-relative ps-0">
                            <label
                              htmlFor="check-out"
                              className="form-label-card text-uppercase fw-bold checkout-label"
                            >
                              Check-out
                            </label>
                            <input
                              className="checkin-input w-100"
                              type="date"
                              id="check-out"
                              onChange={(e) => setCheckOut(e.target.value)}
                              min={today}
                              minLength={checkIn}
                            />
                          </div>
                          <div className="col-12">
                            <Dropdown className="dropdown">
                              <Dropdown.Toggle
                                id="dropdown-basic"
                                className=" w-100 text-start"
                              >
                                <span className=" d-block text-uppercase">
                                  gusts
                                </span>
                                {gusts} gusts, {rooms} rooms
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="pe-3 ps-3 py-2 w-100">
                                <div className="parent d-flex align-content-center justify-content-between">
                                  <div className="child">gusts</div>
                                  <div className="child">
                                    <button
                                      style={{
                                        padding: "5px",
                                        fontSize: "15px",
                                        border: "1px solid #777",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                      }}
                                      disabled={gusts === 1 ? true : false}
                                      onClick={(e) => {
                                        setGusts(gusts - 1);
                                        e.preventDefault();
                                      }}
                                    >
                                      -
                                    </button>
                                    <span
                                      style={{
                                        padding: "5px",
                                        fontSize: "15px",
                                        border: "1px solid #777",
                                        borderRadius: "3px",
                                        margin: "0px 5px",
                                      }}
                                    >
                                      {gusts}
                                    </span>
                                    <button
                                      style={{
                                        padding: "5px",
                                        fontSize: "15px",
                                        border: "1px solid #777",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) => {
                                        setGusts(1 + gusts);
                                        e.preventDefault();
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="parent d-flex align-content-center justify-content-between">
                                  <div className="child">rooms</div>
                                  <div className="child">
                                    <button
                                      style={{
                                        padding: "5px",
                                        fontSize: "15px",
                                        border: "1px solid #777",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                      }}
                                      disabled={
                                        rooms === 1
                                          ? true
                                          : false && Singlehotels?.rooms === 0
                                          ? true
                                          : false
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setRooms(rooms - 1);
                                      }}
                                    >
                                      -
                                    </button>
                                    <span
                                      style={{
                                        padding: "5px",
                                        fontSize: "15px",
                                        border: "1px solid #777",
                                        borderRadius: "3px",
                                        margin: "0px 5px",
                                      }}
                                    >
                                      {rooms}
                                    </span>
                                    <button
                                      style={{
                                        padding: "5px",
                                        fontSize: "15px",
                                        border: "1px solid #777",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                      }}
                                      disabled={
                                        rooms === Singlehotels?.rooms
                                          ? true
                                          : false && Singlehotels?.rooms === 0
                                          ? true
                                          : false
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setRooms(1 + rooms);
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <button
                          disabled={
                            Singlehotels?.rooms === 0
                              ? true
                              : false && Singlehotels?.rooms < 0
                              ? true
                              : false || user !== null
                              ? false
                              : true
                          }
                          type="submit"
                          className={
                            Singlehotels?.rooms === 0 || !user
                              ? "not-allowed book-btn"
                              : "book-btn"
                          }
                        >
                          Book
                        </button>
                        {Singlehotels?.rooms === 0 && (
                          <p className="mt-2 text-center">
                            There are no rooms avilable
                          </p>
                        )}
                        {!user && (
                          <p className="mt-2 text-center">You have to signup</p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>loading</h1>
        </>
      )}
      {openReview && (
        <ModelShowReview setOpenReview={setOpenReview} reviewDes={reviewDes} />
      )}
      {modelOpenAddReview && (
        <ModelAddReview setModelOpenAddReview={setModelOpenAddReview} />
      )}
    </>
  );
};

export default SingleHotel;
