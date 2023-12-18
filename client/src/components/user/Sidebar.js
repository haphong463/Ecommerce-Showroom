import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {
  Avatar,
  Badge,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import styled from "@emotion/styled";

const routes = [
  {
    route: "/",
    primary: "Home",
    position: "top",
    icon: <HomeIcon />,
  },
  {
    route: "/vehicles",
    primary: "New car",
    position: "top",
    icon: <DirectionsCarIcon />,
  },
  {
    route: "/vehiclesUsed",
    primary: "Buy used car",
    position: "top",
    icon: <DirectionsCarIcon />,
  },
  {
    route: "/service",
    primary: "Service",
    position: "top",
    icon: <InfoIcon />,
  },
  {
    route: "/profile",
    primary: "Profile",
    position: "bot",
    icon: <PersonIcon />,
  },
  {
    route: "/signup",
    primary: "Sign Up",
    position: "bot",
    icon: <AppRegistrationIcon />,
  },
  {
    route: "/login",
    primary: "Login",
    icon: <LoginIcon />,
    position: "bot",
  },
];
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
export function SideBar({ onSetState, state }) {
  const navigate = useNavigate();
  const { token, logout } = React.useContext(DataContext);
  const handleLogout = () => {
    logout();
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onSetState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>

      <IconButton onClick={toggleDrawer("right", true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          {token && (
            <Typography
              sx={{
                my: 2,
              }}
              align="center"
              variant="h6"
            >
              {token.Name}
            </Typography>
          )}
          <List>
            {routes.map(
              (route, index) =>
                route.position === "top" && (
                  <ListItem
                    key={route.primary}
                    onClick={() => navigate(route.route)}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.primary} />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
          <Divider />
          <List>
            {routes.map(
              (route) =>
                route.position === "bot" &&
                ((token && route.primary === "Sign Up") ||
                (token && route.primary === "Login") ? null : (
                  <ListItem
                    key={route.primary}
                    onClick={() => navigate(route.route)}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.primary} />
                    </ListItemButton>
                  </ListItem>
                ))
            )}
          </List>
          {token && (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
