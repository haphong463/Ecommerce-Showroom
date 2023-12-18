import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Order" + endpoint, data, {
      headers,
    });
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getOrder = async () => await handleRequest("get", "");

export const postOrder = async (data) => await handleRequest("post", "", data);

export const getOrderById = async (id) => await handleRequest("get", `/${id}`);

export const putOrder = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "modelName", label: "Model Number", minWidth: 30 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 200, align: "left" },
  { id: "brandId", label: "Brands", minWidth: 200, align: "center" },
  { id: "action", label: "Action", minWidth: 200, align: "center" },
];

export const generateValidationSchemaOrder = () =>
  yup.object().shape({
    modelName: yup.string().required("modelName is required."),
    quantity: yup.number().required("Quantity is required."),
    price: yup
      .number()
      .typeError("Price must be a number.")
      .required("Price is required."),
  });
