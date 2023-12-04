import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const tokenLocal = localStorage.getItem("token");
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState(tokenLocal ? jwtDecode(tokenLocal) : null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || -1;
  const redirectUserPath = location.state?.path || -1;
  const login = (tokenString) => {
    localStorage.setItem("token", tokenString);
    const decodedToken = jwtDecode(tokenString);
    setToken(decodedToken);
    setUser(decodedToken);
    if (decodedToken.Role === "Admin") {
      navigate(redirectPath, { replace: true });
    } else {
      navigate(redirectUserPath, { replace: true });
    }
  };
  const logout = () => {
    navigate(0);
    localStorage.removeItem("token");
    setUser();
  };
  const values = {
    loading,
    setLoading,
    login,
    logout,
    token,
    user,
    setUser,
    searchData,
    setSearchData,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
