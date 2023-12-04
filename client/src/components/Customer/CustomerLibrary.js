import axios from "axios";
import { errorToast } from "../Message";
const token = localStorage.getItem("token");
const headers = { "Content-Type": "multipart/form-data" };

const url = "http://localhost:5251/api/Account";

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axios[method](url + endpoint, data, { headers });
    if (res.status === 200 || res.status === 201) return res.data;
    return { data: null };
  } catch (error) {
    errorToast(error);
    return { data: null };
  }
};

export const getCustomer = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
  }
};

export const getCustomerById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putCustomer = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "accountId", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "dateOfBirth", label: "Description", minWidth: 200, align: "center" },
  { id: "avatarUrl", label: "Avatar", minWidth: 200, align: "center" },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];
