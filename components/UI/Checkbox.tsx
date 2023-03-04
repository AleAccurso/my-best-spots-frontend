import titleCase from "@/helpers/titleCase";
import { ChangeEvent } from "react";

export interface ICheckboxProps {
  label: string;
  isCheckedByDefault: boolean;
  handleSetFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  label,
  isCheckedByDefault,
  handleSetFilter,
}: ICheckboxProps) => {
  return (
    <div className="flex items-center pl-2 rounded">
      <input
        id={label}
        type="checkbox"
        value={label}
        className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
        defaultChecked={isCheckedByDefault}
        onChange={(e) => handleSetFilter(e)}
      />
      <label
        htmlFor={label}
        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
      >
        {titleCase(label.replace("-", " "))}
      </label>
    </div>
  );
};

export default Checkbox;
