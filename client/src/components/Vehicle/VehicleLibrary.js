import * as yup from "yup";
import { errorToast } from "../Message";
import axiosRequest from "../../configs/axiosConfig";

const headers = { "Content-Type": "multipart/form-data" };

const handleRequest = async (method, endpoint, data = null) => {
  try {
    const res = await axiosRequest[method]("/Vehicle" + endpoint, data, {
      headers,
    });
    if (res.status === 200 || res.status === 201) return res.data;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const getVehicles = async () => await handleRequest("get", "");

export const postVehicle = async (vehicle) =>
  await handleRequest("post", "", vehicle);

export const deleteVehicle = async (id) =>
  await handleRequest("delete", `/${id}`);

export const getVehicleById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putVehicle = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 100 },
  { id: "color", label: "Color", minWidth: 170 },
  { id: "used", label: "Used/New", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];
export const fuelType = [
  {
    value: "Diesel",
    label: "Diesel",
  },
  { value: "Gasoline", label: "Gasoline" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
];

export const transmissionType = [
  {
    value: "Manual",
    label: "Manual",
  },
  { value: "Automatic", label: "Automatic" },
  { value: "CVT", label: "CVT" },
  { value: "DCT", label: "DCT" },
];
export const status = [
  {
    value: "0",
    label: "Available",
  },
  { value: "1", label: "Unavailable" },
];

export const generateModelID = (brand, name) => {
  const brandInitial = brand.charAt(0).toUpperCase();
  const nameInitial = name.charAt(0).toUpperCase();

  const randomNumber = Math.floor(Math.random() * (1000 - 100) + 100);

  return `${brandInitial}${nameInitial}-${randomNumber}`;
};
export const generateValidationSchema = (isEditing) =>
  yup.object({
    name: yup.string().required("Name is required"),
    brandId: yup.string().required("Brand is required"),
    manufacturingYear: yup.number().required("Manufacturing Year is required"),

    color: yup.string().required("Color is required"),
    mileage: yup.number().required("Mileage is required"),
    engineType: yup.string().required("Engine Type is required"),
    transmissionType: yup.string().required("Transmission Type is required"),
    fuelType: yup.string().required("Fuel Type is required"),
    numberOfSeats: yup.number().required("Number of Seats is required"),
    purchasePrice: yup.number().required("Purchase Price is required"),
    description: yup.string().required("Description is required"),
    files: isEditing
      ? yup.array().nullable()
      : yup.array().min(1, "Please upload at least one image."),
  });

export const formFields = [
  { name: "name", label: "Name*", type: "text" },
  {
    name: "brandId",
    label: "Brand*",
    type: "select",
  },

  { name: "manufacturingYear", label: "Manufacturing Year*", type: "number" },
  { name: "color", label: "Color*", type: "text" },
  { name: "mileage", label: "Mileage*", type: "number" },
  { name: "engineType", label: "Engine Type*", type: "text" },
  { name: "transmissionType", label: "Transmission Type*", type: "select" },
  { name: "fuelType", label: "Fuel Type*", type: "select" },
  { name: "numberOfSeats", label: "Number of Seats*", type: "number" },
  { name: "purchasePrice", label: "Purchase Price*", type: "number" },
  { name: "description", label: "Description*", type: "text" },
  { name: "isUsed", label: "Used/New*" },
  {
    name: "files",
    label: "Image",
    type: "file",
    accept: "image/*",
    multiple: true,
  },
];
