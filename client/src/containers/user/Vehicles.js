import React, { useContext, useEffect, useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";

import { VehicleContext } from "../../context/VehicleContext";
import { getVehicles } from "../../components/Vehicle/VehicleLibrary";
import { LayoutUser } from "../../layout/LayoutUser";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

import { useTitle } from "../../UseTitle";
import { VehicleContent } from "../../components/user/Vehicles/VehicleContent";

export function Vehicles() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const { vehicleData, setVehicleData } = useContext(VehicleContext);
  const { searchData, setSearchData } = useContext(DataContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state
  const vehiclesPerPage = 9; // Số lượng phương tiện trên mỗi trang
  const location = useLocation();
  const title =
    location.pathname === "/vehicles"
      ? "New Car"
      : location.pathname === "/vehiclesUsed"
      ? "Used Car"
      : "";
  console.log(vehicleData);
  useEffect(() => {
    setLoading(true);
    let checkIsUsed;
    if (location.pathname === "/vehicles") {
      checkIsUsed = false;
    } else if (location.pathname === "/vehiclesUsed") {
      checkIsUsed = true;
      setCurrentPage(1);
    }
    getVehicles().then((data) => {
      console.log(data);
      setVehicleData(data.filter((item) => item.isUsed === checkIsUsed));
      setSearchData(data.filter((item) => item.isUsed === checkIsUsed));
      setLoading(false);
    });
  }, [location]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = searchData.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );
  useTitle(title);
  return (
    <LayoutUser img="https://wallpapercave.com/wp/wp3368288.jpg" title={title}>
      <Box
        component="section"
        sx={{
          height: searchData.length > 0 ? "auto" : "90vh",
          mt: 2,
          mb: 15,
          mx: {
            xs: 3,
          },
        }}
      >
        {!isMobile ? (
          <Container maxWidth="xl">
            <VehicleContent
              vehicleData={vehicleData}
              searchData={searchData}
              navigate={navigate}
              currentPage={currentPage}
              loading={loading}
              vehiclesPerPage={vehiclesPerPage}
              handlePageChange={handlePageChange}
              currentVehicles={currentVehicles}
              title={title}
            />
          </Container>
        ) : (
          <VehicleContent
            vehicleData={vehicleData}
            searchData={searchData}
            navigate={navigate}
            currentPage={currentPage}
            loading={loading}
            vehiclesPerPage={vehiclesPerPage}
            handlePageChange={handlePageChange}
            currentVehicles={currentVehicles}
            isMobile
            title={title}
          />
        )}
      </Box>

      {/* END VEHICLE CONTENT */}
    </LayoutUser>
  );
}
