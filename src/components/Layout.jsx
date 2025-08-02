import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
function Layout({ children }) {
  return (
    <Box>
      <Flex display={{ base: "none", md: "flex" }}>
        <Navbar />
      </Flex>{" "}
      <Flex display={{ base: "flex", md: "none" }}>
        <MobileNavbar />
      </Flex>
      <Box p={0} minH={"75vh"}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
