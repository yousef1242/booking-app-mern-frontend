import { useState } from "react";
import "./modelAddReview.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHotelAddReviewApiCall } from "../../redux/apiCalls/hotelApiCall";

const ModelAddReview = ({ setModelOpenAddReview }) => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const [title, setTitleReview] = useState("");
  const formHandlerSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("please write somthing");
    dispatch(
      setHotelAddReviewApiCall(hotelId, {
        title: title,
      })
    );
    setModelOpenAddReview(false);
  };
  return (
    <>
      <div className="model-add-review">
        <div className="model-review">
          <div className="header-model">
            <h3>Add review</h3>
            <i
              onClick={() => setModelOpenAddReview(false)}
              className="bi bi-x"
            ></i>
          </div>
          <form onSubmit={formHandlerSubmit}>
            <label htmlFor="review">Review</label>
            <textarea
              value={title}
              onChange={(e) => setTitleReview(e.target.value)}
              name="review"
              rows={3}
              placeholder="Add review"
            ></textarea>
            <div className="footer text-end mt-4 w-100">
              <button type="submit" className="model-add-review-btn">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModelAddReview;
