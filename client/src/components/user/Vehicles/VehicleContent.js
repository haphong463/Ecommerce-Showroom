import { CompareArrows, FormatListBulleted, Window } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { WaitVehicles } from "./WaitVehicles";
import { VehicleItem } from "./VehicleItem";
import { PaginationVehicles } from "./PaginationVehicles";
import { Filter } from "./Filter";

export function VehicleContent(props) {
  const [isListView, setIsListView] = useState(false); // Mặc định là chế độ xem danh sách
  const [countItemCompare, setCountItemCompare] = useState(
    localStorage.getItem("comparisonList")
      ? JSON.parse(localStorage.getItem("comparisonList")).length
      : 0
  );

  // Hàm chuyển đổi giữa chế độ xem danh sách và chế độ xem cột

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        {/* FILTER VEHICLES: dùng để filter vehicle theo tên, brand */}

        <Filter vehicles={props.vehicleData} />

        {/* END FILTER VEHICLES */}
      </Grid>
      <Grid item md={9} xs={12}>
        {!props.isMobile && (
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Box>
              <Button
                color="inherit"
                onClick={() => props.navigate("/comparison")}
                startIcon={<CompareArrows />}
              >
                Compare ({countItemCompare})
              </Button>
            </Box>

            <Box>
              <Tooltip title="List View">
                <IconButton color="inherit" onClick={() => setIsListView(true)}>
                  <FormatListBulleted />
                </IconButton>
              </Tooltip>
              <Tooltip title="Grid View">
                <IconButton
                  color="inherit"
                  onClick={() => setIsListView(false)}
                >
                  <Window />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        )}

        {props.loading ? ( // Render skeleton when loading
          <WaitVehicles vehiclesPerPage={props.vehiclesPerPage} /> // Render actual data when not loading
        ) : (
          <>
            <Grid container spacing={2}>
              {isListView
                ? // Hiển thị danh sách
                  props.currentVehicles.map((vehicle, index) => (
                    <Grid key={index} item xs={12}>
                      <VehicleItem
                        vehicle={vehicle}
                        navigate={props.navigate}
                        isList={isListView}
                        setCountItemCompare={setCountItemCompare}
                      />
                    </Grid>
                  ))
                : // Hiển thị cột
                  props.currentVehicles.map((vehicle, index) => (
                    <Grid key={index} item xs={12} sm={6} lg={4}>
                      <VehicleItem
                        vehicle={vehicle}
                        navigate={props.navigate}
                        setCountItemCompare={setCountItemCompare}
                      />
                    </Grid>
                  ))}
            </Grid>
          </>
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
