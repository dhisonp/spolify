import React, { FC } from "react";

interface Props {
  className?: string;
  visible?: boolean;
  setVisible: any;
  message?: string;
}

const Alert: FC<Props> = ({ className, visible, setVisible, message }) => {
  const handleClick = () => {
    setVisible(false);
  };

  let opacity = visible ? "opacity-100" : "opacity-0";
  let translate = visible ? "-translate-y-2" : "";

  return (
    <div
      onClick={handleClick}
      className={`fixed gap-0 mx-2 bottom-0 right-0 w-4/5 sm:w-1/3 justify-center alert cursor-pointer transition ease-in-out duration-100 ${translate} ${opacity} ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
