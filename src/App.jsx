import React from "react";
import "./App.css";
import Nav from "./Components/Nav";
import Hero from "./Components/Hero";
import { createTheme, ThemeProvider } from "@mui/material";
import Featured from "./Components/Featured";
import Overview from "./Components/Overview";
import Footer from "./Components/Footer";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Work Sans", sans-serif`,
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Nav /> */}
        <Hero />
        <Overview />
        <Featured />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
