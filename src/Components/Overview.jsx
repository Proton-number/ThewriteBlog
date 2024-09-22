import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

function Overview() {
  const overview = [
    {
      img: "/OverviewImages/Barca Img 3.png",
      title: "All about Fc Barcelona",
      content:
        "Barça isn’t just a team—it’s a passion. From their style of play to legends like Messi, every match is pure excitement. Watching them is always something special.",
    },
    {
      img: "/OverviewImages/armin.png",
      title: "All about Anime",
      content:
        "Anime has always been a big part of my life. From the epic battles to the emotional stories, it's an escape into amazing worlds. Whether it's Attack on Titan or something new, anime keeps me hooked every time.",
    },
    {
      img: "/OverviewImages/music.png",
      title: "All about Music",
      content:
        "Music keeps me grounded. Whether I’m jamming to something new or going back to my favorites, there’s always a track that hits right. From rap to chill vibes, it’s all about the energy.",
    },
    {
      img: "/OverviewImages/tech.png",
      title: "All about Tech",
      content:
        "I’m always deep into projects, working with tools like React, Firebase, and Zustand. From building apps to refining workflows, I’ll be sharing my experiences, challenges, and lessons learned along the way.",
    },
  ];

  return (
    <Stack
      sx={{
        padding: "30px",
        backgroundColor: "#f2ecff",
        color: "black",
      }}
    >
      <Typography variant="h2">Overview</Typography>

      <Stack spacing={9} sx={{ padding: "20px" }}>
        {overview.map((data, index) => (
          <Stack
            direction={{ sm: "row" }}
            spacing={10}
            alignItems="center"
            key={index}
          >
            <Box
              sx={{
                width: { lg: "650px" },
                height: { lg: "720px" },
                overflow: "hidden",
              }}
            >
              <Box
                component={motion.img}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                src={data.img}
                alt={data.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Stack
              spacing={1}
              sx={{ width: { lg: "45%" }, marginTop: { xs: "10px", sm: 0 } }}
            >
              <Typography variant="h3">{data.title}</Typography>
              <Typography variant="subtitle2">{data.content}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Overview;
