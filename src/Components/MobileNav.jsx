import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  Stack,
  AppBar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, useAnimation } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginStore } from "../Store/loginStore";
import { colorStore } from "../Store/colorStore";

function MobileNav() {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const { user, logOut } = loginStore();
  const {
    scrollY,
    setScrollY,
    backgroundColor,
    setBackgroundColor,
    color,
    setColor,
  } = colorStore();

  const location = useLocation();
  const navigate = useNavigate();
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
            <MenuIcon fontSize="large" sx={{ color: color }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
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
              <CloseIcon fontSize="large" />
            </IconButton>
          </Toolbar>
          <Stack spacing={6} sx={{ alignItems: "center" }}>
            <Link
              style={{
                textDecoration: "none",
                color: location.pathname === "/" ? color : "white",
              }}
              to="/"
            >
              <Typography
                component={motion.p}
                whileHover={{ y: -2, textDecoration: "underline" }}
                variant="h6"
                sx={{ cursor: "pointer", color: "black" }}
              >
                Home
              </Typography>
            </Link>
            {user && (
              <Link
                style={{
                  textDecoration: "none",
                  color: location.pathname === "/" ? color : "white",
                }}
                to="/Blogs"
              >
                <Typography
                  component={motion.p}
                  whileHover={{ y: -2, textDecoration: "underline" }}
                  variant="body2"
                  sx={{ cursor: "pointer", color: "black" }}
                >
                  Blog Posts
                </Typography>
              </Link>
            )}

            {!user && (
              <Link to="/Login">
                <Button
                  variant="contained"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    textTransform: "none",
                    height: "42px",
                    width: "124px",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            )}
            {user && (
              <Button
                variant="contained"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  textTransform: "none",
                  height: "42px",
                  width: "124px",
                }}
                onClick={() => logOut(navigate)}
              >
                Log Out
              </Button>
            )}
          </Stack>
        </Box>
      </Drawer>
    </motion.div>
  );
}

export default MobileNav;
