import React, { useContext } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ColorModeButton } from "../ui/color-mode";

const navItems = [
  { name: "Beranda", path: "/" },
  { name: "Dashboard", path: "/admin" },
  { name: "Informasi", path: "/admin/daftar-informasi", match: ["/admin/daftar-informasi", "/admin/tambah-dokumen", "/admin/edit-dokumen"] },
  { name: "Berita", path: "/admin/daftar-berita", match: ["/admin/daftar-berita", "/admin/tambah-berita", "/admin/edit-berita"] },
  { name: "Permohonan", path: "/admin/daftar-permohonan", match: ["/admin/daftar-permohonan", "/admin/permohonan"] },
  { name: "Galeri", path: "/admin/galeri", match: ["/admin/galeri"] },
  { name: "Jumbotron", path: "/admin/jumbotron", match: ["/admin/jumbotron"] },
];

function isCurrent(pathname, item) {
  if (item.match) return item.match.some((path) => pathname.startsWith(path));
  return pathname === item.path;
}

const NavbarAdmin = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="#14A75B"
      color="white"
      boxShadow="sm"
    >
      <Flex
        maxW="1100px"
        mx="auto"
        px={{ base: 3, md: 6 }}
        py={3}
        align="center"
        gap={3}
      >
        <Text fontWeight="700" flexShrink={0}>
          Admin
        </Text>
        <Flex
          as="ul"
          listStyleType="none"
          m={0}
          p={0}
          gap={1}
          flex="1"
          minW={0}
          overflowX="auto"
        >
          {navItems.map((item) => {
            const active = isCurrent(location.pathname, item);
            return (
              <Box as="li" key={item.path} flexShrink={0}>
                <Button
                  size="sm"
                  variant="ghost"
                  color="white"
                  bg={active ? "whiteAlpha.300" : "transparent"}
                  fontWeight={active ? "700" : "500"}
                  _hover={{ bg: "whiteAlpha.300" }}
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </Button>
              </Box>
            );
          })}
        </Flex>
        <Flex align="center" gap={2} flexShrink={0}>
          <ColorModeButton
            variant="outline"
            color="white"
            borderColor="white"
            bg="transparent"
            _hover={{ bg: "whiteAlpha.200" }}
            size="sm"
          />
          <Text fontSize="sm" display={{ base: "none", md: "block" }} maxW="140px" lineClamp={1}>
            {user?.name || "Admin"}
          </Text>
          <Button
            size="sm"
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={handleLogout}
          >
            Keluar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavbarAdmin;
