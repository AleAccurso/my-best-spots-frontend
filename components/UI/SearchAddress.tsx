import { ISearchAddressProps, SpotAddress } from "@/src/interfaces/spotAddress";
import { ChangeEvent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries: Libraries = ["places"];

export function SearchAddress({
  onSelectAddress,
  defaultValue,
}: ISearchAddressProps) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
    />
  );
}

function ReadySearchBox({
  onSelectAddress,
  defaultValue,
}: ISearchAddressProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSelectAddress({} as SpotAddress);
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });

      const addressComponents = results[0].address_components;

      const street = addressComponents.filter(
        (component: any) => component.types.indexOf("route") > -1
      )[0].long_name;

      const streetNumber = addressComponents.filter(
        (component: any) => component.types.indexOf("street_number") > -1
      )[0].long_name;

      const postalCode = addressComponents.filter(
        (component: any) => component.types.indexOf("postal_code") > -1
      )[0].long_name;

      const city = addressComponents.filter(
        (component: any) => component.types.indexOf("locality") > -1
      )[0].long_name;

      const region = addressComponents.filter(
        (component: any) =>
          component.types.indexOf("administrative_area_level_1") > -1
      )[0].long_name;

      const country = addressComponents.filter(
        (component: any) => component.types.indexOf("country") > -1
      )[0].long_name;

      const countryCode = addressComponents.filter(
        (component: any) => component.types.indexOf("country") > -1
      )[0].short_name;

      const { lat, lng } = await getLatLng(results[0]);
      
      const spotAddress: SpotAddress = {
        street: street,
        street_number: streetNumber,
        postal_code: postalCode,
        city: city,
        region: region,
        country_name: country,
        country_code: countryCode,
        latitude: lat,
        longitude: lng,
      };
      onSelectAddress(spotAddress);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        id="search"
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search the address"
        className="w-full h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
        autoComplete="off"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
