import CafeBar from "@/icons/categories/cafe-bar.svg"
import GasStation from "@/icons/categories/gas-station.svg";
import Hosting from "@/icons/categories/hosting.svg";
import Leisure from "@/icons/categories/leisure.svg";
import Medical from "@/icons/categories/medical.svg";
import PrivateBeach from "@/icons/categories/private-beach.svg";
import Producer from "@/icons/categories/producer.svg";
import PublicBeach from "@/icons/categories/public-beach.svg";
import ReligiousSite from "@/icons/categories/religious-site.svg";
import Restaurant from "@/icons/categories/restaurant.svg";
import Shopping from "@/icons/categories/shopping.svg";
import Thermal from "@/icons/categories/thermal.svg";
import Tourism from "@/icons/categories/tourism.svg";

export default function getCategoryIcon(category: string) {

  switch (category) {
    case "cafe-bar":
      return <CafeBar />
    case "gas-station":
      return <GasStation />
    case "hosting":
      return <Hosting />
    case "leisure":
      return <Leisure />
    case "medical":
      return <Medical />
    case "private-beach":
      return <PrivateBeach />
    case "producer":
      return <Producer />
    case "public-beach":
      return <PublicBeach />
    case "religious-site":
      return <ReligiousSite />
    case "restaurant":
      return <Restaurant />
    case "shopping":
      return <Shopping />
    case "thermal":
      return <Thermal />
    case "tourism":
      return <Tourism />
  }

  return (
    <div></div>
  );
}
