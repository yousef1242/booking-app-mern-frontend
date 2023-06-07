import SearchBar from "../searchbar/SearchBar";
import "./front.css";
import { Link } from "react-router-dom";

const FrontInHome = () => {
  return (
    <>
      <div
        className="front-page w-100 position-relative"
        style={{ marginBottom: "130px" }}
      >
        <div className="container">
          <h1 className="fw-bold mb-2">Your kind of vacation.</h1>
          <h1 className="fw-bold mb-4">Your kind of rental.</h1>
        </div>
        <SearchBar />
      </div>
    </>
  );
};

export default FrontInHome;
