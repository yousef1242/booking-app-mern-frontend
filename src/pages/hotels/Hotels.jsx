import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHotelSearchApiCall } from "../../redux/apiCalls/hotelApiCall";
import HotelsHome from "../../components/hotelsHome/HotelsHome";
import "./hotel.css";
import imgErrSearch from "../../images/File searching-rafiki.png";

const HotelFilterPage = () => {
  const { hotelsSearch } = useSelector((state) => state.hotels);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    dispatch(setHotelSearchApiCall(searchParams.get("search")));
  }, [searchParams]);
  return (
    <>
      <div
        className={hotelsSearch?.length === 0 ? "search-hotels py-5" : "py-5"}
      >
        <div className="container">
          <h2 className="fw-bold">
            Searched for : {searchParams.get("search")}
          </h2>
        </div>
        <div
          className={
            hotelsSearch?.length === 0
              ? "con-hotels container h-100"
              : "container"
          }
        >
          {hotelsSearch?.length !== 0 ? (
            <HotelsHome hotels={hotelsSearch} />
          ) : (
            <>
              <img src={imgErrSearch} alt="" />
              <h2>Ups!... no results found</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HotelFilterPage;
