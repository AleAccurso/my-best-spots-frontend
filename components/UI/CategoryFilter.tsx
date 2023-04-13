// Hooks
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// UI components
import ChevronDownIcon from "@/icons/chevron-down.svg";
import Checkbox from "@/UI/Checkbox";

// Interfaces
import { allCategoriesKey } from "@/src/constants";
import { useSelector } from "react-redux";
import { CombinedState } from "@/src/interfaces/store";
import { useDispatch } from "react-redux";

import { filtersName } from "@/src/enums/filters";
import { updateCheckboxStatus } from "@/src/store/reducers/filter";

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const { availableCategories, checkboxesConfig, loading} = useSelector(
    (state: CombinedState) => state.filters.categories
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isCategorySelectionFinished, setIsCategorySelectionFinished] =
    useState(false);

  const categoryFilterRef = useRef(null);

  function handleClickOutside(): void {
    if (isOpen && !isCategorySelectionFinished) {
      setIsOpen(false);
      setIsCategorySelectionFinished(true);
    }
  }

  const handleClickInside = () => {
    setIsOpen(true);
    setIsCategorySelectionFinished(false);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    checkboxesConfig.map((config) => {
      var categoryCheckbox = document.getElementById(
        config.category.getCategoryKey()
      ) as HTMLInputElement;
      if (categoryCheckbox !== null && categoryCheckbox.checked) {
        counter++;
      }
    });
    return counter;
  };

  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    var categoryCheckbox = document.getElementById(
      e.target.id
    ) as HTMLInputElement;

    let categoryCheckboxConfig = checkboxesConfig.find(
      (catConfig) => catConfig.category.getCategoryKey() === e.target.id
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
      (catConfig) => catConfig.category.getCategoryKey() === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        if (
          checkedNb == 0 ||
          checkedNb === availableCategories.countCategories()
        ) {
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
    var allCheckbox = document.getElementById(
      allCategoriesKey
    ) as HTMLInputElement;

    let allConfig = checkboxesConfig.find(
      (catConfig) => catConfig.category.getCategoryKey() === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      dispatch(
        updateCheckboxStatus({
          filter: filtersName.CATEGORY,
          key: allCategoriesKey,
          value: true,
        })
      );
    }

    // Set the other category filters
    checkboxesConfig.map((checkboxOption) => {
      var categoryCheckbox = document.getElementById(
        checkboxOption.category.getCategoryKey()
      ) as HTMLInputElement;

      if (categoryCheckbox !== null) {
        categoryCheckbox.checked = false;
        dispatch(
          updateCheckboxStatus({
            filter: filtersName.CATEGORY,
            key: allCategoriesKey,
            value: false,
          })
        );
      }
    });
  };

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
          {!loading && checkboxesConfig.map((config, key) => {
            return (
              <li key={key} value={config.category.getCategoryKey()}>
                <Checkbox
                  id={config.category.getCategoryKey()}
                  label={config.category.getCategoryName()}
                  isChecked={config.value}
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
