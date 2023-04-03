import { IFilterConfig, IFiltersProps } from "@/src/interfaces/filter";
import CategoryFilter from "./CategoryFilter";
import CountryFilter from "./CountryFilter";
// import RegionFilter from "./RegionFilter";
import { ChangeEvent, useState } from "react";
import { defaultCountry } from "@/src/constants";



const SpotsFilters = (props: IFiltersProps) => {

  const { filtersData } = props;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const setCountryFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="spotsFilters inline-flex z-10 place-content-between">
      <CategoryFilter filterData={filtersData.categories} />
      <div className="ml-16 mr-20">
        <CountryFilter
          availableCountries={filtersData.countries.availableCountries}
          setCountryFilter={setCountryFilter}
        />
      </div>
      {/* {selectedCountry != "Country" && (
        <RegionFilter filterData={filtersData.regions} />
      )} */}
    </div>
  );
};

export default SpotsFilters;
