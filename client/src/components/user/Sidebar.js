import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { AppBar, ListItemIcon, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const routes = [
  {
    route: "/",
    primary: "Home",
    position: "top",
    icon: <HomeIcon />,
  },
  {
    route: "/vehicles",
    primary: "Vehicles",
    position: "top",
    icon: <DirectionsCarIcon />,
  },
  {
    route: "/about",
    primary: "About Us",
    position: "top",
    icon: <InfoIcon />,
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
  {
    route: "/logout",
    primary: "Logout",
    icon: <LogoutIcon />,
    position: "bot",
  },
];

export function SideBar({ onSetState, state }) {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const renderNavItems = (position) => {
    return routes
      .filter((route) => route.position === position)
      .map((route) => (
        <Button
          key={route.primary}
          component={NavLink}
          to={route.route}
          color="inherit"
          sx={{ marginRight: 2, fontWeight: 700 }}
        >
          {route.primary}
        </Button>
      ));
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

  if (isDesktop) {
    // Render app bar for desktop
    return (
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "#ffffff",
          color: "#333",
        }}
      >
        <Toolbar>
          {renderNavItems("top")}
          <Box sx={{ flexGrow: 1 }} />
          {renderNavItems("bot")}
        </Toolbar>
      </AppBar>
    );
  }

  // Render SwipeableDrawer for mobile
  return (
    <React.Fragment>
      <Button
        onClick={toggleDrawer("right", true)}
        sx={{
          color: "#fff",
          mr: 3,
          letterSpacing: 5,
          fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.5rem" },
          color: "#333",
        }}
        endIcon={<MenuIcon />}
      >
        MENU
      </Button>
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
                route.position === "bot" && (
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
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
