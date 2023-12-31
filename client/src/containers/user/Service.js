import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { LayoutUser } from "../../layout/LayoutUser";
import { FAQ } from "../../components/sub_components/FAQ";
import { deepOrange } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { getService } from "../../components/Service/ServiceLibrary";
import { ServiceContext } from "../../context/ServiceContext";
import { useTitle } from "../../UseTitle";
export function Service() {
  const [loading, setLoading] = useState(false);
  const { setServiceData, serviceData } = useContext(ServiceContext);
  useEffect(() => {
    setLoading(true);
    getService().then((data) => {
      if (data) {
        setLoading(false);
        setServiceData(data);
      }
    });
  }, []);
  useTitle("Service");
  return (
    <LayoutUser
      img="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title="Our Service"
      description="AutoCar is an efficient and convenient vehicle management system for car showrooms."
    >
      <Box component="section">
        <Paper sx={{ my: 10 }} elevation={0}>
          <Typography
            align="center"
            variant="h3"
            sx={{
              fontSize: ["1.5rem", "2.3rem", "3rem"],
            }}
            className="title-specs"
          >
            <span className="title-text">Maintenance and repair process</span>
          </Typography>
          <Typography align="center" variant="body2">
            Summary of some services provided at AutoCar car factory:
          </Typography>
          <Container
            sx={{
              my: 3,
            }}
          >
            <Grid
              container
              spacing={{
                xs: 0.5,
                sm: 4,
              }}
            >
              {!loading
                ? serviceData.map((item, index) => {
                    let icon;
                    if (item.name === "Test 1 2 3") {
                      icon = <CleaningServicesIcon />;
                    }
                    if (item.name === "Test 456") {
                      icon = <ConstructionIcon />;
                    }
                    return (
                      <Grid key={index} item xs={6} md={4} lg={3}>
                        <Paper elevation={0}>
                          <Card
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              p: 4,
                              mt: 2,
                              borderRadius: "12px",
                              border: "1px solid #333",
                            }}
                            elevation={0}
                          >
                            <Avatar
                              sx={{
                                bgColor: deepOrange[500],
                              }}
                            >
                              {icon}
                            </Avatar>
                            <CardContent>
                              <Typography
                                sx={{
                                  whiteSpace: "nowrap", // Add this line
                                  overflow: "hidden", // Add this line to hide overflow if needed
                                  textOverflow: "ellipsis",
                                }}
                                variant="h6"
                              >
                                <span className="title-text">{item.name}</span>
                              </Typography>
                            </CardContent>
                          </Card>
                        </Paper>
                      </Grid>
                    );
                  })
                : Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <Grid key={index} item xs={3}>
                        <Paper elevation={0}>
                          <Card
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              p: 3,
                              mt: 2,
                              borderRadius: "12px",
                              border: "1px solid #333",
                            }}
                            elevation={0}
                          >
                            <Skeleton
                              variant="circular"
                              width={40}
                              height={40}
                            />

                            <CardContent>
                              <Skeleton variant="text" width={100} />
                            </CardContent>
                          </Card>
                        </Paper>
                      </Grid>
                    );
                  })}
            </Grid>
          </Container>
        </Paper>
      </Box>

      <FAQ />
    </LayoutUser>
  );
}
