import axios from "axios";
import * as yup from "yup";
import { errorToast } from "../../ErrorMessage";
const url = "http://localhost:5251/api/Vehicle";
export const getVehicles = async () => {
  try {
    const res = await axios.get(url);
    console.log(res);
    if (res.status === 200) {
      return res.data;
    } else {
      return {
        data: [],
      };
    }
  } catch (error) {
    errorToast(error);
    return {
      data: [],
    };
  }
};

export const brands = [
  { value: "10", label: "Brand 1" },
  { value: "20", label: "Brand 2" },
  { value: "30", label: "Brand 3" },
];

export const formFields = [
  { name: "name", label: "Name*", type: "text" },
  { name: "brand", label: "Brand*", type: "select", options: brands },
  { name: "manufacturingYear", label: "Manufacturing Year*", type: "number" },
  { name: "registrationNumber", label: "Registration Number*", type: "text" },
  { name: "color", label: "Color*", type: "text" },
  { name: "mileage", label: "Mileage*", type: "number" },
  { name: "engineType", label: "Engine Type*", type: "text" },
  { name: "transmissionType", label: "Transmission Type*", type: "text" },
  { name: "fuelType", label: "Fuel Type*", type: "text" },
  { name: "numberOfSeats", label: "Number of Seats*", type: "number" },
  { name: "purchasedDate", label: "Purchased Date*", type: "date" },
  { name: "purchasePrice", label: "Purchase Price*", type: "number" },
  { name: "description", label: "Description*", type: "text" },
  { name: "isUsed", label: "Used/New*" },
  {
    name: "image",
    label: "Image",
    type: "file",
    accept: "image/*",
    multiple: true,
  },
];

export const generateValidationSchema = (isEditing) => {
  return yup.object({
    name: yup.string().required("Name is required"),
    brand: yup.string().required("Brand is required"),
    manufacturingYear: yup.number().required("Manufacturing Year is required"),
    registrationNumber: yup
      .string()
      .required("Registration Number is required"),
    color: yup.string().required("Color is required"),
    mileage: yup.number().required("Mileage is required"),
    engineType: yup.string().required("Engine Type is required"),
    transmissionType: yup.string().required("Transmission Type is required"),
    fuelType: yup.string().required("Fuel Type is required"),
    numberOfSeats: yup.number().required("Number of Seats is required"),
    purchasedDate: yup.date().required("Purchased Date is required"),
    purchasePrice: yup.number().required("Purchase Price is required"),
    description: yup.string().required("Description is required"),
    image: isEditing
      ? yup.array()
      : yup.array().min(1, "Please upload at least one image."),
  });
};
