import React, { useContext, useEffect, useState } from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { Navigate, useParams } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ProfileInformation } from "../../components/Profile/ProfileInformation";

export const Profile = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const { token } = useContext(DataContext);
  if (!token) {
    return <Navigate to="/login"/>;
  }
  return (
    <LayoutUser>
      <Box
        component="section"
        sx={{
          my: 10,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Paper
                src={token.Avatar}
                width="500px"
                sx={{
                  objectFit: "contain",
                }}
                height="500px"
                component="img"
              ></Paper>
            </Grid>
            <Grid item xs={8}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Information" value="1" />
                    <Tab label="Privacy" value="2" />
                    <Tab label="Item Three" value="3" />
                  </TabList>
                </Box>
                <ProfileInformation token={token} id={id} />
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LayoutUser>
  );
};
