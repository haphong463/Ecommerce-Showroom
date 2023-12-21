import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../appStore";
import { RouteItem } from "./RouteItem";
import CarIcon from "@mui/icons-material/DriveEta";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import BackgroundImage from "../../assets/images/HD-wallpaper-black-background-car-cars-vehicles.jpg";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Divider } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
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
    route: "/admin/car",
    primary: "Car",
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
    route: "/admin/customer",
    primary: "Customer",
    icon: <PersonIcon />,
    position: "top",
  },
  {
    route: "/admin/purchaseOrder",
    primary: "Purchase Orders",
    icon: <LocalShippingIcon />,
    position: "top",
  },
  {
    route: "/admin/employee",
    primary: "Employees",
    icon: <SupportAgentIcon />,
    position: "top",
  },
  {
    route: "/admin/salesOrder",
    primary: "Sale Orders",
    icon: <MiscellaneousServicesIcon />,
    position: "top",
  },
  {
    route: "/admin/service",
    primary: "Services",
    icon: <MiscellaneousServicesIcon />,
    position: "top",
  },
  {
    route: "/admin/invoice",
    primary: "Invoice",
    icon: <ReceiptIcon />,
    position: "top",
  },

  {
    route: "/admin/logout",
    primary: "Logout",
    icon: <LogoutIcon />,
    position: "bot",
  },
];
export function Sidebar() {
  const { token } = useContext(DataContext);
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const location = useLocation();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Box height={60} />
        <Box
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
          {token.Role === "Company" ? (
            <Box>
              <List>
                <RouteItem
                  navigate={navigate}
                  route="/admin/purchaseOrder"
                  primary="Purchase Order"
                  open={open}
                  icon={<LocalShippingIcon />}
                  disabled={location.pathname === "/admin/purchaseOrder"}
                />
              </List>
            </Box>
          ) : (
            <>
              <Box>
                <List>
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
                          disabled={location.pathname === route.route}
                        />
                      )
                  )}
                </List>
              </Box>
            </>
          )}
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
        </Box>
      </Drawer>
    </Box>
  );
}
