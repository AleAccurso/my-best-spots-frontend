import { ChangeEvent } from "react";

export interface ICountryFilterProps {
  availableCountries: string[];
  setCountryFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
}
