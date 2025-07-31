import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Button,
  Link,
  Text,
  Image,
  Spacer,
  VStack,
  HStack,
  IconButton,
  Drawer,
  CloseButton,
  Portal,
  Accordion,
  List,
  ListItem,
  Separator,
  Span,
} from "@chakra-ui/react";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import Logo from "../assets/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import icon1 from "../assets/dinkesicon1.png";
import icon2 from "../assets/dinkesicon2.png";
import icon3 from "../assets/dinkesicon3.png";

import iconPPID1 from "../assets/icona1.png";
import iconPPID2 from "../assets/icona2.png";
import iconPPID3 from "../assets/icona3.png";

import iconBidang1 from "../assets/iconbidang1.png";
import iconBidang2 from "../assets/iconbidang2.png";
import iconBidang3 from "../assets/iconbidang3.png";
import iconBidang4 from "../assets/iconbidang4.png";
import iconBidang5 from "../assets/iconbidang5.png";

import PenaLogo from "../assets/penaLogo.png";
import AptekaLogo from "../assets/logoApteka.png";
import PangkatLogo from "../assets/pangkatLogo.png";
import AsetLogo from "../assets/asetLogo.png";

const MotionBox = chakra(motion.div);

function MobileNavbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dinkes");
  const [selectedPPIDMenu, setSelectedPPIDMenu] = useState("profile");
  const [accordionValue, setAccordionValue] = useState([]);
  const navbarRef = useRef(null);
  const [isTop, setIsTop] = useState(true);

  // Data Puskesmas
  const puskesmasList = [
    "Tanah Grogot",
    "Senaken",
    "Padang Pangrapat",
    "Lolo",
    "Kuaro",
    "Long Ikis",
    "Kayungo",
    "Krayan",
    "Long Kail",
    "Mendik",
    "Sebakung Taka",
    "Batu Kajang",
    "Muara Komamam",
    "Muser",
    "Pasi Belengkong",
    "Suliliran Baru",
    "Suatang Baru",
    "Kerang",
    "Tanjung Aru",
  ];

  // Tutup drawer jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk menampilkan sub-menu berdasarkan pilihan
  const renderSubMenu = () => {
    switch (selectedMenu) {
      case "dinkes":
        return (
          <VStack spacing={2} align="stretch">
            <Button
              as={RouterLink}
              to="/dinkes/visi-misi"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Visi & Misi
            </Button>
            <Button
              as={RouterLink}
              to="/dinkes/struktur"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Struktur Organisasi
            </Button>
            <Button
              as={RouterLink}
              to="/dinkes/tugas-fungsi"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Tugas & Fungsi
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
            >
              • Tentang Dinas
            </Button>
          </VStack>
        );
      case "puskesmas":
        return (
          <VStack spacing={2} align="stretch">
            {puskesmasList.map((puskesmas, index) => (
              <Button
                key={index}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize="14px"
                fontWeight="normal"
                px={4}
                py={2}
                h="auto"
                minH="40px"
              >
                • {puskesmas}
              </Button>
            ))}
          </VStack>
        );
      case "uptd":
        return (
          <VStack spacing={2} align="stretch">
            <Button
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
            >
              • Labkesda
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
            >
              • Gudang Farmasi
            </Button>
          </VStack>
        );
      default:
        return null;
    }
  };

  // Fungsi untuk menampilkan sub-menu PPID berdasarkan pilihan
  const renderPPIDSubMenu = () => {
    switch (selectedPPIDMenu) {
      case "profile":
        return (
          <VStack spacing={2} align="stretch">
            <Button
              as={RouterLink}
              to="/ppid/profile"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Profile Pelaksana
            </Button>
            <Button
              as={RouterLink}
              to="/ppid/tugas-dan-fungsi"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Tugas & Fungsi
            </Button>
          </VStack>
        );
      case "informasi":
        return (
          <VStack spacing={2} align="stretch">
            <Button
              as={RouterLink}
              to="/informasi/berkala"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Berkala
            </Button>
            <Button
              as={RouterLink}
              to="/informasi/publik"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Publik
            </Button>
            <Button
              as={RouterLink}
              to="/informasi/serta-merta"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Serta Merta
            </Button>
            <Button
              as={RouterLink}
              to="/informasi/setiap-saat"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Setiap Saat
            </Button>
          </VStack>
        );
      case "layanan":
        return (
          <VStack spacing={2} align="stretch">
            <Button
              as={RouterLink}
              to="/pelayanan/permohonan"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Permohonan
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
            >
              • Pengajuan Keberatan
            </Button>
            <Button
              as={RouterLink}
              to="/pelayanan/cek-permohonan"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • Cek Status
            </Button>
          </VStack>
        );
      case "sop":
        return (
          <VStack spacing={2} align="stretch">
            <Button
              as={RouterLink}
              to="/sop/pengajuan-informasi"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
              onClick={() => setIsOpen(false)}
            >
              • SOP Permohonan Informasi
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              justifyContent="flex-start"
              textAlign="left"
              fontSize="14px"
              fontWeight="normal"
              px={4}
              py={2}
              h="auto"
              minH="40px"
            >
              • SOP sanggahan Informasi
            </Button>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      as="nav"
      w="100%"
      bgColor={isOpen ? "#14A75B" : isTop ? "transparent" : "#14A75B"}
      color="white"
      boxShadow="md"
      position="fixed"
      top={0}
      zIndex={100}
      ref={navbarRef}
      transition="background-color 0.4s cubic-bezier(0.4,0,0.2,1)"
      style={{
        backdropFilter: isTop ? "blur(2px)" : "none",
        WebkitBackdropFilter: isTop ? "blur(2px)" : "none",
      }}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        align="center"
        justify="space-between"
        py="20px"
        px={4}
      >
        <Flex gap={3} alignItems="center">
          <Image height="40px" src={Logo} alt="Logo" />
          <Box>
            <Text color="white" fontSize="16px" fontWeight={700}>
              Dinas Kesehatan
            </Text>
            <Text color="white" mt={0} fontSize="14px">
              Kabupaten Paser
            </Text>
          </Box>
        </Flex>

        <HStack spacing={2}>
          {isAuthenticated && (
            <Button
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={logout}
              size="sm"
              fontSize="sm"
            >
              Logout
            </Button>
          )}
          <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <Drawer.Trigger asChild>
              {/* <IconButton
                aria-label="Open menu"
                icon={<BiMenu />}
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.300" }}
                size="lg"
              /> */}
              <Button>buka</Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content
                  bg="#14A75B"
                  color="white"
                  maxW="100vw"
                  w="100vw"
                >
                  <Drawer.Header
                    borderBottomWidth="1px"
                    borderColor="whiteAlpha.300"
                  >
                    <Flex gap={3} alignItems="center">
                      <Image height="40px" src={Logo} alt="Logo" />
                      <Box>
                        <Text color="white" fontSize="16px" fontWeight={700}>
                          Dinas Kesehatan
                        </Text>
                        <Text color="white" mt={0} fontSize="14px">
                          Kabupaten Paser
                        </Text>
                      </Box>
                    </Flex>
                  </Drawer.Header>
                  <Drawer.Body>
                    <VStack spacing={4} align="stretch" mt={4}>
                      {/* HOME */}
                      <Button
                        as={RouterLink}
                        to="/"
                        variant="ghost"
                        color="white"
                        _hover={{ bg: "whiteAlpha.200" }}
                        justifyContent="flex-start"
                        fontSize="16px"
                        fontWeight="medium"
                        py={3}
                        onClick={() => setIsOpen(false)}
                      >
                        HOME
                      </Button>

                      <Separator mx={0} />

                      {/* PROFIL */}
                      <Accordion.Root
                        value={accordionValue}
                        onValueChange={(e) => setAccordionValue(e.value)}
                      >
                        <Accordion.Item value="profil">
                          <Accordion.ItemTrigger
                            _hover={{ bg: "whiteAlpha.200" }}
                            py={3}
                            px={0}
                            w="100%"
                            textAlign="left"
                            fontSize="16px"
                            fontWeight="medium"
                            color="white"
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Span>PROFIL</Span>
                            <Accordion.ItemIndicator color="white" />
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <Accordion.ItemBody pb={4} px={0}>
                              <VStack spacing={2} align="stretch">
                                <HStack spacing={3} mb={4}>
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedMenu === "dinkes"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedMenu === "dinkes"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() => setSelectedMenu("dinkes")}
                                    flex={1}
                                  >
                                    <Image
                                      src={icon1}
                                      alt="Dinkes"
                                      boxSize="20px"
                                      mr={2}
                                    />
                                    Dinkes
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedMenu === "puskesmas"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedMenu === "puskesmas"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() => setSelectedMenu("puskesmas")}
                                    flex={1}
                                  >
                                    <Image
                                      src={icon2}
                                      alt="Puskesmas"
                                      boxSize="20px"
                                      mr={2}
                                    />
                                    Puskesmas
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedMenu === "uptd"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedMenu === "uptd"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() => setSelectedMenu("uptd")}
                                    flex={1}
                                  >
                                    <Image
                                      src={icon3}
                                      alt="UPTD"
                                      boxSize="20px"
                                      mr={2}
                                    />
                                    UPTD
                                  </Button>
                                </HStack>
                                {renderSubMenu()}
                              </VStack>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      </Accordion.Root>

                      <Separator mx={0} />

                      {/* PPID */}
                      <Accordion.Root
                        value={accordionValue}
                        onValueChange={(e) => setAccordionValue(e.value)}
                      >
                        <Accordion.Item value="ppid">
                          <Accordion.ItemTrigger
                            _hover={{ bg: "whiteAlpha.200" }}
                            py={3}
                            px={0}
                            w="100%"
                            textAlign="left"
                            fontSize="16px"
                            fontWeight="medium"
                            color="white"
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text>PPID</Text>
                            <Accordion.ItemIndicator color="white" />
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <Accordion.ItemBody pb={4} px={0}>
                              <VStack spacing={2} align="stretch">
                                <HStack spacing={2} mb={4} flexWrap="wrap">
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedPPIDMenu === "profile"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedPPIDMenu === "profile"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() =>
                                      setSelectedPPIDMenu("profile")
                                    }
                                  >
                                    <Image
                                      src={iconPPID1}
                                      alt="Profile"
                                      boxSize="16px"
                                      mr={1}
                                    />
                                    Profile
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedPPIDMenu === "informasi"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedPPIDMenu === "informasi"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() =>
                                      setSelectedPPIDMenu("informasi")
                                    }
                                  >
                                    <Image
                                      src={iconPPID2}
                                      alt="Informasi"
                                      boxSize="16px"
                                      mr={1}
                                    />
                                    Informasi
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedPPIDMenu === "layanan"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedPPIDMenu === "layanan"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() =>
                                      setSelectedPPIDMenu("layanan")
                                    }
                                  >
                                    <Image
                                      src={iconPPID3}
                                      alt="Layanan"
                                      boxSize="16px"
                                      mr={1}
                                    />
                                    Layanan
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      selectedPPIDMenu === "sop"
                                        ? "solid"
                                        : "ghost"
                                    }
                                    bg={
                                      selectedPPIDMenu === "sop"
                                        ? "whiteAlpha.300"
                                        : "transparent"
                                    }
                                    color="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    onClick={() => setSelectedPPIDMenu("sop")}
                                  >
                                    <Image
                                      src={iconPPID2}
                                      alt="SOP"
                                      boxSize="16px"
                                      mr={1}
                                    />
                                    SOP
                                  </Button>
                                </HStack>
                                {renderPPIDSubMenu()}
                              </VStack>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      </Accordion.Root>

                      <Separator mx={0} />

                      {/* PROGRAM */}
                      <Accordion.Root
                        value={accordionValue}
                        onValueChange={(e) => setAccordionValue(e.value)}
                      >
                        <Accordion.Item value="program">
                          <Accordion.ItemTrigger
                            _hover={{ bg: "whiteAlpha.200" }}
                            py={3}
                            px={0}
                            w="100%"
                            textAlign="left"
                            fontSize="16px"
                            fontWeight="medium"
                            color="white"
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text>PROGRAM</Text>
                            <Accordion.ItemIndicator color="white" />
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <Accordion.ItemBody pb={4} px={0}>
                              <VStack spacing={2} align="stretch">
                                <Button
                                  as={RouterLink}
                                  to="/bidang/yankes"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Image
                                    src={iconBidang1}
                                    alt="Yankes"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  Yankes - Pelayanan Kesehatan
                                </Button>
                                <Button
                                  as={RouterLink}
                                  to="/bidang/sdk"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Image
                                    src={iconBidang2}
                                    alt="SDK"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  SDK - Sumber Daya Kesehatan
                                </Button>
                                <Button
                                  as={RouterLink}
                                  to="/bidang/kesmas"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Image
                                    src={iconBidang3}
                                    alt="Kesmas"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  Kesmas - Kesehatan Masyarakat
                                </Button>
                                <Button
                                  as={RouterLink}
                                  to="/bidang/sekret"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Image
                                    src={iconBidang4}
                                    alt="Sekretariat"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  Sekretariat - Administrasi & Keuangan
                                </Button>
                                <Button
                                  as={RouterLink}
                                  to="/bidang/p2p"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Image
                                    src={iconBidang5}
                                    alt="P2P"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  P2P - Pencegahan & Pengendalian Penyakit
                                </Button>
                              </VStack>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      </Accordion.Root>

                      <Separator mx={0} />

                      {/* GALERI */}
                      <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: "whiteAlpha.200" }}
                        justifyContent="flex-start"
                        fontSize="16px"
                        fontWeight="medium"
                        py={3}
                      >
                        GALERI
                      </Button>

                      <Separator mx={0} />

                      {/* APLIKASI */}
                      <Accordion.Root
                        value={accordionValue}
                        onValueChange={(e) => setAccordionValue(e.value)}
                      >
                        <Accordion.Item value="aplikasi">
                          <Accordion.ItemTrigger
                            _hover={{ bg: "whiteAlpha.200" }}
                            py={3}
                            px={0}
                            w="100%"
                            textAlign="left"
                            fontSize="16px"
                            fontWeight="medium"
                            color="white"
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text>APLIKASI</Text>
                            <Accordion.ItemIndicator color="white" />
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <Accordion.ItemBody pb={4} px={0}>
                              <VStack spacing={2} align="stretch">
                                <Button
                                  as="a"
                                  href="https://pena.dinkes.paserkab.go.id/login"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                >
                                  <Image
                                    src={PenaLogo}
                                    alt="Pena"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  Pena Dinkes - Sistem Informasi Dinkes
                                </Button>
                                <Button
                                  as="a"
                                  href="https://kenaikan-pangkat.dinkes.paserkab.go.id"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                >
                                  <Image
                                    src={PangkatLogo}
                                    alt="Pangkat"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  Kenaikan Pangkat - Sistem Kenaikan Pangkat
                                </Button>
                                <Button
                                  as="a"
                                  href="https://aset.dinkes.paserkab.go.id"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                >
                                  <Image
                                    src={AsetLogo}
                                    alt="Aset"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  Aset Dinkes - Sistem Manajemen Aset
                                </Button>
                                <Button
                                  as="a"
                                  href="https://sdmk.dinkes.paserkab.go.id"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                >
                                  <Image
                                    src={iconBidang4}
                                    alt="SDMK"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  SDMK - Sistem Data Manajemen Kesehatan
                                </Button>
                                <Button
                                  as="a"
                                  href="https://sdmk.dinkes.paserkab.go.id"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="ghost"
                                  color="white"
                                  _hover={{ bg: "whiteAlpha.200" }}
                                  justifyContent="flex-start"
                                  fontSize="14px"
                                  py={2}
                                >
                                  <Image
                                    src={AptekaLogo}
                                    alt="Apteka"
                                    boxSize="20px"
                                    mr={3}
                                  />
                                  APTEKA - Aplikasi Pengelolaan Persedian Obat
                                </Button>
                              </VStack>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      </Accordion.Root>

                      <Separator mx={0} />

                      {/* LAPORAN */}
                      <Button
                        variant="ghost"
                        color="white"
                        _hover={{ bg: "whiteAlpha.200" }}
                        justifyContent="flex-start"
                        fontSize="16px"
                        fontWeight="medium"
                        py={3}
                      >
                        LAPORAN
                      </Button>
                    </VStack>
                  </Drawer.Body>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton
                      color="white"
                      size="lg"
                      position="absolute"
                      top={4}
                      right={4}
                    />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </HStack>
      </Flex>
    </Box>
  );
}

export default MobileNavbar;
