import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { colorStore } from "../Store/colorStore";

function Nav() {
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
        id="desktopNav"
        sx={{
          backgroundColor:
            location.pathname === "/" ? backgroundColor : "black",
          color: location.pathname === "/" ? color : "white",
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography
            variant="h3"
            sx={{ flexGrow: 1, fontSize: { sm: "30px", lg: "20px" } }}
          >
            TheWriteBlog
          </Typography>

          <Stack
            direction="row"
            sx={{ alignItems: "center" }}
            spacing={{ sm: 8, lg: 20 }}
          >
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
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                Home
              </Typography>
            </Link>

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
                sx={{
                  cursor: "pointer",
                }}
              >
                Blog Posts
              </Typography>
            </Link>

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
          </Stack>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Nav;
