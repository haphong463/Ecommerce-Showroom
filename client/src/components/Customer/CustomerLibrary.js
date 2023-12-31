import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Account" + endpoint, data, {
      headers,
    });
    console.log(data);
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    console.log(error);
    errorToast(error);
    return null;
  }
};

export const getCustomer = async () => await handleRequest("get", "");

export const postCustomer = async (data) =>
  await handleRequest("post", "", data);

export const getCustomerById = async (id) =>
  await handleRequest("get", `/${id}`);
export const getCustomerByToken = async (token) =>
  await handleRequest("get", `/verify/${token}`);

export const putCustomer = async (data, id) =>
  await handleRequest("put", `/${id}`, data);

export const putChangePassword = async (id, oldPassword, newPassword) =>
  await handleRequest("put", `/change-password/${id}`, {
    oldPassword,
    newPassword,
  });

export const postForgotPassword = async (email) =>
  await handleRequest("post", "/forgot-password", email);

export const postResetPassword = async (token, data) =>
  await handleRequest("post", "/reset-password", {
    ...data,
    password: data.newPassword,
    token,
  });

export const columns = [
  { id: "accountId", label: "ID", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 200, align: "left" },
  { id: "avatarUrl", label: "Avatar", minWidth: 200, align: "left" },
];
