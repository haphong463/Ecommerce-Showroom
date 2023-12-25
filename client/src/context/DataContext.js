import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { successToast } from "../components/Message";
import Swal from "sweetalert2";
import {
  getCustomerByEmail,
  getCustomerById,
} from "../components/Customer/CustomerLibrary";
import { useMediaQuery } from "@mui/material";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [itemCart, setItemCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0
  );
  const [searchData, setSearchData] = useState([]);
  const [user, setUser] = useState();
  const tokenLocal = localStorage.getItem("token");
  const [loading, setLoading] = useState();
  const [token, setToken] = useState(tokenLocal ? jwtDecode(tokenLocal) : null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || -1;
  const redirectUserPath = location.state?.path || -1;
  const login = (tokenString) => {
    localStorage.setItem("token", tokenString);
    const decodedToken = jwtDecode(tokenString);
    setToken(decodedToken);
    if (decodedToken.Role === "Admin") {
      navigate(redirectPath, { replace: true });
    } else {
      navigate(redirectUserPath, { replace: true });
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken();
  };

  const refreshAuthToken = () => {
    const expiresIn = token?.exp || 0;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const remainingTime = expiresIn - nowInSeconds;
    const refreshTime = Math.max(0, remainingTime - 5);
    const refreshTokenTimeout = setTimeout(() => {
      setToken(null);
      localStorage.removeItem("token");
      Swal.fire({
        title: "Session has expired. ",
        text: "Please log in again to continue.",
        icon: "info",
      });
    }, refreshTime * 1000);
    return refreshTokenTimeout;
  };
  useEffect(() => {
    if (token) {
      const refreshTokenTimeout = refreshAuthToken();
      getCustomerById(token.Id).then((data) => {
        setUser(data);
      });
      return () => clearTimeout(refreshTokenTimeout);
    }
  }, [token]);

  const values = {
    loading,
    setLoading,
    login,
    logout,
    token,
    setToken,
    searchData,
    setSearchData,
    itemCart,
    setItemCart,
    user,
    isMobile,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
