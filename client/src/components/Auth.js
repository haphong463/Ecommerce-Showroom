import axios from "axios";
import { successToast } from "./Message";

export const loginAuth = async (data) => {
  try {
    const res = await axios.post("http://localhost:5251/api/Auth", data);
    if (res.status === 200) {
      successToast("Sign in successfully.");
      return res.data.token;
    }
  } catch (error) {
    return null;
  }
};
