import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  useMediaQuery,
  Stack,
  IconButton,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WindowIcon from "@mui/icons-material/Window";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { VehicleContext } from "../../context/VehicleContext";
import { getVehicles } from "../../components/Vehicle/VehicleLibrary";
import { LayoutUser } from "../../layout/LayoutUser";
import { Filter } from "../../components/user/Vehicles/Filter";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { WaitVehicles } from "../../components/user/Vehicles/WaitVehicles";
import { VehicleItem } from "../../components/user/Vehicles/VehicleItem";
import { PaginationVehicles } from "../../components/user/Vehicles/PaginationVehicles";
import { useTitle } from "../../UseTitle";
import { VehicleContent } from "../../components/user/Vehicles/VehicleContent";

export function Vehicles() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [dataFetched, setDataFetched] = useState(false);
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
  useEffect(() => {
    setLoading(true);
    let checkIsUsed;
    if (location.pathname === "/vehicles") {
      checkIsUsed = false;
    } else if (location.pathname === "/vehiclesUsed") {
      checkIsUsed = true;
    }
    if (vehicleData.length === 0) {
      getVehicles().then((data) => {
        if (data) {
          const newCar = data.filter(
            (vehicle) => vehicle.isUsed === checkIsUsed
          );
          setSearchData(newCar);
          setVehicleData(data);
          setLoading(false); // Set load
        }
      });
    } else {
      const newCar = vehicleData.filter(
        (vehicle) => vehicle.isUsed === checkIsUsed
      );
      setSearchData(newCar);
      setLoading(false); // Set load
    }
  }, [setVehicleData, setSearchData, location]);

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
