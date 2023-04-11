import { defaultCountry } from "@/src/constants";
import { CombinedState } from "@/src/interfaces/store";
import { setSelectedCountry } from "@/src/store/reducers/filter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CountryFilter = () => {
  const { availableCountries, loading} = useSelector(
    (state: CombinedState) => state.filters.countries
  );

  const selectedCountry = useSelector(
    (state: CombinedState) => state.filters.countries.selectedCountry
  );

  const dispatch = useDispatch();

  return (
    <div className="countryFilter relative">
      <select
        id="countries"
        className="text-base w-full rounded-md bg-mylightgrey border-none border-transparent focus:border-transparent focus:ring-0"
        onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
        value={selectedCountry}
      >
        <option defaultValue={defaultCountry}>{defaultCountry}</option>
        {!loading && availableCountries.map((country, key) => {
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
