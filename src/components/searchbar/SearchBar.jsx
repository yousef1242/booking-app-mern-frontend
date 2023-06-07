import "./searchBar.css";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ search: searchValue });
    navigate(`/hotels?search=${searchValue}`);
  };

  return (
    <div className="search-bar">
      <div className="container pe-md-5 ps-md-5">
        <form onSubmit={handleSearch}>
          <div className="row w-100">
            <div className="col-8 col-md-9">
              <input
                type="text"
                placeholder="place,hotel name,distance,country"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
            <div className="col-4 col-md-3">
             <button type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;