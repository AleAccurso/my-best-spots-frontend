import { GetAvailableCountriesAction } from './../actions/filter';
import { IFilterConfig, IFiltersState } from "@/src/interfaces/filter";
import { FilterAction } from "../actions/filter";
import { FilterActionType } from "../actionTypes/filter";
import { ICategory, ICategoryCheckboxOption } from "@/interfaces/category";
import { IRegion, IRegionCheckboxOption } from '@/src/interfaces/region';
import { allCategoriesKey, allRegionsKey, defaultCountry } from '@/src/constants';

const categories: ICategory[] = [
  { category_key: "cafe-bar", name: "Cafe - Bar" },
  { category_key: "gas-station", name: "Gas Station" },
  { category_key: "hosting", name: "Hosting" },
  { category_key: "leisure", name: "Leisure" },
  { category_key: "medical", name: "Medical" },
  { category_key: "private-beach", name: "Private Beach" },
  { category_key: "producer", name: "Producer" },
  { category_key: "public-beach", name: "Public Beach" },
  { category_key: "religious-site", name: "Religious Site" },
  { category_key: "restaurant", name: "Restaurant" },
  { category_key: "shop", name: "Shop" },
  { category_key: "thermal", name: "Thermal" },
  { category_key: "tourism", name: "Tourism" },
];

const countries = ["Belgium", "France", "Switzerland", "Italy"];

const regions: IRegion[] = [
  { region_key: "abruzzo", name: "Abruzzo" },
  { region_key: "basilicata", name: "Basilicata" },
  { region_key: "calabria", name: "Calabria" },
  { region_key: "campania", name: "Campania" },
  { region_key: "emilia_romagna", name: "Emilia-Romagna" },
  { region_key: "friuli_venezia_giulia", name: "Friuli-Venezia Giulia" },
  { region_key: "lazio", name: "Lazio" },
  { region_key: "liguria", name: "Liguria" },
  { region_key: "lombardia", name: "Lombardia" },
  { region_key: "marche", name: "Marche" },
  { region_key: "molise", name: "Molise" },
  { region_key: "piemonte", name: "Piemonte" },
  { region_key: "puglia", name: "Puglia" },
  { region_key: "sardinia", name: "Sardinia" },
  { region_key: "sicilia", name: "Sicilia" },
  { region_key: "trentino_alto_adige", name: "Trentino Alto Adige" },
  { region_key: "toscana", name: "Toscana" },
  { region_key: "umbria", name: "Umbria" },
  { region_key: "valle_aosta", name: "Valle d'Aosta" },
  { region_key: "veneto", name: "Veneto" },
];

const categoryCheckboxesConfig: ICategoryCheckboxOption[] = [
  { category_key: allCategoriesKey, value: true },
];

categories.map((category) => {
  const categoryCheckboxOption: ICategoryCheckboxOption = {
    category_key: category.category_key,
    value: false,
  };
  categoryCheckboxesConfig.push(categoryCheckboxOption);
});

const regionCheckboxesConfig: IRegionCheckboxOption[] = [
  { region_key: allRegionsKey, value: true },
];

regions.map((region) => {
  const regionCheckboxOption: IRegionCheckboxOption = {
    region_key: region.region_key,
    value: false,
  };
  regionCheckboxesConfig.push(regionCheckboxOption);
});

const initialState: IFiltersState = {
  categories: {
    availableCategories: categories,
    checkboxesConfig: categoryCheckboxesConfig,
  },
  countries: {
    availableCountries: countries,
    selectedCountry: defaultCountry,
  },
  regions: {
    availableRegions: regions,
    checkboxesConfig: regionCheckboxesConfig,
  },
};

const filtersReducer = (
  state: IFiltersState = initialState,
  action: FilterAction
) => {
  switch (action.type) {
    case FilterActionType.GETFILTERSCONFIG: {
      return state;
    }
    case FilterActionType.GETAVAILABLECATEGORIES: {
      return state.categories.availableCategories;
    }
    case FilterActionType.GETAVAILABLECOUNTRIES: {
      return state.countries.availableCountries;
    }
    case FilterActionType.GETAVAILABLEREGIONS: {
      return state.regions.availableRegions;
    }
    case FilterActionType.UPDATEFILTERCONFIG: {
      return state;
    }
    default:
      return state;
  }
};

export default filtersReducer;