import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex place-items-center justify-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
