import React from "react";
import { Box, Flex, Text, Image, Link, Icon, Stack } from "@chakra-ui/react";
import { BsGeoAltFill, BsEnvelopeAtFill, BsInstagram } from "react-icons/bs";
import Logo from "../assets/logo.png";

function Footer() {
  return (
    <Box bg="#14A75B" color="white" py={10} px={{ base: 4, md: 24 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
      >
        {/* Logo dan Nama */}
        <Flex align="center" gap={4}>
          <Image src={Logo} alt="Logo Dinas Kesehatan" boxSize="60px" />
          <Box>
            <Text fontWeight={700} fontSize="lg">
              Dinas Kesehatan
            </Text>
            <Text fontSize="md">Kabupaten Paser</Text>
          </Box>
        </Flex>
        {/* Info Kontak */}
        <Stack spacing={2} fontSize="md">
          <Flex align="center" gap={2}>
            <Icon as={BsGeoAltFill} />
            <Text>Jl. Noto Sunardi No. 1, Tana Paser, Kalimantan Timur</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Icon as={BsEnvelopeAtFill} />
            <Link
              href="mailto:dinkes@paserkab.go.id"
              color="white"
              _hover={{ color: "blue.200" }}
            >
              dinkes@paserkab.go.id
            </Link>
          </Flex>
          <Flex align="center" gap={2}>
            <Icon as={BsInstagram} />
            <Link
              href="https://instagram.com/dinkespaser"
              isExternal
              color="white"
              _hover={{ color: "pink.200" }}
            >
              @dinkespaser
            </Link>
          </Flex>
        </Stack>
      </Flex>
      <Box
        borderTop="1px"
        borderColor="whiteAlpha.400"
        mt={8}
        pt={4}
        textAlign="center"
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Dinas Kesehatan Kabupaten Paser. All
          rights reserved.
        </Text>
      </Box>
    </Box>
  );
}

export default Footer;
