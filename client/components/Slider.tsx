import React, { FC } from "react";

interface Props {
  label: string;
  value: number;
  onChange: any;
  min: number;
  max: number;
  name: string;
  tooltip?: boolean;
  dataTip?: string;
  disabled: boolean;
  toggle: any;
}

const Slider: FC<Props> = ({
  label,
  value,
  onChange,
  min,
  max,
  name,
  tooltip,
  dataTip = "",
  disabled,
  toggle,
}) => {
  const isTooltip = tooltip ? "tooltip" : "";
  const opacity = disabled ? "opacity-60" : "";
  return (
    <div className={`items-center flex mb-2 ${isTooltip}`} data-tip={dataTip}>
      <label
        onClick={toggle}
        className={`text-lg font-medium mr-4 cursor-pointer transition duration-100 hover:scale-105 hover:-translate-y-1  ${opacity}`}
      >
        {label}
      </label>
      <span className="text-gray-500 mr-4 text-lg w-4">{value}</span>
      <input
        disabled={disabled}
        type="range"
        min={min}
        max={max}
        name={name}
        value={value}
        onChange={onChange}
        className={`cursor-pointer range range-xs accent-fuchsia-700 w-3/5 ${opacity}`}
      />
    </div>
  );
};

export default Slider;
