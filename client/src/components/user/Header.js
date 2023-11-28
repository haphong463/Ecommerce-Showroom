// Header.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { SideBar } from "../../components/user/Sidebar";

const Header = ({ title, state, setState }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: 10,
        color: "#fff",
        padding: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          ml: 5,
          letterSpacing: 3,

          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        {title}
      </Typography>
      <SideBar state={state} onSetState={setState} />
    </Box>
  );
};

export default Header;
