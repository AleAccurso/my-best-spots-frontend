export interface IRegion {
  name: string;
  region_key: string;
}
export interface IRegionCheckboxOption {
  region_key: string;
  value: boolean;
}

export interface IRegionFilterProps {
  filterData: {
    availableRegions: IRegion[];
    checkboxesConfig: IRegionCheckboxOption[];
  };
}