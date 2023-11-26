import React, { createContext, useState } from "react";
export const BrandContext = createContext();
export const BrandProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const values = {
    data,
    setData,
  };
  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
};

