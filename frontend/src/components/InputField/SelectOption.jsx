import React from "react";

const SelectOption = ({
  id,
  error,
  name,
  label,
  options,
  value,
  onChange,
  required,
  disabled,
  className,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-md font-medium text-gray-700 dark:text-[#d2cbcb]"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          name={name}
          className={` ${
            className || ""
          } mt-1 block w-full border border-[#d2cbcb00] rounded-md p-2 focus:outline-none focus:ring-2 
             bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-lg transition-all ease-in-out duration-300
            ${disabled ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent"}`}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">Select {label?.toLowerCase()}</option>
          {options.map((option) => (
            <option
              className="glass-card"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SelectOption;
