// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/Body.css";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { privateRoutes, publicRoutes } from "./route/Route";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h3: {
      fontWeight: "bold",
      marginTop: "20px",
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className="bg-gray"
        style={{
          overflow: "hidden",
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
              {privateRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
