import { FC } from "react";

interface Props {
  className?: string;
}

const Divider: FC<Props> = ({ className }) => {
  return <div className={`w-11/12 border-t-2 border-stone-900 ${className}`} />;
};
export default Divider;
