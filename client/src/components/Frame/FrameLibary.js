import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";
const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Frame" + endpoint, data, {
      headers,
    });
    return res;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getFrame = async () => await handleRequest("get", "");

export const getFrameById = async (id) => await handleRequest("get", `/${id}`);
