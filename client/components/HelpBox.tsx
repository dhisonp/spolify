import React, { FC, MouseEventHandler } from "react";
interface Props {
  children?: React.ReactNode;
  className?: string;
  visible: boolean;
}

const HelpBox: FC<Props> = ({ children, className, visible }) => {
  return (
    <div className="text-gray-500 mb-3 text-left px-4 flex-col flex items-center sm:w-3/4">
      {visible && (
        <div
          className={`text-gray-500 border-2 border-emerald-600 border-opacity-70 bg-stone-200 bg-opacity-30 px-6 py-4 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default HelpBox;
