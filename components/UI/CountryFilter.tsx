import { useEffect, useState } from "react";

const countries = ["Belgium", "France", "Switzerland", "Italy"];

const CountryFilter = () => {
  const [filter, setFilter] = useState({
    country: "",
  });

  return (
    <div className="countryFilter relative">
      <select
        id="countries"
        className="text-base w-full rounded-md bg-mylightgrey border-none border-transparent focus:border-transparent focus:ring-0"
        onChange={(e: any) =>
          setFilter({
            ...filter,
            country: e.target.value,
          })
        }
        value={filter.country}
      >
        <option defaultValue={""}>Country</option>
        {countries.map((country, key) => {
          return (
            <option key={key} value={country}>
              {country}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CountryFilter;
