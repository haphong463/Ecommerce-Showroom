import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { LayoutUser } from "../../layout/LayoutUser";
import { FAQ } from "../../components/sub_components/FAQ";
export function Service() {
  return (
    <LayoutUser
      img="https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?w=1380&t=st=1701960277~exp=1701960877~hmac=dde5d8f4ffca8200e8a72157dfe8acd7313fe232dc55c2959dc0ecd59271f6bf"
      title="Our Service"
      description="AutoCar is an efficient and convenient vehicle management system for car showrooms. This system facilitates the management of cars, from inventory management, maintenance, repairs to sales. With AutoCar, car showrooms can optimize their business processes and save time and costs."
    >
      <Box component="section">
        <Paper sx={{ my: 10 }} elevation={0}>
          <Typography align="center" variant="h4" className="title-specs">
            <span className="title-text">Register for Service</span>
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
