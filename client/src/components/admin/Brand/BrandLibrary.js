import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
const url = "http://localhost:5251/api/Brand";
const errorToast = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : "Something went wrong. Please try again later.";

  toast.warn(errorMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const getBrandList = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    errorToast(error);
    return {
      data: [],
    };
  }
};

export const postBrand = async (brand) => {
  try {
    const res = await axios.post(url, brand, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  description: yup.string().required("Description is required"),
  image: yup.mixed(),
});

export const initialValues = {
  name: "",
  description: "",
  image: null,
};
