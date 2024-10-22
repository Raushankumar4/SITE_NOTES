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
      <div
        className={`flex items-center ${
          type !== "file" ? "border-b-2 border-b-slate-400 " : ""
        } mt-2`}
      >
        {icon && <span className="mr-2 text-lg text-[#3c3a3a]">{icon}</span>}
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
          className={`outline-none w-full py-2 bg-transparent placeholder-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            className || ""
          } ${disabled ? "cursor-not-allowed bg-[#dfdbdb]" : ""}`}
        />
      </div>
      {error && <div className="text-red-500 text-sm ">{error}</div>}
    </div>
  );
};
