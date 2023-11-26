import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../appStore";
import { RouteItem } from "./RouteItem";
import CarIcon from "@mui/icons-material/DriveEta";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import BackgroundImage from "../../assets/images/HD-wallpaper-black-background-car-cars-vehicles.jpg";
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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
            <RouteItem
              navigate={navigate}
              route={"/"}
              primary={"Dashboard"}
              open={open}
              icon={<MenuIcon />}
            />
            <RouteItem
              navigate={navigate}
              route={"/vehicles"}
              primary={"Vehicles"}
              open={open}
              icon={<CarIcon />}
            />
            <RouteItem
              navigate={navigate}
              route={"/settings"}
              primary={"Settings"}
              open={open}
              icon={<SettingsIcon />}
            />
            <RouteItem
              navigate={navigate}
              route={"/brand"}
              primary={"Brand"}
              open={open}
              icon={<SettingsIcon />}
            />
          </Box>
          <Box>
            <List>
              <RouteItem
                navigate={navigate}
                route={"/logout"}
                primary={"Logout"}
                open={open}
                icon={<LogoutIcon />}
              />
            </List>
          </Box>
        </List>
      </Drawer>
    </Box>
  );
}
