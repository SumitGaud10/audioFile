import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MusicNote } from "@mui/icons-material";
import React, { useState } from "react";
import AutoFillModal from "./AutoFillModal";

const TopBar = React.memo(() => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MusicNote />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Audio File
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default TopBar;
