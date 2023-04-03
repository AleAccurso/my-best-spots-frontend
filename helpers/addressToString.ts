import { ISpot } from "@/src/interfaces/spot";

export default function addressToString(spotData: ISpot) {
  return (
    spotData.address +
    ", " +
    spotData.postal_code +
    " " +
    spotData.city +
    " - " +
    spotData.country_code
  );
}
