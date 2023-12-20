import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/ReceivingOrder" + endpoint, data, {
      headers,
    });
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getReceivingOrder = async () => await handleRequest("get", "");

export const postReceivingOrder = async (data) =>
  await handleRequest("post", "", data);

export const getReceivingOrderById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putReceivingOrder = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "orderId", label: "#", minWidth: 30 },
  { id: "account", label: "Customer", minWidth: 100 },
  { id: "employee", label: "Employee", minWidth: 200, align: "left" },
  { id: "total", label: "Total", minWidth: 200, align: "center" },
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
