import { useState } from "react";

const SearchForm = (props: { onSearch: (city: string) => void }) => {
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCity = searchCity.trim();

    if (!trimmedCity) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    props.onSearch(trimmedCity);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 h-64 gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            name="searchCity"
            type="text"
            placeholder="Enter a city"
            onChange={(e) => {
              setSearchCity(e.target.value);
              if (error) setError("");
            }}
            value={searchCity}
            className={error ? "border-red-500" : ""}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default SearchForm;
