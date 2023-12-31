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

export const getFeaturedCar = async () =>
  await handleRequest("get", "/FeatureVehicles");
export const getImages = async () => await handleRequest("get", "/images");

export const postVehicle = async (vehicle) =>
  await handleRequest("post", "", vehicle);

export const deleteVehicle = async (id) =>
  await handleRequest("delete", `/${id}`);

export const getVehicleById = async (id) =>
  await handleRequest("get", `/${id}`);

export const putVehicle = async (vehicle, id) =>
  await handleRequest("put", `/${id}`, vehicle);

export const putVehicleQuantity = async (id, quantity, purchaseOrderId) =>
  await handleRequest("put", `/updateQuantity/${id}`, {
    id,
    quantity,
    purchaseOrderId,
  });

export const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 100 },
  { id: "modelId", label: "Model ID", minWidth: 100 },
  { id: "color", label: "Color", minWidth: 170 },
  { id: "used", label: "Used/New", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170, align: "right" },
];
export const fuelType = [
  { value: "Diesel", label: "Diesel " },
  { value: "Gasoline", label: "Gasoline" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
];

export const transmissionType = [
  { value: "Manual", label: "Manual Transmission" },
  { value: "Automatic", label: "Automatic Transmission" },
  { value: "CVT", label: "CVT Transmission" },
  { value: "DCT", label: "DCT Transmission" },
];
export const status = [
  { value: "0", label: "Available" },
  { value: "1", label: "Unavailable" },
];
export const numberOfSeats = [
  { value: "2", label: "2 slot" },
  { value: "4", label: "4 slot" },
  { value: "5", label: "5 slot" },
  { value: "7", label: "7 slot" },
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
    files: isEditing
      ? yup
          .array()
          .nullable()
          .test(
            "fileFormat",
            "Only accept files in PNG, JPG, or JPEG format.",
            (value) => {
              if (!value || value.length === 0) {
                return true;
              }
              return value.every((file) =>
                ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
              );
            }
          )
          .max(7, "Only allowed to upload 7 images.")
      : yup
          .array()
          .min(1, "Please upload at least one image.")
          .test(
            "fileFormat",
            "Only accept files in PNG, JPG, or JPEG format.",
            (value) => {
              if (!value || value.length === 0) {
                return false;
              }
              return value.every((file) =>
                ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
              );
            }
          )
          .max(7, "Only allowed to upload 7 images."),
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
  { name: "numberOfSeats", label: "Number of Seats*", type: "select" },
  { name: "isUsed", label: "Used/New*" },

  {
    name: "files",
    label: "Image",
    type: "file",
    accept: "image/*",
    multiple: true,
  },
];
