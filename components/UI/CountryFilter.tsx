import { useEffect, useState } from "react";

const countries = ["Belgium", "France", "Swiss", "Italy"];

const CountryFilter = () => {
  const [data, setData] = useState({
    country: "",
  });

  const handleCountryFilter = async (e: any) => {
    e.preventDefault();

    console.log("formData", data);
  };

  useEffect(() => {
    console.log(data);
  });

  return (
    <div className="countryFilter relative">
      <select
        id="countries"
        className="text-base w-full rounded-md bg-mylightgrey border-none border-transparent focus:border-transparent focus:ring-0"
        onChange={(e: any) =>
          setData({
            ...data,
            country: e.target.value,
          })
        }
        value={data.country}
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
