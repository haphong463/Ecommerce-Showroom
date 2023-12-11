import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { VehicleContext } from "../../../context/VehicleContext";
import { DataContext } from "../../../context/DataContext";
import { getBrandList } from "../../Brand/BrandLibrary";

export const Filter = ({ vehicles }) => {
  const { setSearchData } = useContext(DataContext);
  const [options, setOptions] = useState([]);
  const [brand, setBrand] = useState();
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
    setSearchData(filterVehicles);
  }, [inputValue, brand]);

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

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
        You want to buy a vehicle
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={9}>
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
            open={open}
            onOpen={handleOpen}
            onClose={() => setOpen(false)}
            onInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            onChange={handleChangeBrand}
            value={brand ? brand : "all"}
            fullWidth
          >
            <MenuItem value="all">All</MenuItem>
            {brandList.map((item) => (
              <MenuItem value={item.brandId} key={item.brandId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </>
  );
};
