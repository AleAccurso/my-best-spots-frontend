import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "@/icons/chevron-down.svg";
import { useOnClickOutside } from "usehooks-ts";
import Checkbox from "@/UI/Checkbox";

export interface ICategoryOption {
  category: string;
  value: boolean;
}

export interface ICategoryFilterProps {
  availableCategories: string[];
}

const allCategoriesKey = "all-categories";

const CategoryFilter = ({ availableCategories }: ICategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryFilter = useRef(null);

  const categoryFilterConfig: ICategoryOption[] = [
    { category: allCategoriesKey, value: true },
  ];

  availableCategories.map((category) =>
    categoryFilterConfig.push({ category: category, value: false })
  );

  function handleClickOutside(): void {
    setIsOpen(false);
    console.log("categoryFilterConfig:", categoryFilterConfig);
  }

  const handleClickInside = () => {
    setIsOpen(true);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    availableCategories.map((category) => {
      var categoryCheckbox = document.getElementById(
        category
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

    let categoryConfig = categoryFilterConfig.find(
      (catConfig) => catConfig.category === e.target.id
    );

    if (categoryCheckbox !== null && categoryConfig) {
      categoryCheckbox.checked = e.target.checked;
      categoryConfig.value = e.target.checked;
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

    let allConfig = categoryFilterConfig.find(
      (catConfig) => catConfig.category === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      if (forceReset) {
        resetFilter();
      } else {
        if (checkedNb == 0 || checkedNb === availableCategories.length) {
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

    let allConfig = categoryFilterConfig.find(
      (catConfig) => catConfig.category === allCategoriesKey
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      allConfig.value = true;
    }

    // Set the other category filters
    availableCategories.map((category) => {
      var categoryCheckbox = document.getElementById(
        category
      ) as HTMLInputElement;

      let categoryConfig = categoryFilterConfig.find(
        (catConfig) => catConfig.category === category
      );

      if (categoryCheckbox !== null && categoryConfig) {
        categoryCheckbox.checked = false;
        categoryConfig.value = false;
      }
    });
  };

  useEffect(() => {
    if (!isOpen) {
      // console.log("category filter", categoryFilterConfig);
    }
  });

  useOnClickOutside(categoryFilter, handleClickOutside);

  return (
    <div className="categoryDropCheck relative" ref={categoryFilter}>
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
              label={allCategoriesKey}
              isCheckedByDefault={true}
              handleSetFilter={handleSetFilter}
            />
          </li>

          {availableCategories.map((category, key) => {
            return (
              <li key={key} value={category}>
                <Checkbox
                  label={category}
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
