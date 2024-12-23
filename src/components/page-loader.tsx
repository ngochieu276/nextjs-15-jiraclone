import React from "react";

const PageLoader = () => {
  return (
    <div className=" flex items-center justify-center h-full">
      <div className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default PageLoader;
