// Hooks
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// UI components
import ChevronDownIcon from "@/icons/chevron-down.svg";
import Checkbox from "@/UI/Checkbox";

// Interfaces
import { allCategoriesKey } from "@/src/constants";
import { useSelector, useDispatch } from "react-redux";
import { CombinedState } from "@/src/interfaces/store";

import { filtersName } from "@/src/enums/filters";
import {
  resetFilterConfig,
  updateCheckboxStatus,
} from "@/src/store/reducers/filter";
import { fetchAvailableSpots } from "@/src/store/reducers/spot";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { FiltersConfig, IFiltersState } from "@/src/interfaces/filter";
import { mapFilterStateToConfig } from "@/src/mappers/filters";

const CategoryFilter = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const filterState = useSelector((state: CombinedState) => state.filters);

  const { availableCategories, checkboxesConfig } = filterState.categories;

  const [isOpen, setIsOpen] = useState(false);
  const [isCategorySelectionFinished, setIsCategorySelectionFinished] =
    useState(false);

  const categoryFilterRef = useRef(null);

  function handleClickOutside(): void {
    if (isOpen && !isCategorySelectionFinished) {
      setIsOpen(false);
      setIsCategorySelectionFinished(true);
      dispatch(fetchAvailableSpots(mapFilterStateToConfig(filterState)));
    }
  }

  const handleClickInside = () => {
    setIsOpen(true);
    setIsCategorySelectionFinished(false);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    checkboxesConfig.map((config) => {
      if (config.category.category_key != allCategoriesKey) {
        var categoryCheckbox = document.getElementById(
          config.category.category_key
        ) as HTMLInputElement;
        if (categoryCheckbox !== null && categoryCheckbox.checked) {
          counter++;
        }
      }
    });
    return counter;
  };

  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    var categoryCheckbox = document.getElementById(
      e.target.id
    ) as HTMLInputElement;

    let categoryCheckboxConfig = checkboxesConfig.find(
      (catConfig) => catConfig.category.category_key === e.target.id
    );

    if (categoryCheckbox !== null && categoryCheckboxConfig) {
      categoryCheckbox.checked = e.target.checked;
      dispatch(
        updateCheckboxStatus({
          filter: filtersName.CATEGORY,
          key: e.target.id,
          value: e.target.checked,
        })
      );
    }

    if (e.target.id == allCategoriesKey) {
      handleAllCategoriesFilter(true);
    } else {
      handleAllCategoriesFilter(false);
    }
  };

  const handleAllCategoriesFilter = (forceReset: boolean) => {
    const checkedNb: number = countCheckedCheckboxes();

    var allCheckbox = document.getElementById(
      allCategoriesKey
    ) as HTMLInputElement;

    let allConfig = checkboxesConfig.find(
      (catConfig) => catConfig.category.category_key === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        const availableCategoriesCount = availableCategories.length;

        if (checkedNb == 0 || checkedNb === availableCategoriesCount) {
          resetFilter();
        }

        if (checkedNb > 0) {
          allCheckbox.checked = false;
          dispatch(
            updateCheckboxStatus({
              filter: filtersName.CATEGORY,
              key: allCategoriesKey,
              value: false,
            })
          );
        }
      }
    }
  };

  const resetFilter = () => {
    checkboxesConfig.map((checkboxOption) => {
      const categoryKey = checkboxOption.category.category_key;

      var categoryCheckbox = document.getElementById(
        categoryKey
      ) as HTMLInputElement;

      let checkedValue = false;

      if (categoryKey === allCategoriesKey) {
        checkedValue = true;
      }

      if (categoryCheckbox !== null) {
        categoryCheckbox.checked = checkedValue;
        dispatch(
          updateCheckboxStatus({
            filter: filtersName.CATEGORY,
            key: categoryKey,
            value: checkedValue,
          })
        );
      }
    });
  };

  useEffect(() => {
    dispatch(resetFilterConfig({ filter: filtersName.CATEGORY }));
  }, [availableCategories, dispatch]);

  useOnClickOutside(categoryFilterRef, handleClickOutside);

  return (
    <div className="categoryDropCheck relative" ref={categoryFilterRef}>
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
          <span>Categories</span>
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
              <li key={key} value={config.category.category_key}>
                <Checkbox
                  id={config.category.category_key}
                  label={config.category.category_name}
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

export default CategoryFilter;
