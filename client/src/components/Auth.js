import axios from "axios";
import { errorToast } from "./Message";

export const loginAuth = async (data) => {
  try {
    const res = await axios.post("http://localhost:5251/api/Auth/login", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    if (res.status === 200) {
      return res.data.token;
    }
  } catch (error) {
    let res = { data: null };
    const status = error.response.status;
    if (status === 400) {
      res = {
        ...res,
        message: "Please verify your email to login.",
      };
    }
    if (status === 401) {
      res = {
        ...res,
        message: "Invalid credentials.",
      };
    }
    console.log(res);
    errorToast(error);
    return res;
  }
};
