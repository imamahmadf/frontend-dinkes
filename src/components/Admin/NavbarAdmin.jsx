import React, { useContext } from "react";
import { Box, Flex, Text, Button, HStack, Icon } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RiLogoutBoxLine,
  RiHomeLine,
  RiUserLine,
  RiSettingsLine,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarAdmin = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: RiHomeLine },
    { name: "Kelola User", path: "/admin/users", icon: RiUserLine },
    { name: "Pengaturan", path: "/admin/settings", icon: RiSettingsLine },
  ];

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      borderBottom="1px"
      boxShadow="sm"
      bgColor={"#14A75B"}
      color={"white"}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={6}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo/Brand */}
        <Flex align="center">
          <Text fontSize="xl" fontWeight="bold">
            Admin Panel
          </Text>
        </Flex>

        {/* Navigation Items */}
        <HStack spacing={8}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                color={"white"}
                key={item.name}
                variant="ghost"
                size="sm"
                leftIcon={<Icon as={item.icon} />}
                _hover={{}}
                onClick={() => navigate(item.path)}
                fontWeight={isActive ? "semibold" : "normal"}
              >
                {item.name}
              </Button>
            );
          })}
        </HStack>

        {/* User Info & Logout */}
        <HStack spacing={4}>
          <Text fontSize="sm">{user?.name || "Admin"}</Text>
          <Button
            color={"white"}
            size="sm"
            variant="ghost"
            leftIcon={<Icon as={RiLogoutBoxLine} />}
            _hover={{
              color: "red.500",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavbarAdmin;
