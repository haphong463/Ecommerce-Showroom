import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Service" + endpoint, data);
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

export const putService = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);
export const deleteService = async (id) =>
  await handleRequest("delete", `/${id}`);

export const columns = [
  { id: "accountId", label: "ID", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 200, align: "left" },
  { id: "avatarUrl", label: "Avatar", minWidth: 200, align: "center" },
];

export const generateValidationSchemaService = () =>
  yup.object().shape({
    name: yup.string().required("Name is required!"),
    description: yup.string().required("Description is required"),
  });
