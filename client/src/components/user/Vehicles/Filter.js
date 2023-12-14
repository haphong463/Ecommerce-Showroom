import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SwipeableDrawer,
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
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
    <>
      <Button
        onClick={toggleDrawer("top", true)}
        variant="outlined"
        sx={{
          fontSize: "1.2rem",
        }}
      >
        Filters
      </Button>
      <SwipeableDrawer
        BackdropProps={{ invisible: true }}
        anchor="top"
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
        sx={{
          zIndex: "1",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 10,
            mb: 5,
          }}
        >
          <Typography
            variant="body2"
            gutterBottom
            sx={{ marginBottom: 2, fontSize: ["1rem", "1.3rem"] }}
          >
            Are you looking for a car? Using filters will help you search more
            easily.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
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
            <Grid item xs={6} md={3}>
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
            <Grid item xs={6} md={3}>
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
            </Grid>
            <Grid item xs={6} md={3}>
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
            </Grid>
            <Grid item xs={6} md={3}>
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
            </Grid>
          </Grid>
        </Container>
      </SwipeableDrawer>
    </>
  );
};
