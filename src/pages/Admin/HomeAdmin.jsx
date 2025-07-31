import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Image,
  Flex,
  SimpleGrid,
  Center,
  Text,
  Button,
  HStack,
  VStack,
  Link,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import LayoutAdmin from "../../components/Admin/LayoutAdmin";
function HomeAdmin() {
  return (
    <LayoutAdmin>
      <Box pt={"120px"}>
        <Container>ADMIN WEB</Container>
      </Box>
    </LayoutAdmin>
  );
}

export default HomeAdmin;
