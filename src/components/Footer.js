import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        padding: "20px",
        justifyContent: "center",
        backgroundColor: "#262626",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ paddingBottom: "10px", opacity: 0.5 }}>
        Developed By {" "}
        <Link href="https://abduttayyeb.github.io" target="_blank" sx={{color:"white",}}>
          Abduttayyeb Mazhar
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
