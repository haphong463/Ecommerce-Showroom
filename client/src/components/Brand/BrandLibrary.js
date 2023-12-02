import axios from "axios";
import * as yup from "yup";
import { errorToast } from "../Message";

const url = "http://localhost:5251/api/Brand";
const headers = { "Content-Type": "mulipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axios[method](url + endpoint, data, { headers });
    return res.status === 200 ? res.data : { data: null };
  } catch (error) {
    errorToast(error);
    return { data: null };
  }
};

export const getBrandList = async () => await handleRequest("get", "");

export const postBrand = async (brand) =>
  await handleRequest("post", "", brand);

export const deleteBrand = async (id) =>
  await handleRequest("delete", `/${id}`);

export const putBrand = async (brand, brandId) => {
  try {
    const res = await handleRequest("put", `/${brandId}`, brand);
    const resId = await handleRequest("get", `/${brandId}`);
    return res.status === 200 ? res.data : resId.data.data;
  } catch (error) {
    errorToast(error);
    return { data: null };
  }
};

export const columns = [
  { id: "image", label: "", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 200, align: "center" },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];

export const generateValidationSchemaBrand = (brand) =>
  yup.object().shape({
    name: yup.string().required("Name is required!"),
    description: yup.string().required("Description is required"),
    image: brand
      ? yup
          .mixed()
          .nullable()
          .test(
            "fileFormat",
            "Chỉ chấp nhận các file có định dạng PNG, JPG hoặc JPEG",
            (value) =>
              value === null ||
              ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          )
      : yup
          .mixed()
          .required("Image is required")
          .test(
            "fileFormat",
            "Chỉ chấp nhận các file có định dạng PNG, JPG hoặc JPEG",
            (value) =>
              ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          ),
  });
