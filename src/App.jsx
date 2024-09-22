import React, { lazy, Suspense } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import MobileNav from "./Components/MobileNav";
import Footer from "./Components/Footer";

// Lazy loaded components
const Home = lazy(() => import("./Pages/Home"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const Login = lazy(() => import("./Pages/Login"));

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Work Sans", sans-serif`,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={null}>
          <Nav />
          <MobileNav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/Login" element={<Login />} />
          </Routes>

          <Footer />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
