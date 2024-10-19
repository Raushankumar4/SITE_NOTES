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
  icon,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <label
        className={`text-gray-700 mt-4  dark:text-[#d2cbcb] font-medium block mb-2`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex items-center border-b-2 border-b-slate-400 mt-4">
        {icon && <span className="mr-2 text-lg text-gray-500">{icon}</span>}
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
          className={`outline-none w-full py-2 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            className || ""
          } ${disabled ? "cursor-not-allowed bg-[#dfdbdb]" : ""}`}
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};
