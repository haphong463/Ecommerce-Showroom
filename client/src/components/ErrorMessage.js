import { toast } from "react-toastify";

export const errorToast = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : "Something went wrong. Please try again later.";

  toast.warn(errorMessage, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const successToast = () => {
  toast.success("Successfully", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
