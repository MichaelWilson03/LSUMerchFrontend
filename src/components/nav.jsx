import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Box,
  Typography,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = ({ setToken, setUser, topOfHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleNavigateHome = () => {
    navigate("/");
    if (topOfHome.current) {
      topOfHome.current.scrollIntoView({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
    navigate("/");
    if (topOfHome.current) {
      topOfHome.current.scrollIntoView({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const menuItems = (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      color={"white"}
      gap={2}
      sx={{ "&:transform": { scale: 1.1 } }}
    >
      <Typography
        variant="h4"
        onClick={handleNavigateHome}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#3c1053",
          },
        }}
      >
        Home
      </Typography>
      <Typography
        variant="h4"
        onClick={() => navigate("/all-products")}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#3c1053",
          },
        }}
      >
        Shop All Products
      </Typography>
      {user ? (
        <Typography
          variant="h4"
          onClick={handleLogout}
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "#3c1053",
            },
          }}
        >
          Logout
        </Typography>
      ) : (
        <Typography
          variant="h4"
          onClick={() => navigate("/login")}
          sx={{
            cursor: "pointer",
            transform: { scale: 1.1 },
            "&:hover": {
              color: "#3c1053",
            },
          }}
        >
          Login/Register
        </Typography>
      )}
    </Box>
  );

  return (
    <nav id="nav-container">
      {matches ? (
        <Box mx={2}>{menuItems}</Box>
      ) : (
        <>
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { md: "none" },
              "&:hover": {
                color: "#3c1053",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
            <List sx={{}}>
              <ListItemButton
                onClick={handleNavigateHome}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#3c1053",
                    backgroundColor: "#d29f13",
                  },
                }}
              >
                <ListItemText primary="Home" />
              </ListItemButton>

              <ListItemButton
                onClick={() => navigate("/all-products")}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#3c1053",
                    backgroundColor: "#d29f13",
                  },
                }}
              >
                <ListItemText primary="Shop All Products" />
              </ListItemButton>
              {user ? (
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3c1053",
                      backgroundColor: "#d29f13",
                    },
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => navigate("/login")}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3c1053",
                      backgroundColor: "#d29f13",
                    },
                  }}
                >
                  <ListItemText primary="Login/Register" />
                </ListItemButton>
              )}
            </List>
          </Drawer>
        </>
      )}
    </nav>
  );
};

export default Nav;
