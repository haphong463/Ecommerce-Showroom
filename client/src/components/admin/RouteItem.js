import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

export const RouteItem = ({
  primary,
  navigate,
  route,
  open,
  icon,
  ...props
}) => {
  const handleClick = () => {
    if (primary === "Logout") {
      console.log("Logout clicked!");
    } else {
      navigate(route);
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
