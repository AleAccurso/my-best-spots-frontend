import { Spot } from "@/src/interfaces/spot";

export default function addressToString(spotData: Spot) {
  return (
    spotData.getAddress() +
    ", " +
    spotData.getPostalCode() +
    " " +
    spotData.getCity() +
    " - " +
    spotData.getCountryCode()
  );
}
