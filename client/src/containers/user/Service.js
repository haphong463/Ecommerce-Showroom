import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  TextField,
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
  return (
    <LayoutUser
      img="https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?w=1380&t=st=1701960277~exp=1701960877~hmac=dde5d8f4ffca8200e8a72157dfe8acd7313fe232dc55c2959dc0ecd59271f6bf"
      title="Our Service"
      description="AutoCar is an efficient and convenient vehicle management system for car showrooms."
    >
      <Box component="section">
        <Paper sx={{ my: 10 }} elevation={0}>
          <Typography
            align="center"
            sx={{
              fontSize: ["1.5rem", "2rem"],
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
                              p: 3,
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
                                  fontSize: ["1rem", "1.3rem"],
                                }}
                                variant="h6"
                                className="title-text"
                              >
                                {item.name}
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
      <Box component="section">
        <Paper sx={{ my: 10 }} elevation={0}>
          <Typography
            align="center"
            sx={{
              fontSize: ["1.5rem", "2rem"],
            }}
            className="title-specs"
          >
            <span className="title-text">MAKE APPOINTMENT</span>
          </Typography>
          <Container
            sx={{
              my: 3,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Full name"
                      placeholder="enter your name..."
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone number"
                      placeholder="enter your phone number..."
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      placeholder="enter your email..."
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Service content"
                      placeholder="enter your service content..."
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    backgroundColor: "#003580",
                    color: "#fff",
                    px: 1,
                    py: 2,
                    height: "100%",
                  }}
                >
                  <Stack sx={{ mx: 2 }} spacing={2}>
                    <Stack>
                      <Typography variant="body1" fontWeight={600}>
                        Address
                      </Typography>
                      <Typography variant="body2">
                        590 Cach Mang Thang Tam, District 3, Ho Chi Minh City.
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" fontWeight={600}>
                        Hotline
                      </Typography>
                      <Typography variant="body2">+123 456 7890</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" fontWeight={600}>
                        Work time
                      </Typography>
                      <Typography variant="body2">
                        From Monday to Saturday, 08.00 - 17.00
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>

      <FAQ />
    </LayoutUser>
  );
}
