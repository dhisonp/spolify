import React, { FC, MouseEventHandler } from "react";

interface Props {
  label: string;
  onChange: any;
  checked: boolean;
  name: string;
}

const Checkbox: FC<Props> = ({ label, onChange, checked, name }) => {
  return (
    <li className="flex flex-row mb-2 items-center">
      <input
        className="mr-2 align-middle checkbox checkbox-sm"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="text-lg font-medium">{label}</label>
    </li>
  );
};

export default Checkbox;
