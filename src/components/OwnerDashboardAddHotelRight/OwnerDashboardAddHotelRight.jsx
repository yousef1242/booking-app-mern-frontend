import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ownerDashboardAddHotelRight.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setAddHotelApiCall } from "../../redux/apiCalls/hotelApiCall";

const OwnerDashboardAddHotelRight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [breakfast, setBreackfast] = useState();
  const [distance, setDistance] = useState("");
  const [rooms, setRooms] = useState(0);
  const [gusts, setGusts] = useState(0);
  const [bed, setBed] = useState(0);

  const handleFeatureSelection = (event) => {
    const feature = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedFeatures([...selectedFeatures, feature]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    }
  };
  const handleImagesSelection = (event) => {
    const image = event.target.files[0];
    setSelectedImages([...selectedImages, image]);
  };
  const deleteImage = (imageIndex) => {
    const newImages = selectedImages.filter((_, i) => i !== imageIndex);
    setSelectedImages(newImages);
  };
  const formHandlerSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === "") return toast.error("Title is required");
    if (city.trim() === "") return toast.error("City is required");
    if (description.trim() === "")
      return toast.error("Description is required");
    if (description.length < 100)
      return toast.error("Description min 100 word");
    if (country.trim() === "") return toast.error("Country is required");
    if (selectedImages.length === 0) return toast.error("Please choose images");
    if (selectedImages.length < 5) return toast.error("Images min 5");
    if (price === 0) return toast.error("Price is required");
    if (taxes === 0) return toast.error("Taxes is required");
    if (distance.trim() === "") return toast.error("Distance is required");
    if (rooms === 0) return toast.error("Rooms is required");
    if (gusts === 0) return toast.error("Gusts is required");
    if (bed === 0) return toast.error("Bed is required");
    if (selectedFeatures.length === 0)
      return toast.error("Please choose features");
    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("files", selectedImages[i]);
    }
    formData.append("title", title);
    formData.append("city", city);
    formData.append("description", description);
    formData.append("country", country);
    formData.append("price", price);
    formData.append("taxes", taxes);
    formData.append("includeBreacfast", breakfast);
    formData.append("distance", distance);
    formData.append("maxGuests", gusts);
    formData.append("bed", bed);
    formData.append("rooms", rooms);
    formData.append("owner", user?.id);
    for (let feature = 0; feature < selectedFeatures.length; feature++) {
      formData.append("feature", selectedFeatures[feature]);
    }
    setLoading(true);
    dispatch(setAddHotelApiCall(formData)).then(() => {
      navigate("/owner/dashboard");
    });
  };
  return (
    <>
      <div className="col-12 col-md-9 py-md-5 owner-dashboard-add-hotel">
        <div className="container">
          <h2 className="fw-bold mb-5">Create hotel</h2>
          <form onSubmit={formHandlerSubmit} className="row m-0 w-100">
            <div className="form-group col-12 col-md-6">
              <label htmlFor="title">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                placeholder="Title"
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="city">City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="city"
                placeholder="City"
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="country">Country</label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                id="country"
                placeholder="Country"
              />
            </div>
            <div className="upload-image col-12">
              <h4 className="mb-4 fw-bold">Upload images</h4>
              <div className="upload-images-con">
                {selectedImages?.map((image, index) => (
                  <div className="image-upload-div position-relative">
                    {image && (
                      <>
                        <img
                          key={index}
                          className="upload-image-shape"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                        <span
                          className="deleteBtn"
                          onClick={() => deleteImage(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </span>
                      </>
                    )}
                  </div>
                ))}
                <div className="upload-controller">
                  <label htmlFor="file">Upload image</label>
                  <input
                    onChange={handleImagesSelection}
                    type="file"
                    name="file"
                    id="file"
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="price">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                id="price"
                placeholder="Price"
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="taxes">Taxes</label>
              <input
                onChange={(e) => setTaxes(e.target.value)}
                type="number"
                id="taxes"
                placeholder="Taxes"
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="distance">Distance</label>
              <input
                onChange={(e) => setDistance(e.target.value)}
                type="text"
                id="distance"
                placeholder="Distance"
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="rooms">How many rooms</label>
              <input
                onChange={(e) => setRooms(e.target.value)}
                type="number"
                id="rooms"
                placeholder="How many rooms"
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="maxGuests">How many max gusts</label>
              <input
                onChange={(e) => setGusts(e.target.value)}
                type="number"
                id="maxGuests"
                placeholder="How many max gusts"
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="bed">How many Bed</label>
              <input
                onChange={(e) => setBed(e.target.value)}
                type="number"
                id="bed"
                placeholder="How many Bed"
              />
            </div>
            <h4 className="fw-bold mb-4">Features</h4>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("Wifi") ? "selected" : ""
                }`}
              >
                <label htmlFor="wifi">Wifi</label>
                <input
                  type="checkbox"
                  value="Wifi"
                  id="wifi"
                  onChange={handleFeatureSelection}
                  checked={selectedFeatures.includes("Wifi")}
                />
              </div>
            </div>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("Kitchen") ? "selected" : ""
                }`}
              >
                <label htmlFor="Kitchen">Kitchen</label>
                <input
                  type="checkbox"
                  value="Kitchen"
                  id="Kitchen"
                  onChange={handleFeatureSelection}
                  checked={selectedFeatures.includes("Kitchen")}
                />
              </div>
            </div>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("TV") ? "selected" : ""
                }`}
              >
                <label htmlFor="TV">TV</label>
                <input
                  type="checkbox"
                  value="TV"
                  id="TV"
                  onChange={handleFeatureSelection}
                  checked={selectedFeatures.includes("TV")}
                />
              </div>
            </div>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("Pool") ? "selected" : ""
                }`}
              >
                <label htmlFor="Pool">Pool</label>
                <input
                  type="checkbox"
                  value="Pool"
                  id="Pool"
                  onChange={handleFeatureSelection}
                  checked={selectedFeatures.includes("Pool")}
                />
              </div>
            </div>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("Freezer") ? "selected" : ""
                }`}
              >
                <label htmlFor="Freezer">Freezer</label>
                <input
                  type="checkbox"
                  value="Freezer"
                  id="Freezer"
                  onChange={handleFeatureSelection}
                  checked={selectedFeatures.includes("Freezer")}
                />
              </div>
            </div>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("Heating") ? "selected" : ""
                }`}
              >
                <label htmlFor="Heating">Heating</label>
                <input
                  type="checkbox"
                  value="Heating"
                  id="Heating"
                  onChange={handleFeatureSelection}
                  checked={selectedFeatures.includes("Heating")}
                />
              </div>
            </div>
            <div className="feature-checkbox col-12 col-md-4">
              <div
                className={`card ${
                  selectedFeatures.includes("Breakfast") ? "selected" : ""
                }`}
              >
                <label htmlFor="breakfast">Breakfast</label>
                <input
                  type="checkbox"
                  value="Breakfast"
                  id="breakfast"
                  onChange={(e) => {
                    handleFeatureSelection(e);
                    setBreackfast(!breakfast);
                  }}
                  checked={selectedFeatures.includes("Breakfast")}
                />
              </div>
            </div>
            <button
              type="submit"
              className="d-flex align-content-center justify-content-center"
              disabled={loading && true}
            >
              {!loading ? (
                "Add hotel"
              ) : (
                <div class="loader">
                  <div class="bar1"></div>
                  <div class="bar2"></div>
                  <div class="bar3"></div>
                  <div class="bar4"></div>
                  <div class="bar5"></div>
                  <div class="bar6"></div>
                  <div class="bar7"></div>
                  <div class="bar8"></div>
                  <div class="bar9"></div>
                  <div class="bar10"></div>
                  <div class="bar11"></div>
                  <div class="bar12"></div>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OwnerDashboardAddHotelRight;
