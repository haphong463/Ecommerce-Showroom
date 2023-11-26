import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const BrandForm = ({ open, onSetOpen, handleClose }) => {
  const [brand, setBrand] = useState({
    name: "",
    image: null,
    description: "",
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setBrand((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      setBrand((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(brand);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        NEW BRAND
      </DialogTitle>
      <DialogContent>
        <FormHelperText error>*All field is required!</FormHelperText>
        <form style={{ marginTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name*"
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Desctipion*"
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item xs={12}>
              <label
                htmlFor="image"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*" // Limit to image files if needed
                  onChange={handleChangeInput}
                  style={{ display: "none" }}
                  multiple
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: "100%" }}
                >
                  Upload Image
                </Button>
              </label>
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="info"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandForm;
