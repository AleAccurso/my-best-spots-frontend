import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "@/icons/chevron-down.svg";
import { allowedCategories } from "src/categories";
import titleCase from "@/helpers/titleCase";
import { useOnClickOutside } from "usehooks-ts";

export interface CategoryOption {
  category: string;
  value: boolean;
}

const CategoryFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryFilter = useRef(null);

  const categoryFilterConfig: CategoryOption[] = [
    { category: "allCategories", value: true },
  ];

  allowedCategories.map((category) =>
    categoryFilterConfig.push({ category: category, value: false })
  );

  function handleClickOutside(): void {
    setIsOpen(false);
  }

  const handleClickInside = () => {
    setIsOpen(true);
  };

  const countCheckedCheckboxes = () => {
    let counter = 0;
    allowedCategories.map((category) => {
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

    if (e.target.id == "allCategories") {
      handleAllCategoriesFilter(true);
    } else {
      handleAllCategoriesFilter(false);
    }
  };

  const resetFilter = () => {
    var allCheckbox = document.getElementById("allCategories") as HTMLInputElement;

    let allConfig = categoryFilterConfig.find(
      (catConfig) => catConfig.category === "allCategories"
    );

    if (allCheckbox && allConfig) {
      allCheckbox.checked = true;
      allConfig.value = true;
    }

    // Set the other category filters
    allowedCategories.map((category) => {
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

  const handleAllCategoriesFilter = (forceReset: boolean) => {
    const checkedNb: number = countCheckedCheckboxes();

    var allCheckbox = document.getElementById(
      "allCategories"
    ) as HTMLInputElement;

    let allConfig = categoryFilterConfig.find(
      (catConfig) => catConfig.category === "allCategories"
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

        if (checkedNb === allowedCategories.length) {
          resetFilter();
        }
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      console.log("catFilterConfig can be transmitted to parent")
    }
  })

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
          <li value={"allCategories"} className="divide-y divide-mygrey">
            <div className="flex items-center pl-2 rounded">
              <input
                id="allCategories"
                type="checkbox"
                className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
                onChange={handleSetFilter}
                defaultChecked
              />
              <label
                htmlFor="allCategories"
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                All Categories
              </label>
            </div>
            <div className="divide-y divide-gray-100"></div>
          </li>

          {allowedCategories.map((category, key) => {
            return (
              <li key={key} value={category}>
                <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={category}
                    type="checkbox"
                    className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
                    onChange={handleSetFilter}
                  />
                  <label
                    htmlFor={category}
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {titleCase(category.replace("-", " "))}
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

export default CategoryFilter;
