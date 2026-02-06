import React from "react";

const RightSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between border rounded-2xl py-8">
      <div></div>
      {children}
      <div className="text-center text-xs text-gray-400 mt-8">
        <p>Copyright © 2024 STAR Gifts</p>
      </div>
    </div>
  );
};

export default RightSidebar;
