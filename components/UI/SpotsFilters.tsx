import CategoryFilter from "./CategoryFilter";
import CountryFilter from "./CountryFilter";
// import RegionFilter from "./RegionFilter";

const SpotsFilters = () => {

  return (
    <div className="spotsFilters inline-flex z-10 place-content-between">
      <CategoryFilter />
      <div className="ml-16 mr-20">
        <CountryFilter />
      </div>
      {/* {selectedCountry != "Country" && (
        <RegionFilter />
      )} */}
    </div>
  );
};

export default SpotsFilters;
