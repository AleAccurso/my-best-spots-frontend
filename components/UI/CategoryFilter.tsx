import { useState } from "react";
import ChevronUpIcon from "@/icons/chevron-up.svg";
import ChevronDownIcon from "@/icons/chevron-down.svg";
import { allowedCategories } from "src/categories";
import titleCase from "@/helpers/titleCase";

const CategoryFilter = () => {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("id:", e.target.id);
    console.log("isChecked:", e.target.checked)
  };

  return (
    <div className="categoryDropCheck relative">
      <button
        type="button"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        data-dropdown-toggle="dropdownBottom"
        data-dropdown-placement="bottom"
        onClick={handleDropDown}
      >
        <div className="flex leading-9">
          <span>Categories</span>
          <div className="mt-2">
            {isOpen ? (
              <ChevronUpIcon className="ml-4" />
            ) : (
              <ChevronDownIcon className="ml-4" />
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
              />
              <label
                htmlFor="all"
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
