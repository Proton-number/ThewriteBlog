import { Box, Typography, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/HeroImages/Barca Img 1.jpg",
    "/HeroImages/pexels-suzyhazelwood-2718645.jpg",
    "/HeroImages/Barca Img 2.jpg",
    "/HeroImages/pexels-antonio-batinic-2573434-4164418.jpg",
    "/HeroImages/wallhaven-l825vl_1280x800.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <Box
      sx={{
        backgroundImage: `url("${images[currentImage]}")`,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Stack
        sx={{
          width: { sm: "66%", lg: "52%" },
          padding: "30px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "45px", sm: "80px", lg: "120px" } }}
        >
          TheWriteBlog
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "16px", sm: "18px", lg: "30px" } }}
        >
          Join me as I explore whatever catches my eye—from new music and the
          beautiful game to everyday moments and tech insights, all in one
          place.
        </Typography>
      </Stack>
    </Box>
  );
}

export default Hero;
