import React, { FC, MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

const Button: FC<Props> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap font-sans mx-2 font-medium rounded-full border-2 px-4 py-2 border-fuchsia-800 text-fuchsia-800 transition duration-200 hover:border-gray-100 hover:text-gray-100 hover:bg-fuchsia-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
