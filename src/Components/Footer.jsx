import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import XIcon from "@mui/icons-material/X";

function Footer() {
  return (
    <Stack sx={{ backgroundColor: "black", color: "white", height: "50vh" }}>
      lkcjc
      <Stack spacing={1} sx={{ padding: "20px" }}>
        <Box sx={{ border: "1px solid white" }} />
        <Stack>
          <Typography>Thewriteblog</Typography>
          <Stack>
            <Box
              sx={{
                borderRadius: "50%",
                backgroundColor: "grey",
                display: "flex",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                alignItems: "center",
              }}
            >
              <XIcon sx={{ color: "white" }} />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
