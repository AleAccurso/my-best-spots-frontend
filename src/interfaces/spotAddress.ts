export interface SpotAddress {
  street: string;
  street_number: number;
  postal_code: number;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
}

export interface ISearchAddressProps {
  onSelectAddress: (spotAddress: SpotAddress) => void;
  defaultValue: string;
}
