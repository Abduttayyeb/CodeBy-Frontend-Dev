useState
import { AppBar, Toolbar, IconButton, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from '../assets/images/logo.png'
import { useState } from "react";

const drawerWidth = 240;
const FRONTEND_URL = `https://${process.env.FRONTEND_HOST}.onrender.com`;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow:"none",
          borderBottom: "groove",
          borderBottomWidth: "thin",
          borderBottomColor: "#9d9696",
        }}
        color="black"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <Link
            href={FRONTEND_URL}
            underline="none"
            justifyContent={"center"}
            display={"flex"}
          >
            <img
              src={logo}
              alt="logo"
              style={{ color: "blue", cursor: "pointer", height: "40px" }}
            />
          </Link>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
