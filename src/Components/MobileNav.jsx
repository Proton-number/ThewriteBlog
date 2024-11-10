import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  Stack,
  AppBar,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion, useAnimation } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginStore } from "../Store/loginStore";
import { colorStore } from "../Store/colorStore";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";

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
        <Box width="280px" >
          <Toolbar
            sx={{
              backgroundColor: "grey",
              color: "white",
              marginBottom: "30px",
            }}
          >
            <Stack sx={{ padding: "20px" }} spacing={2}>
              <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
                <Avatar src={user ? user.photoURL : ""} />

                {!user && (
                  <Link to="/Login">
                    <Typography
                      sx={{
                        color: "white",
                        opacity: "80%",
                        "&:hover": {
                          opacity: "100%",
                        },
                      }}
                    >
                      Sign in
                    </Typography>
                  </Link>
                )}
                {user && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      opacity: "80%",
                      "&:hover": {
                        opacity: "100%",
                      },
                    }}
                    onClick={() => logOut(navigate)}
                  >
                    Log out
                  </Typography>
                )}
              </Stack>
              <Typography>Hi, {user ? user?.displayName : "Guest"} </Typography>
            </Stack>
          </Toolbar>
          <Stack spacing={6} sx={{ alignItems: "left", marginLeft: "30px" }}>
            <Link
              style={{
                textDecoration: "none",
                color: location.pathname === "/" ? color : "white",
              }}
              to="/"
            >
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
                <HomeIcon sx={{ color: "black" }} />
                <Typography
                  component={motion.p}
                  whileHover={{ y: -2, textDecoration: "underline" }}
                  variant="body1"
                  sx={{ cursor: "pointer", color: "black" }}
                >
                  Home
                </Typography>
              </Stack>
            </Link>
            {user && (
              <Link
                style={{
                  textDecoration: "none",
                  color: location.pathname === "/" ? color : "white",
                }}
                to="/Blogs"
              >
                <Stack
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={3}
                >
                  <ArticleIcon sx={{ color: "black" }} />
                  <Typography
                    component={motion.p}
                    whileHover={{ y: -2, textDecoration: "underline" }}
                    variant="body1"
                    sx={{ cursor: "pointer", color: "black" }}
                  >
                    Blog Posts
                  </Typography>
                </Stack>
              </Link>
            )}
          </Stack>
        </Box>
      </Drawer>
    </motion.div>
  );
}

export default MobileNav;
