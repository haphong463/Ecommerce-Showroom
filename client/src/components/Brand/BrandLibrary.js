import axios from "axios";
import * as yup from "yup";
import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
const url = "http://localhost:5251/api/Brand";
const headers = 'Content-Type: "mulipart/form-data"';
export const getBrandList = async () => {
  try {
    const res = await axiosRequest.get("/Brand");
    return res.status === 200 ? res : { data: null };
  } catch (error) {
    errorToast(error);
    return { data: null };
  }
};

export const postBrand = async (brand) => {
  try {
    const res = await axios.post(url, brand, {
      headers,
    });
    return res.data;
  } catch (error) {
    errorToast(error);
    return {
      data: [],
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
      headers,
    });
    const resId = await axios.get(`${url}/${brandId}`);
    return res.status === 200 ? res.data : resId.data.data;
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
    minWidth: 200,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];
export const generateValidationSchemaBrand = (brand) => {
  return yup.object().shape({
    name: yup.string().required("Name is required!"),
    description: yup.string().required("Description is required"),
    image: brand
      ? yup
          .mixed()
          .nullable()
          .test(
            "fileFormat",
            "Chỉ chấp nhận các file có định dạng PNG, JPG hoặc JPEG",
            (value) => {
              return (
                value === null ||
                ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
              );
            }
          )
      : yup
          .mixed()
          .required("Image is required")
          .test(
            "fileFormat",
            "Chỉ chấp nhận các file có định dạng PNG, JPG hoặc JPEG",
            (value) => {
              return ["image/png", "image/jpeg", "image/jpg"].includes(
                value.type
              );
            }
          ),
  });
};
