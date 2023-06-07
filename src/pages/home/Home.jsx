import { useEffect, useState } from "react";
import FrontInHome from "../../components/frontpage/Front";
import { useSelector, useDispatch } from "react-redux";
import { setHotelApiCall } from "../../redux/apiCalls/hotelApiCall";
import HotelsHome from "../../components/hotelsHome/HotelsHome";
import SecondPartHomePage from "../../components/secondPartHomePage/SecondPartHomePage";

const HomePage = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotels);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(setHotelApiCall()).then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      <FrontInHome />
      <SecondPartHomePage/>
      <h1 className=" text-center mt-5 mb-5 fw-bold">All hotels</h1>
      <HotelsHome hotels={hotels} loading={loading} />
    </>
  );
};

export default HomePage;
