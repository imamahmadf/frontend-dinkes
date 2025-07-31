import React from "react";
import { Box, Container } from "@chakra-ui/react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";

function LayoutAdmin({ children }) {
  return (
    <Box>
      <NavbarAdmin />
      <Box pt={"30px"} minH={"75vh"}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutAdmin;
