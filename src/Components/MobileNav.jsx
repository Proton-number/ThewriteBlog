import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  Stack,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { colorStore } from "../Store/colorStore";
import { motion, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function MobileNav() {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const {
    scrollY,
    setScrollY,
    backgroundColor,
    setBackgroundColor,
    color,
    setColor,
  } = colorStore();

  const location = useLocation();
  // Controls for the animation
  const controls = useAnimation();

  // Listen to scroll and update state
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Change background color based on scroll position
      if (window.scrollY > 4000) {
        setBackgroundColor("white");
        setColor("black");
      } else if (window.scrollY > 700) {
        setBackgroundColor("black");
        setColor("white");
      } else {
        setBackgroundColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animate the background color change
  useEffect(() => {
    controls.start({
      color,
      backgroundColor,
      transition: { duration: 0.5 },
    });
  }, [backgroundColor, controls, color]);

  return (
    <motion.div animate={controls}>
      <AppBar
        id="mobileNav"
        sx={{
          backgroundColor:
            location.pathname === "/" ? backgroundColor : "black",
          color: location.pathname === "/" ? color : "white",
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TheWriteBlog
          </Typography>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => setisDrawerOpen(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setisDrawerOpen(false)}
      >
        <Box width="280px">
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="close-icon"
              onClick={() => setisDrawerOpen(false)}
            >
              <CloseIcon
                fontSize="large"
              />
            </IconButton>
          </Toolbar>
        </Box>
      </Drawer>
    </motion.div>
  );
}

export default MobileNav;
