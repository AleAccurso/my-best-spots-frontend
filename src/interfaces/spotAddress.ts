export interface SpotAddress {
  street: string;
  street_number: string;
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

export interface SpotAddressDTO {
  id: string;

  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
}