import React, { createContext, useState } from "react";
export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState([]);
  const [order, setOrder] = useState();
  const [openOrderForm, setOpenOrderForm] = useState(false);

  const handleClickOpen = () => {
    setOpenOrderForm(true);
  };

  const onClose = () => {
    setOrder();
    setOpenOrderForm(false);
  };
  const values = {
    orderData,
    setOrderData,
    openOrderForm,
    handleClickOpen,
    onClose,
    order,
    setOrder,
  };
  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
};
