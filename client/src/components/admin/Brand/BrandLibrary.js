import axios from "axios";
import * as yup from "yup";
const url = "http://localhost:5251/api/Brand";

export const getBrandList = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);

    return [];
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
    console.log(error);
    return {};
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
