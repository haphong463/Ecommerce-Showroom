import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { VehicleContext } from "../../../context/VehicleContext";
import { DataContext } from "../../../context/DataContext";
import { getBrandList } from "../../Brand/BrandLibrary";
import {
  fuelType as fuelTypeList,
  transmissionType,
  status as statusList,
} from "../../Vehicle/VehicleLibrary";
export const Filter = ({ vehicles }) => {
  const { setSearchData } = useContext(DataContext);
  const [options, setOptions] = useState([]);
  const [brand, setBrand] = useState();
  const [transmission, setTransmission] = useState();
  const [fuelType, setFuelType] = useState();
  const [status, setStatus] = useState();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [brandList, setBrandList] = useState([]);

  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleChangeTranmission = (event) => {
    setTransmission(event.target.value);
  };
  const handleChangeFuelType = (event) => {
    setFuelType(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    let filterVehicles = vehicles.slice();
    if (inputValue) {
      filterVehicles = filterVehicles.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    if (brand && brand !== "all") {
      filterVehicles = filterVehicles.filter(
        (item) => item.brand.brandId === brand
      );
    }
    if (transmission && transmission !== "all") {
      filterVehicles = filterVehicles.filter(
        (item) => item.transmissionType === transmission
      );
    }
    if (fuelType && fuelType !== "all") {
      filterVehicles = filterVehicles.filter(
        (item) => item.fuelType === fuelType
      );
    }
    if (status && status !== "all") {
      filterVehicles = filterVehicles.filter(
        (item) => item.status === parseInt(status)
      );
    }
    setSearchData(filterVehicles);
  }, [inputValue, brand, status, fuelType, transmission]);

  useEffect(() => {
    const uniqueOptions = [...new Set(vehicles.map((item) => item.name))];
    setOptions(
      uniqueOptions.map((name, index) => ({
        label: name,
      }))
    );
  }, [vehicles]);

  useEffect(() => {
    getBrandList().then((data) => {
      if (data !== null) {
        setBrandList(data);
      }
    });
  }, []);
  // console.log(vehicles, status);
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" align="center" className="title-text">
          Filter
        </Typography>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search vehicle by name..."
            />
          )}
          freeSolo
          disableClearable
          fullWidth
          inputValue={inputValue}
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          onInputChange={handleInputChange}
        />
        <FormControl fullWidth>
          <InputLabel>Brand</InputLabel>

          <Select
            onChange={handleChangeBrand}
            label="Brand"
            value={brand ? brand : "all"}
          >
            <MenuItem value="all">All</MenuItem>
            {brandList.map((item) => (
              <MenuItem value={item.brandId} key={item.brandId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Fuel</InputLabel>
          <Select
            label="Fuel"
            value={fuelType ? fuelType : "all"}
            fullWidth
            onChange={handleChangeFuelType}
          >
            <MenuItem value="all">All</MenuItem>
            {fuelTypeList.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Transmission</InputLabel>
          <Select
            label="Transmission"
            value={transmission ? transmission : "all"}
            fullWidth
            onChange={handleChangeTranmission}
          >
            <MenuItem value="all">All</MenuItem>
            {transmissionType.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Available</InputLabel>
          <Select
            label="Available"
            value={status ? status : "all"}
            fullWidth
            onChange={handleChangeStatus}
          >
            <MenuItem value="all">All</MenuItem>
            {statusList.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};
