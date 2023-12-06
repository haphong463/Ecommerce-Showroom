import axios from "axios";
import { errorToast } from "./Message";

export const loginAuth = async (data) => {
  try {
    const res = await axios.post("http://localhost:5251/api/Auth", data);
    if (res.status === 200) {
      return res.data.token;
    }
  } catch (error) {
    errorToast(error);
    return null;
  }
};
