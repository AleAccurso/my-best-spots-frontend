import { defaultCountry } from "@/src/constants";
import { ICountryFilterProps } from "@/src/interfaces/country";

const CountryFilter = ({
  availableCountries,
  setCountryFilter,
}: ICountryFilterProps) => {
  return (
    <div className="countryFilter relative">
      <select
        id="countries"
        className="text-base w-full rounded-md bg-mylightgrey border-none border-transparent focus:border-transparent focus:ring-0"
        onChange={(e) => setCountryFilter(e)}
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
