import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const tokenLocal = localStorage.getItem("token");
  const [loading, setLoading] = useState();
  const [token, setToken] = useState(tokenLocal ? jwtDecode(tokenLocal) : null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/admin/";
  const login = (tokenString) => {
    localStorage.setItem("token", tokenString);
    const decodedToken = jwtDecode(tokenString);
    setToken(decodedToken);
    if (decodedToken.Role === "Admin") {
      navigate(redirectPath, { replace: true });
    } else {
      console.log("Ban la user");
    }
  };
  const logout = () => {
    if (token.Role === "Admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
    localStorage.removeItem("token");
  };
  const values = {
    loading,
    setLoading,
    login,
    logout,
    token,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
