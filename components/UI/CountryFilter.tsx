import { defaultCountry } from "@/src/constants";
import { CombinedState } from "@/src/interfaces/store";
import {
  fetchAvailableRegions,
  setSelectedCountry,
} from "@/src/store/reducers/filter";
import { fetchAvailableSpots } from "@/src/store/reducers/spot";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CountryFilter = () => {
  const filterConfig = useSelector((state: CombinedState) => state.filters);

  const { availableCountries, selectedCountry } = filterConfig.countries;

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(setSelectedCountry({ country: defaultCountry }));
  }, [availableCountries, dispatch]);

  useEffect(() => {
    dispatch(fetchAvailableRegions(selectedCountry));
    dispatch(fetchAvailableSpots(filterConfig));
  }, [selectedCountry, filterConfig, dispatch]);

  return (
    <div className="countryFilter relative">
      <select
        id="countries"
        className="text-base w-full rounded-md bg-mylightgrey border-none border-transparent focus:border-transparent focus:ring-0"
        onChange={(e) =>
          dispatch(setSelectedCountry({ country: e.target.value }))
        }
        value={selectedCountry}
      >
        <option defaultValue={defaultCountry}>{defaultCountry}</option>
        {availableCountries.map((country, key) => {
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
