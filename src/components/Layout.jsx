import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box p={0} minH={"75vh"}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
