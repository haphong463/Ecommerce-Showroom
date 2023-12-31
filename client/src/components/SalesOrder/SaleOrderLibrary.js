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
export const getOrderDetails = async () =>
  await handleRequest("get", "/order_details");

export const getOrder = async () => await handleRequest("get", "");

export const postOrder = async (data) => await handleRequest("post", "", data);

export const getOrderById = async (id) => await handleRequest("get", `/${id}`);

export const putOrder = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "orderId", label: "#", minWidth: 30 },
  { id: "account", label: "Customer", minWidth: 100 },
  { id: "employee", label: "Employee", minWidth: 200, align: "left" },
  {
    id: "totalPrice",
    label: "Total",
    minWidth: 200,
    align: "center",
    format: (value) =>
      value.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
  { id: "actions", label: "Action", minWidth: 200, align: "center" },
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
