import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export const RouteItem = ({
  primary,
  navigate,
  route,
  open,
  icon,
  disabled,
  ...props
}) => {
  const { logout } = useContext(DataContext);
  const handleClick = () => {
    if (primary === "Logout") {
      logout();
    } else {
      if (!disabled) {
        navigate(route);
      }
    }
  };
  return (
    <ListItem disablePadding sx={{ display: "block" }} onClick={handleClick}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        disabled={disabled}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={primary} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
