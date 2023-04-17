import { IFiltersState } from "@/src/interfaces/filter";
import {
  Category,
  CategoryList,
  ICategoryCheckboxOption,
} from "@/interfaces/category";
import {
  IRegionCheckboxOption,
  Region,
  RegionList,
} from "@/src/interfaces/region";
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
import { Country, countries } from "@/src/enums/countries";

export const categories = new CategoryList();

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

export const northWest = new RegionList();

northWest.addRegion(
  new Region({
    region_key: "valle_aosta",
    region_name: "Valle d'Aosta",
  })
);

northWest.addRegion(
  new Region({ region_key: "liguria", region_name: "Liguria" })
);
northWest.addRegion(
  new Region({ region_key: "lombardia", region_name: "Lombardia" })
);
northWest.addRegion(
  new Region({ region_key: "piemonte", region_name: "Piemonte" })
);

export const northEast = new RegionList();
northEast.addRegion(
  new Region({ region_key: "emilia_romagna", region_name: "Emilia-Romagna" })
);
northEast.addRegion(
  new Region({
    region_key: "friuli_venezia_giulia",
    region_name: "Friuli-Venezia Giulia",
  })
);
northEast.addRegion(
  new Region({
    region_key: "trentino_alto_adige",
    region_name: "Trentino Alto Adige",
  })
);
northEast.addRegion(
  new Region({ region_key: "veneto", region_name: "Veneto" })
);

export const center = new RegionList();
center.addRegion(new Region({ region_key: "toscana", region_name: "Toscana" }));
center.addRegion(new Region({ region_key: "umbria", region_name: "Umbria" }));
center.addRegion(new Region({ region_key: "marche", region_name: "Marche" }));
center.addRegion(new Region({ region_key: "lazio", region_name: "Lazio" }));

export const south = new RegionList();
south.addRegion(new Region({ region_key: "abruzzo", region_name: "Abruzzo" }));
south.addRegion(new Region({ region_key: "molise", region_name: "Molise" }));
south.addRegion(
  new Region({ region_key: "campania", region_name: "Campania" })
);
south.addRegion(new Region({ region_key: "puglia", region_name: "Puglia" }));
south.addRegion(
  new Region({ region_key: "basilicata", region_name: "Basilicata" })
);
south.addRegion(
  new Region({ region_key: "calabria", region_name: "Calabria" })
);

export const islands = new RegionList();
islands.addRegion(
  new Region({ region_key: "sardinia", region_name: "Sardinia" })
);
islands.addRegion(
  new Region({ region_key: "sicilia", region_name: "Sicilia" })
);

const initialState: IFiltersState = {
  categories: {
    availableCategories: new CategoryList(),
    checkboxesConfig: [],
  },
  countries: {
    availableCountries: [],
    selectedCountry: defaultCountry,
  },
  regions: {
    availableRegions: new RegionList(),
    checkboxesConfig: [],
  },
};

const fetchAvailableCategories = createAsyncThunk(
  "fetchAvailableCategories",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<CategoryList>("");
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
  async (country:string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<RegionList>("");
      switch (country) {
        case Country.IT_NORTH_EAST: {
          return northEast;
        }
        case Country.IT_NORTH_WEST: {
          return northWest;
        }
        case Country.IT_CENTER: {
          return center;
        }
        case Country.IT_SOUTH: {
          return south;
        }
        case Country.IT_ISLANDS: {
          return islands;
        }
      }
    } catch (error: unknown) {
      rejectWithValue(error);
      switch (country) {
        case Country.IT_NORTH_EAST: {
          return northEast;
        }
        case Country.IT_NORTH_WEST: {
          return northWest;
        }
        case Country.IT_CENTER: {
          return center;
        }
        case Country.IT_SOUTH: {
          return south;
        }
        case Country.IT_ISLANDS: {
          return islands;
        }
      }
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
              isChecked: true,
            },
          ];

          state.categories.availableCategories
            .getList()
            .map((availableCategory) => {
              const categoryCheckboxOption: ICategoryCheckboxOption = {
                category: availableCategory,
                isChecked: false,
              };
              categoryCheckboxesConfig.push(categoryCheckboxOption);
            });

          state.categories.checkboxesConfig = categoryCheckboxesConfig;
        }

        case filtersName.REGION: {
          const regionCheckboxesConfig: IRegionCheckboxOption[] = [
            {
              region: new Region({
                region_name: allRegionsName,
                region_key: allRegionsKey,
              }),
              isChecked: true,
            },
          ];

          state.regions.availableRegions.getList().map((availableRegion) => {
            const regionCheckboxOption: IRegionCheckboxOption = {
              region: availableRegion,
              isChecked: false,
            };
            regionCheckboxesConfig.push(regionCheckboxOption);
          });

          state.regions.checkboxesConfig = regionCheckboxesConfig;
        }
      }
    },
    setSelectedCountry: (state, action: PayloadAction<{ country: string }>) => {
      state.countries.selectedCountry = action.payload.country;
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
            catConfig.isChecked = action.payload.value;
          }
        }
        case filtersName.REGION: {
          let regionConfig = state.regions.checkboxesConfig.find(
            (regConfig) =>
              regConfig.region.getRegionKey() === action.payload.key
          );
          if (regionConfig) {
            regionConfig.isChecked = action.payload.value;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableCategories.fulfilled, (state, action) => {
      if (action.payload && action.payload instanceof CategoryList) {
        state.categories.availableCategories = action.payload;
      }
    });
    builder.addCase(fetchAvailableCountries.fulfilled, (state, action) => {
      if (action.payload) {
        state.countries.availableCountries = action.payload;
      }
    });
    builder.addCase(fetchAvailableRegions.fulfilled, (state, action) => {
      if (action.payload && action.payload instanceof RegionList) {
        state.regions.availableRegions = action.payload;
      }
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
