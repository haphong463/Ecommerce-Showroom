// Import thêm AppBar từ Material-UI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { SideBar } from "./Sidebar";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const routes = [
  {
    route: "/",
    primary: "Home",
  },
  {
    route: "/vehicles",
    primary: "New car",
  },
  {
    route: "/vehiclesUsed",
    primary: "Buy used car",
  },
  {
    route: "/service",
    primary: "Services",
  },
  {
    route: "/about",
    primary: "About Us",
  },
];
const settings = [
  {
    route: "/login",
    primary: "Login",
  },
  {
    route: "/signup",
    primary: "Sign Up",
  },
];

const Header = ({ title, state, setState }) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const { token, user, logout, itemCart } = useContext(DataContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigate = (route) => {
    navigate(route);
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
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                fontFamily: "monospace",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {routes.map((route) => (
                <Button
                  key={route.primary}
                  onClick={() => navigate(route.route)}
                  className={
                    location.pathname === route.route ? "active-link" : ""
                  }
                  sx={{
                    my: 2,
                    display: "block",
                    color: "#333",
                    fontWeight: 600,
                    ":hover": {
                      color: "#fa921f",
                    },
                  }}
                >
                  {route.primary}
                </Button>
              ))}
            </Box>
          </Box>

          <div sx={{ display: "flex" }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, display: { xs: "none", md: "inline-block" } }}
            >
              <Avatar
                sx={{
                  width: "1.5em",
                  height: "1.5em",
                  "& img": {
                    objectFit: "contain",
                  },
                }}
                src={token && token.Avatar}
              />
            </IconButton>
            {isMobile && <SideBar state={state} onSetState={setState} />}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token ? (
                <Box component="div">
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <Typography textAlign="center">{token.Name}</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      setAnchorElUser(null);
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Box>
              ) : (
                settings.map((setting) => (
                  <MenuItem
                    key={setting.primary}
                    onClick={() => handleNavigate(setting.route)}
                  >
                    <Typography textAlign="center" fontWeight={600}>
                      {setting.primary}
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
