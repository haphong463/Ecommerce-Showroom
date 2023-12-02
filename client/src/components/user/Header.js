// Header.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { SideBar } from "../../components/user/Sidebar";

const Header = ({ title, state, setState, colorHeader }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: 0,
        color: "#333",
        padding: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 2px 3px rgba(28, 28, 28, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          ml: 3,
          fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.5rem" },
          fontWeight: "800",
        }}
      >
        {title}
      </Typography>
      <SideBar state={state} onSetState={setState} colorHeader={colorHeader} />
    </Box>
  );
};

export default Header;
