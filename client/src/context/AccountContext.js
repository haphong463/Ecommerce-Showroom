import React, { createContext, useState } from "react";
export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [account, setAccount] = useState();
  const [openAccountForm, setOpenAccountForm] = useState(false);

  const handleClickOpen = () => {
    setOpenAccountForm(true);
  };

  const onClose = () => {
    setAccount();
    setOpenAccountForm(false);
  };
  const values = {
    data,
    setData,
    openAccountForm,
    handleClickOpen,
    onClose,
    Account: account,
    setAccount,
  };
  return (
    <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
  );
};
