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
      <label className={`text-gray-700 font-medium block mb-2 `} htmlFor={id}>
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
        className={`inline-block border  rounded-lg w-full p-2 leading-tight transition duration-200  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? "bg-red-600 border-2 ring-red-500 ring-1 outline-none"
            : "border-gray-300 focus:border-gray-500"
        } ${className || ""} ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-white"
        }`}
      />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};
