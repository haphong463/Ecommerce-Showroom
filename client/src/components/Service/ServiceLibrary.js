import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";
const headers = {
  "Content-Type": "application/json",
};
const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method](
      "/Service" + endpoint,
      data,
      headers
    );
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getService = async () => await handleRequest("get", "");

export const postService = async (data) =>
  await handleRequest("post", "", data);

export const getServiceById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putService = async (service, id) => {
  const data = {
    ...service,
    serviceId: id,
  };
  return await handleRequest("put", `/${id}`, data);
};
export const deleteService = async (id) =>
  await handleRequest("delete", `/${id}`);

export const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 200, align: "left" },
  { id: "description", label: "Description", minWidth: 200, align: "center" },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];

export const generateValidationSchemaService = () =>
  yup.object().shape({
    name: yup.string().required("Name is required."),
    description: yup.string().required("Description is required."),
    price: yup
      .number()
      .typeError("Price must be a number.")
      .required("Price is required."),
  });
