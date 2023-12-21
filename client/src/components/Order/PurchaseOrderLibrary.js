import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/OrderCompany" + endpoint, data, {
      headers,
    });
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getPurchaseOrder = async () => await handleRequest("get", "");

export const postPurchaseOrder = async (data) =>
  await handleRequest("post", "", data);

export const getPurchaseOrderById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putPurchaseOrder = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const postCancelPurchaseOrder = async (id) =>
  await handleRequest("post", `/cancel/${id}`, {
    id,
  });

export const generateValidationSchemaOrder = () =>
  yup.object().shape({
    modelName: yup.string().required("Model number is required."),
    quantity: yup.number().required("Quantity is required"),
    suggestPrice: yup.number().required("Suggest price is required"),
  });
