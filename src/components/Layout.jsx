import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box minH={"75vh"}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;
