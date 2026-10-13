import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";

const desktopQuery = "(min-width: 80em)";

function Layout({ children }) {
  const [isDesktop, setIsDesktop] = useState(() =>
    window.matchMedia(desktopQuery).matches
  );

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const handleChange = () => setIsDesktop(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <Box bg="var(--page-bg)" color="var(--text)" minH="100vh">
      {isDesktop ? <Navbar /> : <MobileNavbar />}
      <Box p={0} minH="75vh">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
