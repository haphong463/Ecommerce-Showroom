import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const result = await axiosRequest[method]("/Account" + endpoint, data, {
      headers,
    });
    console.log(result);
    return result;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getCustomer = async () => {
  try {
    const data = await handleRequest("get", "");
    console.log(data);
    return data;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const postCustomer = async (data) => {
  await handleRequest("post", "", data);
};

export const getCustomerById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putCustomer = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "accountId", label: "ID", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 200, align: "left" },
  { id: "avatarUrl", label: "Avatar", minWidth: 200, align: "center" },
];
