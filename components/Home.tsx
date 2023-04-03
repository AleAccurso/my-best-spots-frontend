import Image from "next/image";
import SpotsList from "@/components/SpotsList";
import { ISpot, ISpotsState } from "@/src/interfaces/spot";

import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { actionCreators } from "@/src/store";
import { IFilterConfig } from "@/src/interfaces/filter";
import { CombinedState } from "@/src/interfaces/store";

// import MapboxMap from "./MapboxMap";

const HomePage = () => {

  // const dispatch = useDispatch();
  // const { getSpots } = bindActionCreators(actionCreators, dispatch);

  // const triggerGetSpots = getSpots();

  const spots = useSelector((state: CombinedState) => state.spots.availableSpots);

  return (
    <div className="homepage flex h-screen p-0 m-0">
      <div className="placesList flex w-1/3 pb-4 overflow-scroll bg-mylightgrey border-l border-b border-mygrey justify-center">
        <SpotsList spotListData={spots} />
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
