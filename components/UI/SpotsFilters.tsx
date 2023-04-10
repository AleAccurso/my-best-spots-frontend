import { useSelector } from "react-redux";
import CategoryFilter from "@/UI/CategoryFilter";
import CountryFilter from "@/UI/CountryFilter";
import RegionFilter from "@/UI/RegionFilter";
import { defaultCountry } from "@/src/constants";
import { CombinedState } from "@/src/interfaces/store";

const SpotsFilters = () => {

  const selectedCountry = useSelector(
    (state: CombinedState) => state.filters.countries.selectedCountry
  );

  return (
    <div className="spotsFilters inline-flex z-10 place-content-between">
      <CategoryFilter />
      <div className="ml-16 mr-20">
        <CountryFilter />
      </div>
      {selectedCountry != defaultCountry && (
        <RegionFilter />
      )}
    </div>
  );
};

export default SpotsFilters;
