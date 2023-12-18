import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";
import * as yup from "yup";
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

export const generateValidationSchemaAccount = (account) =>
  yup.object().shape({
    name: yup.string().required("Name is required!"),
    description: yup.string().required("Description is required"),
    image: account
      ? yup
          .mixed()
          .nullable()
          .test(
            "fileFormat",
            "Chỉ chấp nhận các file có định dạng PNG, JPG hoặc JPEG",
            (value) =>
              value === null ||
              ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          )
      : yup
          .mixed()
          .required("Image is required")
          .test(
            "fileFormat",
            "Chỉ chấp nhận các file có định dạng PNG, JPG hoặc JPEG",
            (value) =>
              ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
          ),
  });
