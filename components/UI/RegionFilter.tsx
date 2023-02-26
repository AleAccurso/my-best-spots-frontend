import { useRef, useState } from "react";
import ChevronDownIcon from "@/icons/chevron-down.svg";
import titleCase from "@/helpers/titleCase";
import { useOnClickOutside } from "usehooks-ts";

const regions = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardinia",
  "Sicilia",
  "Trentino Alto Adige",
  "Toscana",
  "Umbria",
  "Valle d'Aosta",
  "Veneto"
];

export interface RegionOption {
  region: string;
  value: boolean;
}

const RegionFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const regionFilter = useRef(null);

  const regionFilterConfig: RegionOption[] = [
    {region: "all", value: true}
  ];

  regions.map((region) =>
    regionFilterConfig.push({ region: region, value: false })
  );

  function handleClickOutside(): void {
    setIsOpen(false);
  }

  const handleClickInside = () => {
    setIsOpen(true);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    regions.map((region) => {
      var regionCheckbox = document.getElementById(
        region
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

    let regionConfig = regionFilterConfig.find(
      (regionConfig) => regionConfig.region === e.target.id
    );

    if (regionCheckbox !== null && regionConfig) {
      regionCheckbox.checked = e.target.checked;
      regionConfig.value = e.target.checked;
    }

    if (e.target.id == "all") {
      handleAllRegionsFilter(true);
    } else {
      handleAllRegionsFilter(false);
    }
  };

  const resetFilter = () => {
    var allCheckbox = document.getElementById("all") as HTMLInputElement;

    let allConfig = regionFilterConfig.find(
      (regionConfig) => regionConfig.region === "all"
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      allConfig.value = true;
    }

    // Set the other category filters
    regions.map((region) => {
      var regionCheckbox = document.getElementById(
        region
      ) as HTMLInputElement;

      let regionConfig = regionFilterConfig.find(
        (regionConfig) => regionConfig.region === region
      );

      if (regionCheckbox !== null && regionConfig) {
        regionCheckbox.checked = false;
        regionConfig.value = false;
      }
    });
  };

  const handleAllRegionsFilter = (forceReset: boolean) => {
    const checkedNb: number = countCheckedCheckboxes();

    var allCheckbox = document.getElementById("all") as HTMLInputElement;

    let allConfig = regionFilterConfig.find(
      (regionConfig) => regionConfig.region === "all"
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        if (checkedNb == 0) {
          resetFilter();
        }

        if (checkedNb > 0) {
          allCheckbox.checked = false;
          allConfig.value = false;
        }

        if (checkedNb === regions.length) {
          resetFilter();
        }
      }
    }
  };

  useOnClickOutside(regionFilter, handleClickOutside);

  return (
    <div className="regionFilter relative" ref={regionFilter}>
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
          <li value={"all"} className="divide-y divide-mygrey">
            <div className="flex items-center pl-2 rounded">
              <input
                id="all"
                type="checkbox"
                className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
                onChange={handleSetFilter}
                checked
              />
              <label
                htmlFor="all"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                All Regions
              </label>
            </div>
            <div className="divide-y divide-gray-100"></div>
          </li>

          {regions.map((region, key) => {
            return (
              <li key={key} value={region}>
                <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={region}
                    type="checkbox"
                    className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
                    onChange={handleSetFilter}
                  />
                  <label
                    htmlFor={region}
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {titleCase(region.replace("-", " "))}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RegionFilter;
