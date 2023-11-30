import axios from "axios";
import * as yup from "yup";
import { errorToast } from "../Message";
const headers = {
  "Content-Type": "multipart/form-data",
};
const url = "http://localhost:5251/api/Vehicle";
export const getVehicles = async () => {
  try {
    const res = await axios.get(url);
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

export const postVehicle = async (vehicle) => {
  try {
    const res = await axios.post(url, vehicle, {
      headers,
    });
    console.log(res);
    if (res.status === 201) {
      return res.data;
    }
    return {
      data: null,
    };
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};

export const deleteVehicle = async (id) => {
  try {
    const res = await axios.delete(url + `/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    return {
      data: null,
    };
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};

export const getVehicleById = async (id) => {
  try {
    const res = await axios.get(url + `/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    return {
      data: null,
    };
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};

export const putVehicle = async (vehicle, id) => {
  try {
    const res = await axios.put(url + `/${id}`, vehicle, {
      headers,
    });
    if (res.status === 200) {
      return res.data;
    }
    return {
      data: null,
    };
  } catch (error) {
    errorToast(error);
    return {
      data: null,
    };
  }
};

export const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 100 },
  {
    id: "color",
    label: "Color",
    minWidth: 170,
  },
  {
    id: "used",
    label: "Used/New",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

export const generateValidationSchema = (isEditing) => {
  return yup.object({
    name: yup.string().required("Name is required"),
    brandId: yup.string().required("Brand is required"),
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
    purchaseDate: yup.date().required("Purchased Date is required"),
    purchasePrice: yup.number().required("Purchase Price is required"),
    description: yup.string().required("Description is required"),
    files: isEditing
      ? yup.array().nullable()
      : yup.array().min(1, "Please upload at least one image."),
  });
};
