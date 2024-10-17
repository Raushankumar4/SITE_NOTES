import React from "react";

export const InputArea = ({
  value,
  name,
  onChange,
  type,
  disabled,
  label,
  error,
  className,
  accept,
  id,
  autoComplete = "off",
  placeholder,
}) => {
  return (
    <div className="w-full ">
      <label
        className={`text-gray-700 dark:text-gray-200 font-medium block mb-2 `}
        htmlFor={id}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={id}
        value={value}
        accept={accept}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`"block w-full p-2 text-sm text-gray-900 border rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className} ${
          disabled ? "cursor-not-allowed bg-[#dfdbdb]" : ""
        }`}
      />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};
