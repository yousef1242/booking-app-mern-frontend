import { useSelector, useDispatch } from "react-redux";
import "./ownerHotelDashboardRight.css";
import { useEffect, useState } from "react";
import ModelDescriptionHotel from "../modelDescriptionHotel/modelDescriptionHotel";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  setDeleteHotelApiCall,
  setOwnerHotelInfoApiCall,
} from "../../redux/apiCalls/hotelApiCall";

const OwnerHotelDashboardRight = () => {
  const navigate = useNavigate();
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  const { user } = useSelector((state) => state.auth);
  const [description, setDescription] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOwnerHotelInfoApiCall(user?.id));
  }, []);
  const deleteHotelSubmit = () => {
    swal({
      title: "Delete this hotel!",
      text: "Are you sure!",
      icon: "warning",
      button: "delete!",
    }).then((isOk) => {
      if (isOk) {
        dispatch(setDeleteHotelApiCall(OwnerHotelInfo[0]?._id));
        navigate("/owner/dashboard");
      }
    });
  };
  return (
    <>
      <div className="col-12 col-md-9 h-100 owner-dashboard-hotel py-5">
        {OwnerHotelInfo?.length > 0 ? (
          <>
            <div className="container" key={OwnerHotelInfo?._id}>
              <h2 className="hotel-details-text fw-bold mb-5">Hotel details</h2>
              <div className="action-btn mb-5 d-flex align-items-center justify-content-between">
                <button
                  onClick={deleteHotelSubmit}
                  className="delete-hotel-btn"
                >
                  Delete hotel
                </button>
                <Link
                  className="update-hotel-btn"
                  to={`/owner/dashboard/hotel/update/${OwnerHotelInfo[0]?._id}`}
                >
                  Update hotel
                </Link>
              </div>
              {OwnerHotelInfo?.map((hotel) => (
                <div key={hotel?._id} className="hotel-div-details w-100">
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Title</div>
                    <div className="col-6">{hotel?.title}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">City</div>
                    <div className="col-6">{hotel?.city}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Description</div>
                    <div className="col-6">
                      {hotel?.description?.slice(0, 20)}...{" "}
                      <span
                        onClick={() => {
                          setDescription(hotel?.description);
                          setModelOpen(true);
                        }}
                        className="col-6 text-decoration-underline show-more"
                      >
                        show more
                      </span>
                    </div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Reviews</div>
                    <div className="col-6">
                      {hotel?.reviews?.length} reviews
                    </div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Country</div>
                    <div className="col-6">{hotel?.country}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Price</div>
                    <div className="col-6">${hotel?.price}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Taxes</div>
                    <div className="col-6">${hotel?.taxes}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Distance</div>
                    <div className="col-6">{hotel?.distance}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Rooms</div>
                    <div className="col-6">{hotel?.rooms}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Include breakfast</div>
                    <div className="col-6">
                      {hotel?.includeBreacfast ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Max gusts</div>
                    <div className="col-6">{hotel?.maxGuests}</div>
                  </div>
                  <div className="div-detail row w-100 m-0">
                    <div className="col-6">Bed in room</div>
                    <div className="col-6">{hotel?.bed}</div>
                  </div>
                  <div className="div-detail row m-0 w-100">
                    <div className="col-6">Features this place offer</div>
                    <div className="col-6 d-flex align-items-center feature-div-detail-hotel">
                      {hotel?.features?.map((feature) => (
                        <span className="feature-div">{feature}</span>
                      ))}
                    </div>
                  </div>
                  <div className="div-detail row w-100 m-0">
                    <div className="col-6">Images for this place</div>
                    <div className="col-6 d-flex align-items-center">
                      {hotel?.images?.map((image) => (
                        <div className="image-div">
                          <img src={image} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <div className="no-hotel-found">No hotel exist</div>
            </div>
          </>
        )}
      </div>
      {modelOpen && (
        <ModelDescriptionHotel
          description={description}
          setModelOpen={setModelOpen}
        />
      )}
    </>
  );
};

export default OwnerHotelDashboardRight;
