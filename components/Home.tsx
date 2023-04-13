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
import { fetchAvailableSpots } from "@/src/store/reducers/spot";

// import MapboxMap from "./MapboxMap";

const HomePage = () => {
  const { availableSpots, loading } = useSelector(
    (state: CombinedState) => state.spots
  );

  const forceReset = useSelector(
    (state: CombinedState) => state.common.forceReset
  );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (forceReset) {
      dispatch(fetchAvailableCategories());
      dispatch(resetFilterConfig({ filter: filtersName.CATEGORY }));
      
      dispatch(fetchAvailableCountries());
      dispatch(resetFilterConfig({ filter: filtersName.COUNTRY }));
      
      dispatch(fetchAvailableRegions());
      dispatch(resetFilterConfig({ filter: filtersName.REGION }));
      
      dispatch(fetchAvailableSpots());
      
      dispatch(setForceReset(false));
    }
  });

  return (
    <div className="homepage flex h-screen p-0 m-0">
      <div className="placesList flex w-1/3 pb-4 overflow-scroll bg-mylightgrey border-l border-b border-mygrey justify-center">
        {!loading && <SpotsList spotListData={availableSpots.getList()} />}
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
