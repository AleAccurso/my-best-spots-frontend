import { IFiltersState } from "@/src/interfaces/filter";
import {
  Category,
  CategoryList,
  ICategoryCheckboxOption,
} from "@/interfaces/category";
import { IRegion, IRegionCheckboxOption } from "@/src/interfaces/region";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filtersName } from "@/src/enums/filters";
import axios from "axios";
import {
  allCategoriesKey,
  allCategoriesName,
  allRegionsKey,
  allRegionsName,
  defaultCountry,
} from "@/src/constants";

const categories = new CategoryList();

categories.addCategory(
  new Category({ category_key: "cafe-bar", category_name: "Cafe - Bar" })
);
categories.addCategory(
  new Category({ category_key: "gas-station", category_name: "Gas Station" })
);
categories.addCategory(
  new Category({ category_key: "hosting", category_name: "Hosting" })
);
categories.addCategory(
  new Category({ category_key: "leisure", category_name: "Leisure" })
);
categories.addCategory(
  new Category({ category_key: "medical", category_name: "Medical" })
);
categories.addCategory(
  new Category({
    category_key: "private-beach",
    category_name: "Private Beach",
  })
);
categories.addCategory(
  new Category({ category_key: "producer", category_name: "Producer" })
);
categories.addCategory(
  new Category({ category_key: "public-beach", category_name: "Public Beach" })
);
categories.addCategory(
  new Category({
    category_key: "religious-site",
    category_name: "Religious Site",
  })
);
categories.addCategory(
  new Category({ category_key: "restaurant", category_name: "Restaurant" })
);
categories.addCategory(
  new Category({ category_key: "shop", category_name: "Shop" })
);
categories.addCategory(
  new Category({ category_key: "thermal", category_name: "Thermal" })
);
categories.addCategory(
  new Category({ category_key: "tourism", category_name: "Tourism" })
);

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
    availableCategories: new CategoryList(),
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
      const { data } = await axios.get<Category[]>("");
      return categories;
    } catch (error: unknown) {
      rejectWithValue(error);
      return categories;
    }
  }
);

const fetchAvailableCountries = createAsyncThunk(
  "fetchAvailableCountries",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<string[]>("");
      return countries;
    } catch (error: unknown) {
      rejectWithValue(error);
      return countries;
    }
  }
);

const fetchAvailableRegions = createAsyncThunk(
  "fetchAvailableRegions",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IRegion[]>("");
      return regions;
    } catch (error: unknown) {
      rejectWithValue(error);
      return regions;
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
            {
              category: new Category({
                category_name: allCategoriesName,
                category_key: allCategoriesKey,
              }),
              value: true,
            },
          ];
          
          console.log("🚀 ~ resetFilter ~ availableCategories:", state.categories.availableCategories);

          state.categories.availableCategories.getList().map((availableCategory) => {
            const categoryCheckboxOption: ICategoryCheckboxOption = {
              category: availableCategory,
              value: false,
            };
            categoryCheckboxesConfig.push(categoryCheckboxOption);
          });

          state.categories.checkboxesConfig = categoryCheckboxesConfig;
        }
        case filtersName.REGION: {
          const regionCheckboxesConfig: IRegionCheckboxOption[] = [
            {
              region_key: allRegionsKey,
              region_name: allRegionsName,
              value: true,
            },
          ];

          state.regions.availableRegions.map((region) => {
            const regionCheckboxOption: IRegionCheckboxOption = {
              region_key: region.region_key,
              region_name: region.name,
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
            (catConfig) =>
              catConfig.category.getCategoryKey() === action.payload.key
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
      if (action.payload && action.payload instanceof CategoryList) {
        state.categories.availableCategories = action.payload;
        console.log("🚀 ~ extra-reducer ~ availableCategories:", state.categories.availableCategories);
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
export {
  fetchAvailableCategories,
  fetchAvailableCountries,
  fetchAvailableRegions,
};
export default filtersSlice.reducer;
