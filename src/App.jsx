import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import MobileNav from "./Components/MobileNav";
import Footer from "./Components/Footer";
import { loginStore } from "./Store/loginStore";
import { ping } from "ldrs";

ping.register();

// Default values shown

// Lazy loaded components
const Home = lazy(() => import("./Pages/Home"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const Login = lazy(() => import("./Pages/Login"));
const SingleBlog = lazy(() => import("./Pages/SingleBlog"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const About = lazy(() => import("./Pages/About"));

function App() {
  const { initializeAuthListener } = loginStore();

  useEffect(() => {
    initializeAuthListener();
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: `"Work Sans", sans-serif`,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "100vh",
              }}
            >
              <l-ping size="45" speed="2" color="white"></l-ping>
            </div>
          }
        >
          <Nav />
          <MobileNav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/singleBlog/:slug" element={<SingleBlog />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/about/:authorId" element={<About />} />
          </Routes>

          <Footer />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
