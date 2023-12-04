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
import { ListItemIcon, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const routes = [
  {
    route: "/",
    primary: "Home",
    position: "top",
    icon: <HomeIcon />,
  },
  {
    route: "/vehicles",
    primary: "New vehicles",
    position: "top",
    icon: <DirectionsCarIcon />,
  },
  {
    route: "/vehiclesUsed",
    primary: "Used vehicles",
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
];

export function SideBar({ onSetState, state }) {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(DataContext);
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
          {user && (
            <Typography
              sx={{
                my: 2,
              }}
              align="center"
            >
              {user.Name}
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
                ((user && route.primary === "Sign Up") ||
                (user && route.primary === "Login") ? null : (
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
          {user && (
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
