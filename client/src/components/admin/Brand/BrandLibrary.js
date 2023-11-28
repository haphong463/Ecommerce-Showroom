import axios from "axios";
import * as yup from "yup";
import { errorToast } from "../../ErrorMessage";
const url = "http://localhost:5251/api/Brand";

export const getBrandList = async () => {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data;
    }
    return {
      data: null,
    };
  } catch (error) {
    errorToast(error);
    return {
      data: null,
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

export const deleteBrand = async (id) => {
  try {
    const res = await axios.delete(url + "/" + id);
    if (res.status === 200) {
      return res.data;
    } else {
      return {
        data: null,
      };
    }
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};

export const putBrand = async (brand, brandId) => {
  try {
    const res = await axios.put(`${url}/${brandId}`, brand, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    return brand;
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};
export const columns = [
  { id: "image", label: "", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];
export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  description: yup.string().required("Description is required"),
  image: yup.mixed().nullable(),
});

export const initialValues = {
  name: "",
  description: "",
  image: null,
};
