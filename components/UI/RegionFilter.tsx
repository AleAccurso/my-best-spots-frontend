// Hooks
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// UI components
import ChevronDownIcon from "@/icons/chevron-down.svg";
import Checkbox from "@/UI/Checkbox";

// Interfaces
import { allRegionsKey, allRegionsName } from "@/src/constants";
import { useSelector } from "react-redux";
import { CombinedState } from "@/src/interfaces/store";
import { useDispatch } from "react-redux";

import { updateCheckboxStatus } from "@/store/reducers/filter";
import { filtersName } from "@/src/enums/filters";

const RegionFilter = () => {
  const dispatch = useDispatch();

  const { availableRegions, checkboxesConfig, loading } = useSelector(
    (state: CombinedState) => state.filters.regions
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isRegionSelectionFinished, setIsRegionSelectionFinished] =
    useState(false);

  const RegionFilterRef = useRef(null);

  function handleClickOutside(): void {
    if (isOpen && !isRegionSelectionFinished) {
      setIsOpen(false);
      setIsRegionSelectionFinished(true);
    }
  }

  const handleClickInside = () => {
    setIsOpen(true);
    setIsRegionSelectionFinished(false);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    checkboxesConfig.map((region) => {
      var regionCheckbox = document.getElementById(
        region.region_key
      ) as HTMLInputElement;
      if (regionCheckbox !== null && regionCheckbox.checked) {
        counter++;
      }
    });
    return counter;
  };

  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    var regionCheckbox = document.getElementById(
      e.target.id
    ) as HTMLInputElement;

    let RegionCheckboxConfig = checkboxesConfig.find(
      (regConfig) => regConfig.region_key === e.target.id
    );

    if (regionCheckbox !== null && RegionCheckboxConfig) {
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
      (regConfig) => regConfig.region_key === allRegionsKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        if (checkedNb == 0 || checkedNb === availableRegions.length) {
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
    var allCheckbox = document.getElementById(
      allRegionsKey
    ) as HTMLInputElement;

    let allConfig = checkboxesConfig.find(
      (regConfig) => regConfig.region_key === allRegionsKey
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      dispatch(
        updateCheckboxStatus({
          filter: filtersName.REGION,
          key: allRegionsKey,
          value: true,
        })
      );
    }

    // Set the other Region filters
    checkboxesConfig.map((region) => {
      var regionCheckbox = document.getElementById(
        region.region_key
      ) as HTMLInputElement;

      if (regionCheckbox !== null) {
        regionCheckbox.checked = false;
        dispatch(
          updateCheckboxStatus({
            filter: filtersName.REGION,
            key: allRegionsKey,
            value: false,
          })
        );
      }
    });
  };

  useOnClickOutside(RegionFilterRef, handleClickOutside);

  return (
    <div className="RegionDropCheck relative" ref={RegionFilterRef}>
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
          <span>regions</span>
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
          {!loading &&
            checkboxesConfig.map((region, key) => {
              return (
                <li key={key} value={region.region_key}>
                  <Checkbox
                    id={region.region_key}
                    label={region.region_name}
                    isChecked={region.value}
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
