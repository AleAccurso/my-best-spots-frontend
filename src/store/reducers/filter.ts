import { IFiltersState } from "@/src/interfaces/filter";
import { ICategory, ICategoryCheckboxOption } from "@/interfaces/category";
import { IRegion, IRegionCheckboxOption } from "@/src/interfaces/region";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filtersName } from "@/src/enums/filters";
import axios from "axios";
import {
  allCategoriesKey,
  allRegionsKey,
  defaultCountry,
} from "@/src/constants";

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

const initialState: IFiltersState = {
  categories: {
    loading: false,
    availableCategories: [],
    checkboxesConfig: [],
  },
  countries: {
    loading: false,
    availableCountries: [],
    selectedCountry: "",
  },
  regions: {
    loading: false,
    availableRegions: [],
    checkboxesConfig: [],
  },
};

const fetchAvailableCategories = createAsyncThunk(
  "fetchAvailableCategories",
  async (data, { rejectWithValue }) => {
    try {
      // const { data } = await axios.get<ICategory[]>("");
      return categories;
    } catch (error: unknown) {
      rejectWithValue(error);
    }
  }
);

const fetchAvailableCountries = createAsyncThunk(
  "fetchAvailableCountries",
  async (data, { rejectWithValue }) => {
    try {
      // const { data } = await axios.get<ICategory[]>("");
      return countries;
    } catch (error: unknown) {
      rejectWithValue(error);
    }
  }
);

const fetchAvailableRegions = createAsyncThunk(
  "fetchAvailableRegions",
  async (data, { rejectWithValue }) => {
    try {
      // const { data } = await axios.get<ICategory[]>("");
      return regions;
    } catch (error: unknown) {
      rejectWithValue(error);
    }
  }
);

const filtersSlice = createSlice({
  name: "filtersReducer",
  initialState,
  reducers: {
    resetFilterConfig: (state, action: PayloadAction<{ filter: string }>) => {
      switch (action.payload.filter) {
        case filtersName.CATEGORY: {
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

          state.categories.checkboxesConfig = categoryCheckboxesConfig;
        }
        case filtersName.REGION: {
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
          state.regions.checkboxesConfig = regionCheckboxesConfig;
        }
        case filtersName.COUNTRY: {
          state.countries.selectedCountry = defaultCountry;
        }
      }
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.countries.selectedCountry = action.payload;
    },
    updateCheckboxStatus: (
      state,
      action: PayloadAction<{ filter: string; key: string; value: boolean }>
    ) => {
      switch (action.payload.filter) {
        case filtersName.CATEGORY: {
          let catConfig = state.categories.checkboxesConfig.find(
            (catConfig) => catConfig.category_key === action.payload.key
          );
          if (catConfig) {
            catConfig.value = action.payload.value;
          }
        }
        case filtersName.REGION: {
          let regionConfig = state.regions.checkboxesConfig.find(
            (regConfig) => regConfig.region_key === action.payload.key
          );
          if (regionConfig) {
            regionConfig.value = action.payload.value;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableCategories.pending, (state) => {
      state.categories.loading = true;
    });
    builder.addCase(fetchAvailableCategories.fulfilled, (state, action) => {
      if (action.payload) {
        state.categories.availableCategories = action.payload;
      }
      state.categories.loading = false;
    });
    builder.addCase(fetchAvailableCountries.pending, (state) => {
      state.countries.loading = true;
    });
    builder.addCase(fetchAvailableCountries.fulfilled, (state, action) => {
      if (action.payload) {
        state.countries.availableCountries = action.payload;
      }
      state.countries.loading = false;
    });
    builder.addCase(fetchAvailableRegions.pending, (state) => {
      state.regions.loading = true;
    });
    builder.addCase(fetchAvailableRegions.fulfilled, (state, action) => {
      if (action.payload) {
        state.regions.availableRegions = action.payload;
      }
      state.regions.loading = false;
    });
  },
});

export const { resetFilterConfig, setSelectedCountry, updateCheckboxStatus } =
  filtersSlice.actions;
export { fetchAvailableCategories, fetchAvailableCountries, fetchAvailableRegions };
export default filtersSlice.reducer;
