import Image from "next/image";
import SpotsList from "@/components/SpotsList";
import { ISpot } from "@/src/interfaces/spot";

// import MapboxMap from "./MapboxMap";

const HomePage = () => {

  const filterConfig = {
    categoryFilter: [
      {
        key: "tourism",
        value: true,
      },
    ],
    countryFilter: [
      {
        key: "italy",
        value: true,
      },
    ],
    regionFilter: [
      {
        key: "abruzzo",
        value: true,
      },
    ],
  };
  
  const spotsList: ISpot[] = [
    {
      title: "Grand Place",
      address: "Grote Markt",
      postal_code: "1000",
      city: "Brussel",
      country_code: "BE",
      category: "tourism",
      isShared: false,
    },
    {
      title: "Docks Bruxsel",
      address: "Bd Lambermont 1",
      postal_code: "1000",
      city: "Brussel",
      country_code: "BE",
      category: "shopping",
      isShared: false,
    },
    {
      title: "Delirium Cafe",
      address: "Imp. de la Fidélité 4",
      postal_code: "1000",
      city: "Brussel",
      country_code: "BE",
      category: "cafe-bar",
      isShared: false,
    },
  ];
  return (
    <div className="homepage flex h-screen p-0 m-0">
      <div className="placesList flex w-1/3 pb-4 overflow-scroll bg-mylightgrey border-l border-b border-mygrey justify-center">
        <SpotsList spotListData={spotsList} />
      </div>
      <div className="mapContainer w-2/3 bg-mylightgrey border-x border-b border-mygrey min-h-[500px]">
        <Image
          src={"/src/images/mapbox.png"}
          alt={"MapBox"}
          width={1000}
          height={1000}
        />
        {/* <MapboxMap /> */}
      </div>
    </div>
  );
};

export default HomePage;
