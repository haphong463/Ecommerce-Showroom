import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Account" + endpoint, data, {
      headers,
    });
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getCustomer = async () => await handleRequest("get", "");

export const postCustomer = async (data) =>
  await handleRequest("post", "", data);

export const getCustomerById = async (id) =>
  await handleRequest("get", `/${id}`);

export const getCustomerByEmail = async (email) =>
  await handleRequest("get", `/profile/${email}`);

export const putCustomer = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "accountId", label: "ID", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 200, align: "left" },
  { id: "avatarUrl", label: "Avatar", minWidth: 200, align: "center" },
];
