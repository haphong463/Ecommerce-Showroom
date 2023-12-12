import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Employee" + endpoint, data, {
      headers,
    });
    console.log(res);
    return res;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getEmployee = async () => await handleRequest("get", "");

export const getEmployeeById = async (id) =>
  await handleRequest("get", `/${id}`);

export const columns = [
  { id: "accountId", label: "ID", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 200, align: "left" },
  { id: "avatarUrl", label: "Avatar", minWidth: 200, align: "center" },
];
