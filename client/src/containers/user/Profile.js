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
import { PrivacyInformation } from "../../components/Profile/PrivacyInformation";
import { getCustomerById } from "../../components/Customer/CustomerLibrary";
import { useTitle } from "../../UseTitle";
import OrderDetailsInformation from "../../components/Profile/OrderDetailsInformation";

export const Profile = () => {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { token } = useContext(DataContext);
  const [information, setInformation] = useState({});
  useEffect(() => {
    setLoading(true);
    getCustomerById(token.Id).then((data) => {
      if (data) {
        setInformation(data);
        setLoading(false);
      }
    });
  }, []);
  console.log(information);
  useTitle("Profile");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <LayoutUser>
      <Box
        component="section"
        sx={{
          mb: 25,
          height: "50vh",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid item xs={12} md={8}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Information" value="1" />
                    <Tab label="Privacy" value="2" />
                    <Tab label="Orders" value="3" />
                  </TabList>
                </Box>
                <ProfileInformation
                  information={information}
                  setInformation={setInformation}
                  loading={loading}
                  token={token}
                />
                <PrivacyInformation />
                <TabPanel value="3">
                  <OrderDetailsInformation order={information.order ?? []} />
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LayoutUser>
  );
};
