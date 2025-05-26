import React from "react";
import Marques from "./Marques";

function Marquess() {
  const imageGroup1 = Array.from(
    { length: 10 },
    (_, i) => `/Images/CompanyImages/logo${i + 1}.svg`
  );

  return (
    <div className="mt-10 marquess-section py-10 w-full relative overflow-hidden px-4 lg:px-15">
      <Marques imagesUrl={imageGroup1} direction="left" />
    </div>
  );
}

export default Marquess;