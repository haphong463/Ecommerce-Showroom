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
import { ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
const routes = [
  {
    route: "/",
    primary: "Home",
    position: "top",
    icon: <HomeIcon />,
  },
  {
    route: "/about",
    primary: "About Us",
    position: "top",
    icon: <InfoIcon />,
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
        sx={{ color: "#fff", mr: 3, letterSpacing: 5 }}
        size="large"
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
