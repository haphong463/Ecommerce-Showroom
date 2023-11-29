import React, { createContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [vehicleData, setVehicleData] = useState([]);

  const values = {
    vehicleData,
    setVehicleData,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
