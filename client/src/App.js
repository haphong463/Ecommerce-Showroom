// eslint-disable-next-line
import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./assets/styles/Body.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { privateRoutes, publicRoutes } from "./route/Route";
import { ToastContainer } from "react-toastify";
import { DataContext } from "./context/DataContext";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h3: {
      fontWeight: "bold",
      marginTop: "20px",
    },
    h6: {
      fontWeight: "600px",
    },
  },
});

function App() {
  const { token } = useContext(DataContext);
  const location = useLocation();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <ThemeProvider theme={theme}>
          <Routes>
            {publicRoutes.map((item, index) => {
              return (
                <Route key={index} path={item.path} element={item.component} />
              );
            })}
            {privateRoutes.map((item, index) => {
              if (token && item.roles?.includes(token.Role)) {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    element={item.component}
                  />
                );
              } else {
                return (
                  <Route
                    key={index}
                    path="*"
                    element={
                      <Navigate
                        state={{ path: location.pathname }}
                        to="/admin/login"
                      />
                    }
                  />
                );
              }
            })}
          </Routes>
          <ToastContainer />
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
