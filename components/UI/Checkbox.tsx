import { ChangeEvent } from "react";

export interface ICheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  handleSetFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  id,
  label,
  isChecked,
  handleSetFilter,
}: ICheckboxProps) => {
  return (
    <div className="flex items-center pl-2 rounded">
      <input
        id={id}
        type="checkbox"
        value={label}
        className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
        checked={isChecked}
        onChange={(e) => handleSetFilter(e)}
      />
      <label
        htmlFor={label}
        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
