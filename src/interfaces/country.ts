import { ChangeEvent } from "react";

export interface ICountryFilterProps {
  countries: string[];
  setCountryFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
}
