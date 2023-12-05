// Import thêm AppBar từ Material-UI
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { SideBar } from "./Sidebar";
import { useState } from "react";

const Header = ({ title, state, setState }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    // Thay thế Box bằng AppBar và thêm Toolbar
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "0 2px 3px rgba(28, 28, 28, 0.1)",
        backgroundColor: "#fff", // Màu nền trắng
        color: "#000", // Màu chữ đen
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {title}
        </Typography>
        <div sx={{ display: "flex" }}>
          <IconButton onClick={handleMenuClick} color="inherit">
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <ShoppingBagIcon color="action" />
            </Badge>
          </IconButton>
          <SideBar state={state} onSetState={setState} />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
