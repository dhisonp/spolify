import React from "react";

interface InputField {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputField> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`flex flex-row items-center ${className}`}>
      <label className="text-lg font-medium mr-1 sm:mr-2">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 w-72 sm:w-96 py-2 px-4 m-2 rounded-full border-2 border-fuchsia-800 focus:outline-none focus:bg-emerald-50 text-gray-700"
      />
    </div>
  );
};

export default InputField;
