import CategoryFilter from "./CategoryFilter";
import CountryFilter from "./CountryFilter";
import RegionFilter from "./RegionFilter";

import { categories } from "@/src/categories";
import { ChangeEvent, useEffect, useState } from "react";

const countries = ["Belgium", "France", "Switzerland", "Italy"];

export const defaultCountry = "Country";

const regions = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardinia",
  "Sicilia",
  "Trentino Alto Adige",
  "Toscana",
  "Umbria",
  "Valle d'Aosta",
  "Veneto",
];

const SpotsFilters = () => {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const setCountryFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };
  
  return (
    <div className="spotsFilters inline-flex z-10 place-content-between">
      <CategoryFilter categories={categories} />
      <div className="ml-16 mr-20">
        <CountryFilter
          countries={countries}
          setCountryFilter={setCountryFilter}
        />
      </div>
      { selectedCountry != "Country" && <RegionFilter regions={regions} /> }
    </div>
  );
};

export default SpotsFilters;
