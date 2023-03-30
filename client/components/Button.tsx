import React, { FC, MouseEventHandler } from 'react';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded mt-2"
    >
      {children}
    </button>
  );
};

export default Button;
