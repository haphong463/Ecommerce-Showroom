import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../appStore";
import { RouteItem } from "./RouteItem";
import CarIcon from "@mui/icons-material/DriveEta";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import BackgroundImage from "../../assets/images/HD-wallpaper-black-background-car-cars-vehicles.jpg";
import { Divider } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(10px)",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  filter: "brightness(65%)",
});

const routes = [
  {
    route: "/admin/",
    primary: "Dashboard",
    icon: <MenuIcon />,
    position: "top",
  },
  {
    route: "/admin/vehicles",
    primary: "Vehicles",
    icon: <CarIcon />,
    position: "top",
  },
  {
    route: "/admin/brand",
    primary: "Brand",
    icon: <CategoryIcon />,
    position: "top",
  },
  {
    route: "/admin/settings",
    primary: "Settings",
    icon: <SettingsIcon />,
    position: "bot",
  },
  {
    route: "/admin/login",
    primary: "Login",
    icon: <LoginIcon />,
    position: "bot",
  },
  {
    route: "/admin/logout",
    primary: "Logout",
    icon: <LogoutIcon />,
    position: "bot",
  },
];
export function Sidebar() {
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Box height={60} />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            position: "relative",
            color: "#fff",
          }}
          component="nav"
        >
          <Overlay />
          <Box>
            {routes.map(
              (route, index) =>
                route.position === "top" && (
                  <RouteItem
                    key={index}
                    navigate={navigate}
                    route={route.route}
                    primary={route.primary}
                    open={open}
                    icon={route.icon}
                  />
                )
            )}
          </Box>
          <Box>
            <List>
              <Divider sx={{ borderTop: "1px solid #2f2f2f" }} />

              {routes.map(
                (route, index) =>
                  route.position === "bot" && (
                    <RouteItem
                      key={index}
                      navigate={navigate}
                      route={route.route}
                      primary={route.primary}
                      open={open}
                      icon={route.icon}
                    />
                  )
              )}
            </List>
          </Box>
        </List>
      </Drawer>
    </Box>
  );
}
