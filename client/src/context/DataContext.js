import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { infoToast, successToast } from "../components/Message";
import Swal from "sweetalert2";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
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
    successToast("Welcome back! " + decodedToken.Name);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken();
  };

  // Hàm làm mới token khi nó hết hạn
  const refreshAuthToken = () => {
    // Giả sử 'exp' là thời gian hết hạn trong giây
    const expiresIn = token?.exp || 0;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    // Tính thời gian còn lại cho đến khi token hết hạn
    const remainingTime = expiresIn - nowInSeconds;

    // Làm mới token 5 giây trước khi hết hạn
    const refreshTime = Math.max(0, remainingTime - 5);

    // Đặt timeout để làm mới token
    const refreshTokenTimeout = setTimeout(() => {
      // Thực hiện logic để làm mới token ở đây
      // Ví dụ, thực hiện một yêu cầu đến máy chủ để lấy token mới
      // và cập nhật trạng thái 'token' bằng setToken(newToken)
      // Lưu ý: Việc thực hiện thực tế phụ thuộc vào máy chủ xác thực của bạn

      setToken(null);
      localStorage.removeItem("token");
      Swal.fire({
        title: "Session has expired. ",
        text: "Please log in again to continue.",
        icon: "info",
      });
    }, refreshTime * 1000);

    // Trả lại ID của timeout để có thể xóa nếu cần
    return refreshTokenTimeout;
  };
  useEffect(() => {
    if (token) {
      // Bắt đầu làm mới token khi nó thay đổi hoặc khi component được tạo
      const refreshTokenTimeout = refreshAuthToken();

      // Xóa timeout khi component bị hủy hoặc khi token thay đổi
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
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
