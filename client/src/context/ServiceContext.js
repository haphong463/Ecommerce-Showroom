import React, { createContext, useState } from "react";
export const ServiceContext = createContext();
export const ServiceProvider = ({ children }) => {
  const [serviceData, setServiceData] = useState([]);
  const [service, setService] = useState();
  const [openServiceForm, setOpenServiceForm] = useState(false);

  const handleClickOpen = () => {
    setOpenServiceForm(true);
  };

  const onClose = () => {
    setService();
    setOpenServiceForm(false);
  };
  const values = {
    serviceData,
    setServiceData,
    openServiceForm,
    handleClickOpen,
    onClose,
    service,
    setService,
  };
  return (
    <ServiceContext.Provider value={values}>{children}</ServiceContext.Provider>
  );
};
