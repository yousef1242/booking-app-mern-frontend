import "./App.css";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import HomePage from "./pages/home/Home";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/signup/Signup";
import Header from "./components/header/Header";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import HotelFilterPage from "./pages/hotels/Hotels";
import SingleHotel from "./pages/hotelSingle/hotelSingle";
import ProfilePage from "./pages/profile/Profile";
import BookingPage from "./pages/bookingPage/BookingPage";
import LoginOwner from "./pages/loginOwner/LoginOwner";
import SignupOwner from "./pages/SignupOwner/SignupOwner";
import OwnerDashboard from "./pages/ownerDashboard/ownerDashboardHome/OwnerDashboard";
import OwnerBooking from "./pages/ownerDashboard/OwnerBooking/OwnerBooking";
import OwnerHotelDashboard from "./pages/ownerDashboard/OwnerHotelDashboard/OwnerHotelDashboard";
import OwnerDashboardAddHotel from "./pages/ownerDashboard/OwnerDashboardAddHotel/OwnerDashboardAddHotel";
import OwnerUpdateHotelDashboard from "./pages/ownerDashboard/ownerUpdateHotelDashboard/OwnerUpdateHotelDashboard";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/hotel/owner/login"
          element={user ? <Navigate to={"/"} /> : <LoginOwner />}
        />
        <Route
          path="/hotel/owner/signup"
          element={user ? <Navigate to={"/"} /> : <SignupOwner />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <SignupPage />}
        />
        <Route path="/hotels" element={<HotelFilterPage />} />
        <Route path="/hotel/:hotelId" element={<SingleHotel />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route
          path="/my-booking/:userId"
          element={user?.isHotelOwner ? <Navigate to={"/"} /> : <BookingPage />}
        />
        <Route
          path="/owner/dashboard"
          element={
            !user?.isHotelOwner ? <Navigate to={"/"} /> : <OwnerDashboard />
          }
        />
        <Route
          path="/owner/dashboard/bookings"
          element={
            !user?.isHotelOwner ? <Navigate to={"/"} /> : <OwnerBooking />
          }
        />
        <Route
          path="/owner/dashboard/hotel"
          element={
            !user?.isHotelOwner ? (
              <Navigate to={"/"} />
            ) : (
              <OwnerHotelDashboard />
            )
          }
        />
        <Route
          path="/owner/dashboard/add-hotel"
          element={
            !user?.isHotelOwner || OwnerHotelInfo?.length > 0 ? (
              <Navigate to={"/"} />
            ) : (
              <OwnerDashboardAddHotel />
            )
          }
        />
        <Route
          path="/owner/dashboard/hotel/update/:hotelupdateId"
          element={
            !user?.isHotelOwner ? (
              <Navigate to={"/"} />
            ) : (
              <OwnerUpdateHotelDashboard />
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
