import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  displayName: string;
}

export default function BaseType({ children, displayName }: Props) {
  return (
    <div className="flex flex-row justify-start space-x-2 items-center bg-slate-400 rounded-full pl-3 pr-2 mr-3 mt-3">
      <span className="font-semibold cursor-default">{displayName}:</span>
      {children}
    </div>
  );
}
