import React, { createContext, useState } from "react";
export const SaleOrderContext = createContext();
export const SaleOrderProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [saleOrder, setSaleOrder] = useState();
  const [openSaleOrderForm, setOpenSaleOrderForm] = useState(false);

  const handleClickOpen = () => {
    setOpenSaleOrderForm(true);
  };

  const onClose = () => {
    setSaleOrder();
    setOpenSaleOrderForm(false);
  };
  const values = {
    data,
    setData,
    openSaleOrderForm,
    handleClickOpen,
    onClose,
    saleOrder,
    setSaleOrder,
  };
  return (
    <SaleOrderContext.Provider value={values}>{children}</SaleOrderContext.Provider>
  );
};
