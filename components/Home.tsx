import Image from "next/image";
// import MapboxMap from "./MapboxMap";

const HomePage = () => {
  return (
    <div className="homepage flex h-screen p-0 m-0">
      {/* 100px is the height of the navbar */}
      <div className="placesList w-1/3 pb-4 overflow-scroll bg-light-grey border-l border-b border-grey min-h-[500px]">
        Place list
      </div>
      <div className="mapContainer w-2/3 bg-light-grey border-x border-b border-grey min-h-[500px]">
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
