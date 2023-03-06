// Hooks
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// UI components
import ChevronDownIcon from "@/icons/chevron-down.svg";
import Checkbox from "@/UI/Checkbox";

// Interfaces
import {
  ICategoryFilterProps,
  ICategoryCheckboxOption,
} from "@/src/interfaces/category";

// Constants
const allCategoriesKey = "all-categories";
const allCategoriesName = "All Categories";

const CategoryFilter = ({ categories }: ICategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryFilterRef = useRef(null);

  const categoryCheckboxesConfig: ICategoryCheckboxOption[] = [
    { category_key: allCategoriesKey, value: true },
  ];

  categories.map((category) => {
    const categoryCheckboxOption: ICategoryCheckboxOption = {
      category_key: category.category_key,
      value: false,
    };
    categoryCheckboxesConfig.push(categoryCheckboxOption);
  });

  function handleClickOutside(): void {
    setIsOpen(false);
    // TODO: Apply filter to list of spots
  }

  const handleClickInside = () => {
    setIsOpen(true);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    categories.map((category) => {
      var categoryCheckbox = document.getElementById(
        category.category_key
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

    let categoryCheckboxConfig = categoryCheckboxesConfig.find(
      (catConfig) => catConfig.category_key === e.target.id
    );

    if (categoryCheckbox !== null && categoryCheckboxConfig) {
      categoryCheckbox.checked = e.target.checked;
      categoryCheckboxConfig.value = e.target.checked;
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

    let allConfig = categoryCheckboxesConfig.find(
      (catConfig) => catConfig.category_key === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        if (checkedNb == 0 || checkedNb === categories.length) {
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
      allCategoriesKey
    ) as HTMLInputElement;

    let allConfig = categoryCheckboxesConfig.find(
      (catConfig) => catConfig.category_key === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      allConfig.value = true;
    }

    // Set the other category filters
    categories.map((category) => {
      var categoryCheckbox = document.getElementById(
        category.category_key
      ) as HTMLInputElement;

      let categoryConfig = categoryCheckboxesConfig.find(
        (catConfig) => catConfig.category_key === category.category_key
      );

      if (categoryCheckbox !== null && categoryConfig) {
        categoryCheckbox.checked = false;
        categoryConfig.value = false;
      }
    });
  };

  useEffect(() => {
    if (!isOpen) {
      // console.log("category filter", categoryCheckboxesConfig);
    }
  });

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
          <li className="divide-y divide-mygrey">
            <Checkbox
              id={allCategoriesKey}
              label={allCategoriesName}
              isCheckedByDefault={true}
              handleSetFilter={handleSetFilter}
            />
            <div className="divide-y divide-gray-100"></div>
          </li>

          {categories.map((category, key) => {
            return (
              <li key={key} value={category.category_key}>
                <Checkbox
                  id={category.category_key}
                  label={category.name}
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

export default CategoryFilter;
