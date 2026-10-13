import React from "react";
import { Box, Container } from "@chakra-ui/react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";

function LayoutAdmin({ children }) {
  return (
    <Box bg="var(--page-bg)" color="var(--text)" minH="100vh">
      <NavbarAdmin />
      <Box pt="76px" minH="75vh">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutAdmin;
