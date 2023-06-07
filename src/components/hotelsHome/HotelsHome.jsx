import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import "./swiper.css"
import { Link, } from "react-router-dom";
import LoadingHotel from "../loading/Loading";

const HotelsHome = ({ hotels, loading }) => {
  return (
    <>
      <div className="hotels" id="booking">
        <div className="container">
          <div className="row ms-0 w-100">
            {!loading ? (
              <>
                {hotels?.map((hotel) => (
                  <Link to={`/hotel/${hotel?._id}`} className="col text-decoration-none mb-4 col-12 col-sm-6 col-md-4 col-lg-3">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {hotel?.images.map((image, index) => (
                        <>
                          <SwiperSlide><img style={{objectFit:"cover",borderRadius:"7px"}} src={image} alt="" /></SwiperSlide>
                        </>
                      ))}
                    </Swiper>
                    <h5 style={{color:"#111"}} className="fw-bold mb-2 mt-4">{hotel?.title}</h5>
                    <h6 style={{color:"#777"}} className=" mb-2 mt-2">{hotel?.city}</h6>
                    <h6 style={{color:"#777"}} className=" mb-2 mt-2">{hotel?.reviews.length} reviews</h6>
                    <h6 style={{color:"#333"}} className=" mb-2 mt-2">${hotel?.price} night</h6>
                  </Link>
                ))}
              </>
            ) : (
              <><LoadingHotel/></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelsHome;
