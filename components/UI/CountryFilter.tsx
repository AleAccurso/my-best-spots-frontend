import { defaultCountry } from "@/src/constants";
import { CombinedState } from "@/src/interfaces/store";
import { actionCreators } from "@/src/store";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const CountryFilter = () => {
  const availableCountries = useSelector(
    (state: CombinedState) => state.filters.countries.availableCountries
  );

  const selectedCountry = useSelector(
    (state: CombinedState) => state.filters.countries.selectedCountry
  );

  const dispatch = useDispatch();

  const { setSelectedCountry } = bindActionCreators(actionCreators, dispatch)

  return (
    <div className="countryFilter relative">
      <select
        id="countries"
        className="text-base w-full rounded-md bg-mylightgrey border-none border-transparent focus:border-transparent focus:ring-0"
        onChange={(e) => setSelectedCountry(e.target.value)}
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
