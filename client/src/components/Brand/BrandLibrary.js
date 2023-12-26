import * as yup from "yup";
import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";

const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Brand" + endpoint, data, {
      headers,
    });
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getBrandList = async () => await handleRequest("get", "");

export const postBrand = async (brand) =>
  await handleRequest("post", "", brand);

export const deleteBrand = async (id) =>
  await handleRequest("delete", `/${id}`);

export const putBrand = async (brand, brandId) =>
  await handleRequest("put", `/${brandId}`, brand);

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
            "Only accept files in PNG, JPG, or JPEG format.",
            (value) =>
              value === null ||
              ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          )
      : yup
          .mixed()
          .required("Image is required")
          .test(
            "fileFormat",
            "Only accept files in PNG, JPG, or JPEG format.",
            (value) =>
              ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          ),
  });
