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
      className={`whitespace-nowrap font-sans mx-2 mb-2 font-medium rounded-2xl border-2 px-3 sm:px-4 py-1 sm:py-2 border-fuchsia-800 text-fuchsia-800 transition duration-200 hover:border-gray-100 hover:text-gray-100 hover:bg-fuchsia-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
