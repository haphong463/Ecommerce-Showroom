import { useFormik } from "formik";
import React, { createContext, useState } from "react";
import { validationSchema } from "../components/admin/Brand/BrandLibrary";
export const BrandContext = createContext();
export const BrandProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openBrandForm, setOpenBrandForm] = useState(false);

  const handleClickOpen = () => {
    setOpenBrandForm(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
    },
    validationSchema: validationSchema,
  });
  const onClose = () => {
    formik.resetForm();
    setIsEditing(false);
    setOpenBrandForm(false);
  };
  const values = {
    data,
    setData,
    isEditing,
    setIsEditing,
    formik,
    openBrandForm,
    handleClickOpen,
    onClose,
  };
  return (
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
};
