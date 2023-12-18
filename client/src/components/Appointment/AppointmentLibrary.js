import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";

const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Appointment" + endpoint, data, {
      headers,
    });
    return res.status === 200 || res.status === 201 ? res.data : null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getAppointmentList = async () => await handleRequest("get", "");

export const postAppointment = async (appointment) =>
  await handleRequest("post", "", appointment);

export const deleteAppointment = async (id) =>
  await handleRequest("delete", `/${id}`);

export const putAppointment = async (appointment, appointmentId) =>
  await handleRequest("put", `/${appointmentId}`, appointment);

export const columns = [
  { id: "image", label: "", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 200, align: "center" },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];
