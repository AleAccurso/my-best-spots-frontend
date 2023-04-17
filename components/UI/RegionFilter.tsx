// Hooks
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// UI components
import ChevronDownIcon from "@/icons/chevron-down.svg";
import Checkbox from "@/UI/Checkbox";

// Interfaces
import { allRegionsKey } from "@/src/constants";
import { useSelector, useDispatch } from "react-redux";
import { CombinedState } from "@/src/interfaces/store";

import { filtersName } from "@/src/enums/filters";
import {
  resetFilterConfig,
  updateCheckboxStatus,
} from "@/src/store/reducers/filter";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchAvailableSpots } from "@/src/store/reducers/spot";

const RegionFilter = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const filterConfig = useSelector((state: CombinedState) => state.filters);

  const { availableRegions, checkboxesConfig } = filterConfig.regions;

  const [isOpen, setIsOpen] = useState(false);
  const [isRegionSelectionFinished, setIsRegionSelectionFinished] =
    useState(false);

  const regionFilterRef = useRef(null);

  function handleClickOutside(): void {
    if (isOpen && !isRegionSelectionFinished) {
      setIsOpen(false);
      setIsRegionSelectionFinished(true);
      dispatch(fetchAvailableSpots(filterConfig));
    }
  }

  const handleClickInside = () => {
    setIsOpen(true);
    setIsRegionSelectionFinished(false);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    checkboxesConfig.map((config) => {
      if (config.region.getRegionKey() != allRegionsKey) {
        var regionCheckbox = document.getElementById(
          config.region.getRegionKey()
        ) as HTMLInputElement;
        if (regionCheckbox !== null && regionCheckbox.checked) {
          counter++;
        }
      }
    });
    return counter;
  };

  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    var regionCheckbox = document.getElementById(
      e.target.id
    ) as HTMLInputElement;

    let regionCheckboxConfig = checkboxesConfig.find(
      (regionConfig) => regionConfig.region.getRegionKey() === e.target.id
    );

    if (regionCheckbox !== null && regionCheckboxConfig) {
      regionCheckbox.checked = e.target.checked;
      dispatch(
        updateCheckboxStatus({
          filter: filtersName.REGION,
          key: e.target.id,
          value: e.target.checked,
        })
      );
    }

    if (e.target.id == allRegionsKey) {
      handleAllRegionsFilter(true);
    } else {
      handleAllRegionsFilter(false);
    }
  };

  const handleAllRegionsFilter = (forceReset: boolean) => {
    const checkedNb: number = countCheckedCheckboxes();

    var allCheckbox = document.getElementById(
      allRegionsKey
    ) as HTMLInputElement;

    let allConfig = checkboxesConfig.find(
      (regionConfig) => regionConfig.region.getRegionKey() === allRegionsKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        const availableRegionsCount = availableRegions.countRegions();

        if (checkedNb == 0 || checkedNb === availableRegionsCount) {
          resetFilter();
        }

        if (checkedNb > 0) {
          allCheckbox.checked = false;
          dispatch(
            updateCheckboxStatus({
              filter: filtersName.REGION,
              key: allRegionsKey,
              value: false,
            })
          );
        }
      }
    }
  };

  const resetFilter = () => {
    checkboxesConfig.map((checkboxOption) => {
      const regionKey = checkboxOption.region.getRegionKey();

      var regionCheckbox = document.getElementById(
        regionKey
      ) as HTMLInputElement;

      let checkedValue = false;

      if (regionKey === allRegionsKey) {
        checkedValue = true;
      }

      if (regionCheckbox !== null) {
        regionCheckbox.checked = checkedValue;
        dispatch(
          updateCheckboxStatus({
            filter: filtersName.REGION,
            key: regionKey,
            value: checkedValue,
          })
        );
      }
    });
  };

  useEffect(() => {
    dispatch(resetFilterConfig({ filter: filtersName.REGION }));
  }, [availableRegions, dispatch]);

  useOnClickOutside(regionFilterRef, handleClickOutside);

  return (
    <div className="regionDropCheck relative" ref={regionFilterRef}>
      <button
        type="button"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        data-dropdown-toggle="dropdownBottom"
        data-dropdown-placement="bottom"
        onClick={handleClickInside}
      >
        <div className="flex leading-9">
          <span>Regions</span>
          <div className="mt-2">
            {!isOpen ? (
              <ChevronDownIcon className="ml-4" />
            ) : (
              <div className="ml-[36px]" />
            )}
          </div>
        </div>
      </button>
      <div
        className={`absolute left-0 z-10 w-44 -ml-1 origin-top-right rounded-md bg-mywhite shadow-lg focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <ul
          className="h-56 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {checkboxesConfig.map((config, key) => {
            return (
              <li key={key} value={config.region.getRegionKey()}>
                <Checkbox
                  id={config.region.getRegionKey()}
                  label={config.region.getRegionName()}
                  isChecked={config.isChecked}
                  handleSetFilter={handleSetFilter}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RegionFilter;
