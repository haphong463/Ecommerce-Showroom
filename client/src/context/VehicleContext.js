import React, { createContext, useState } from "react";
export const VehicleContext = createContext();
export const VehicleProvider = ({ children }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [entry, setEntry] = useState();

  const [vehicle, setVehicle] = useState({
    name: "",
    description: "",
    images: [],
    fuelType: "",
    manufacturingYear: 0,
    color: "",
    mileage: 0,
    transmissionType: "",
    engineType: "",
    numberOfSeats: 0,
    isUsed: false,
    purchaseDate: new Date(),
    purchasePrice: 0,
    status: "",
  });

  const values = {
    vehicleData,
    setVehicleData,
    entry,
    setEntry,
    vehicle,
    setVehicle,
  };
  return (
    <VehicleContext.Provider value={values}>{children}</VehicleContext.Provider>
  );
};
