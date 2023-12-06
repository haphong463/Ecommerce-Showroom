import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogContent,
  Container,
  Pagination,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { VehicleContext } from "../../context/VehicleContext";
import { getVehicles } from "../../components/Vehicle/VehicleLibrary";
import { LayoutUser } from "../../layout/LayoutUser";
import { Filter } from "../../components/user/Vehicles/Filter";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { WaitVehicles } from "../../components/user/Vehicles/WaitVehicles";
import { VehicleItem } from "../../components/user/Vehicles/VehicleItem";
import { PaginationVehicles } from "../../components/user/Vehicles/PaginationVehicles";

function VehicleContent(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* FILTER VEHICLES: dùng để filter vehicle theo tên, brand */}

        <Filter vehicles={props.vehicleData} />

        {/* END FILTER VEHICLES */}
      </Grid>
      <Grid item xs={12}>
        {props.loading ? ( // Render skeleton when loading
          <WaitVehicles vehiclesPerPage={props.vehiclesPerPage} /> // Render actual data when not loading
        ) : (
          <Grid container spacing={2}>
            {props.currentVehicles.map((vehicle, index) => (
              <VehicleItem
                key={index}
                vehicle={vehicle}
                openImageDialog={props.openImageDialog}
                navigate={props.navigate}
              />
            ))}
            {props.searchData.length === 0 && (
              <Grid item xs={12}>
                <Typography
                  sx={{
                    position: "relative",
                  }}
                >
                  No vehicles found!
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        {/* Pagination vehicles theo search data */}
        <PaginationVehicles
          searchData={props.searchData}
          vehiclesPerPage={props.vehiclesPerPage}
          currentPage={props.currentPage}
          handlePageChange={props.handlePageChange}
        />
        {/* END PAGINATION VEHICLES */}
      </Grid>
    </Grid>
  );
}

export function Vehicles() {
  const isMobile = useMediaQuery("(max-width:800px)");
  const { vehicleData, setVehicleData } = useContext(VehicleContext);
  const { searchData, setSearchData } = useContext(DataContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state
  const vehiclesPerPage = 9; // Số lượng phương tiện trên mỗi trang
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    getVehicles().then((data) => {
      if (data && data.length > 0) {
        let checkIsUsed;
        if (location.pathname === "/vehicles") {
          checkIsUsed = true;
        } else if (location.pathname === "/vehiclesUsed") {
          checkIsUsed = false;
        }
        const newCar = data.filter((vehicle) => vehicle.isUsed === checkIsUsed);
        setSearchData(newCar);
        setVehicleData(newCar);
        setLoading(false); // Set loading to false when data is loaded
      }
    });
  }, [setVehicleData, setSearchData, location]);

  const openImageDialog = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = searchData.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );
  return (
    <LayoutUser>
      <Box
        component="section"
        sx={{
          height: searchData.length > 0 ? "100%" : "90vh",
          my: 10,
          mx: {
            xs: 3,
          },
        }}
      >
        {/* VEHILE CONTENT */}

        {!isMobile ? (
          <Container maxWidth="lg">
            <VehicleContent
              vehicleData={vehicleData}
              searchData={searchData}
              navigate={navigate}
              currentPage={currentPage}
              loading={loading}
              vehiclesPerPage={vehiclesPerPage}
              openImageDialog={openImageDialog}
              handlePageChange={handlePageChange}
              currentVehicles={currentVehicles}
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
            openImageDialog={openImageDialog}
            handlePageChange={handlePageChange}
            currentVehicles={currentVehicles}
          />
        )}
      </Box>

      {/* END VEHICLE CONTENT */}

      <Dialog open={selectedImage !== null} onClose={closeImageDialog}>
        <DialogContent sx={{ padding: 0 }}>
          <img
            src={selectedImage}
            alt="Full Size"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </LayoutUser>
  );
}
