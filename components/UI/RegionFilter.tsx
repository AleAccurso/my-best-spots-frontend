import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "@/icons/chevron-down.svg";
import { useOnClickOutside } from "usehooks-ts";
import Checkbox from "@/UI/Checkbox";
import { IRegionFilterProps, IRegionOption } from "@/src/interfaces/region";

const allRegionsKey = "all-regions";
const allRegionsName = "All Regions";

const RegionFilter = ({ regions }: IRegionFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const regionFilterRef = useRef(null);

  const regionFilter: IRegionOption[] = [
    { region: allRegionsKey, value: true },
  ];

  regions.map((region) =>
    regionFilter.push({ region: region, value: false })
  );

  function handleClickOutside(): void {
    setIsOpen(false);
    // TODO: Apply filter to list of spots
  }

  const handleClickInside = () => {
    setIsOpen(true);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    regions.map((region) => {
      var regionCheckbox = document.getElementById(region) as HTMLInputElement;
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

    let regionConfig = regionFilter.find(
      (regionConfig) => regionConfig.region === e.target.id
    );

    if (regionCheckbox !== null && regionConfig) {
      regionCheckbox.checked = e.target.checked;
      regionConfig.value = e.target.checked;
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

    let allConfig = regionFilter.find(
      (regionConfig) => regionConfig.region === allRegionsKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        if (checkedNb == 0 || checkedNb == regions.length) {
          resetFilter();
        }

        if (checkedNb > 0) {
          allCheckbox.checked = false;
          allConfig.value = false;
        }
      }
    }
  };

  const resetFilter = () => {
    var allCheckbox = document.getElementById(
      allRegionsKey
    ) as HTMLInputElement;

    let allConfig = regionFilter.find(
      (regionConfig) => regionConfig.region === allRegionsKey
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      allConfig.value = true;
    }

    // Set the other region filters
    regions.map((region) => {
      var regionCheckbox = document.getElementById(region) as HTMLInputElement;

      let regionConfig = regionFilter.find(
        (regionConfig) => regionConfig.region === region
      );

      if (regionCheckbox !== null && regionConfig) {
        regionCheckbox.checked = false;
        regionConfig.value = false;
      }
    });
  };

  useEffect(() => {
    if (!isOpen) {
      // console.log("regionFilter:", regionFilter);
    }
  });

  useOnClickOutside(regionFilterRef, handleClickOutside);

  return (
    <div className="regionFilter relative" ref={regionFilterRef}>
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
          <span>Region</span>
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
          <li className="divide-y divide-mygrey">
            <Checkbox
              id={allRegionsKey}
              label={allRegionsName}
              isCheckedByDefault={true}
              handleSetFilter={handleSetFilter}
            />
            <div className="divide-y divide-gray-100"></div>
          </li>

          {regions.map((region, key) => {
            return (
              <li key={key} value={region}>
                <Checkbox
                  id={region}
                  label={region}
                  isCheckedByDefault={false}
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
