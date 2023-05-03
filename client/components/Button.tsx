import React, { FC, MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

const Button: FC<Props> = ({
  onClick,
  children,
  className = "border-fuchsia-800 text-fuchsia-800",
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full sm:w-auto whitespace-nowrap font-sans mx-2 mb-2 font-medium rounded-2xl border-2 px-2 sm:px-4 py-2 transition duration-200 hover:border-gray-100 hover:text-gray-100 hover:bg-fuchsia-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
