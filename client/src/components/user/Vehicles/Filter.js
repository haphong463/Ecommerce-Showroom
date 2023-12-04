import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { VehicleContext } from "../../../context/VehicleContext";
import { DataContext } from "../../../context/DataContext";
import {
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { getBrandList } from "../../Brand/BrandLibrary";

export const Filter = ({ newVehicle, usedVehicle }) => {
  const { vehicleData } = useContext(VehicleContext);
  const [options, setOptions] = useState([]);
  const [brand, setBrand] = useState();
  const { setSearchData } = useContext(DataContext);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };
  const [BrandList, setBrandList] = useState([]);
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  useEffect(() => {
    let filterVehicles = usedVehicle ?? newVehicle;
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
    setSearchData(filterVehicles);
  }, [inputValue, brand]);
  useEffect(() => {
    const uniqueOptions = [
      ...new Set((newVehicle ?? usedVehicle).map((item) => item.name)),
    ]; // Lọc các giá trị name duy nhất
    setOptions(
      uniqueOptions.map((name, index) => ({
        label: name,
      }))
    );
  }, [vehicleData]);
  useEffect(() => {
    getBrandList().then((res) => {
      if (res.data !== null) {
        setBrandList(res.data);
      }
    });
  }, []);
  return (
    <>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        You want to buy a vehicle
      </Typography>
      <Stack>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Vehicle"
              variant="outlined"
              placeholder="Search vehicle by name..."
            />
          )}
          freeSolo
          disableClearable
          fullWidth
          inputValue={inputValue}
          onInputChange={handleInputChange}
          open={inputValue.length > 0}
        />
        <Select
          onChange={handleChangeBrand}
          value={
            brand ? brand : BrandList.length > 0 ? BrandList[0].brandId : ""
          }
        >
          <MenuItem value="all">All</MenuItem>
          {BrandList.map((item) => (
            <MenuItem value={item.brandId} key={item.brandId}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};
