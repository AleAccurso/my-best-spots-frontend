import CategoryFilter from "./CategoryFilter";
import CountryFilter from "./CountryFilter";
import RegionFilter from "./RegionFilter";

import { allowedCategories } from "@/src/categories";

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
  return (
    <div className="spotsFilters inline-flex z-10 place-content-between">
      <CategoryFilter availableCategories={allowedCategories} />
      <div className="ml-16 mr-20">
        <CountryFilter />
      </div>
      <RegionFilter availableRegions={regions} />
    </div>
  );
};

export default SpotsFilters;
