import { useState } from "react";

const SearchForm = (props: { onSearch: (city: string) => void }) => {
  // const [searchCity, setSearchCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  return (
    <div className="flex justify-center items-center bg-gray-100 h-64 gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSearch(searchCity);
        }}
      >
        <input
          name="searchCity"
          type="text"
          placeholder="Enter a city"
          onChange={(e) => setSearchCity(e.target.value)}
          value={searchCity}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
