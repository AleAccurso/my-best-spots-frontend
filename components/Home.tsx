import Image from "next/image";
import SpotsList from "@/components/SpotsList";

import { useDispatch, useSelector } from "react-redux";
import { CombinedState } from "@/src/interfaces/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchAvailableCategories,
  fetchAvailableCountries,
  fetchAvailableRegions,
  resetFilterConfig,
} from "@/src/store/reducers/filter";
import { useEffect } from "react";
import { filtersName } from "@/src/enums/filters";
import { setForceReset } from "@/src/store/reducers/common";

// import MapboxMap from "./MapboxMap";

const HomePage = () => {
  const spots = useSelector(
    (state: CombinedState) => state.spots.availableSpots
  );

  const forceReset = useSelector(
    (state: CombinedState) => state.common.forceReset
  );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (forceReset) {
      console.log("reseting filters...")
      dispatch(fetchAvailableCategories());
      dispatch(resetFilterConfig({ filter: filtersName.CATEGORY }));
      dispatch(fetchAvailableCountries());
      dispatch(resetFilterConfig({ filter: filtersName.COUNTRY }));
      dispatch(fetchAvailableRegions());
      dispatch(resetFilterConfig({ filter: filtersName.REGION }));
      dispatch(setForceReset(false));
    }
  });

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
