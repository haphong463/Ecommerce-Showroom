import React, { createContext, useState } from "react";
export const BrandContext = createContext();
export const BrandProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState();
  const [openBrandForm, setOpenBrandForm] = useState(false);

  const handleClickOpen = () => {
    setOpenBrandForm(true);
  };

  const onClose = () => {
    setBrand();
    setOpenBrandForm(false);
  };
  const values = {
    data,
    setData,
    openBrandForm,
    handleClickOpen,
    onClose,
    brand,
    setBrand,
  };
  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
};
