import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <Stack
      spacing={4}
      sx={{
        backgroundColor: "#262626",
        color: "white",
        padding: "30px",
      }}
    >
      <Stack spacing={2} sx={{ width: { lg: "100%" } }}>
        <Typography variant="h2">
          Life, music, code—everything that makes me tick.
        </Typography>
        <Typography variant="subtitle1">
          Transforming my ideas into reality, crafting each thought into action,
          and sharing the journey with you—one post at a time.
        </Typography>
      </Stack>
      <Stack spacing={1} sx={{ padding: "8px" }}>
        <Box sx={{ border: "1px solid white" }} />
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography>Thewriteblog</Typography>
          <Stack direction="row" spacing={2}>
            <XIcon
              sx={{
                height: "20px",
                width: "20px",
                opacity: "80%",
                "&:hover": {
                  opacity: "100%",
                },
                cursor: "pointer",
              }}
            />
            <GitHubIcon
              sx={{
                height: "20px",
                width: "20px",
                opacity: "80%",
                "&:hover": {
                  opacity: "100%",
                },
                cursor: "pointer",
              }}
            />
            <InstagramIcon
              sx={{
                height: "20px",
                width: "20px",
                opacity: "80%",
                "&:hover": {
                  opacity: "100%",
                },
                cursor: "pointer",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
