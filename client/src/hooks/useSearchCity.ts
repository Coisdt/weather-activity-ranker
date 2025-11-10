import { useState } from "react";

export function useSearchCity() {
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = (city: string) => {
    setSearchCity(city);
  };

  return {
    searchCity,
    handleSearch,
  };
}
