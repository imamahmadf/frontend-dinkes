import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Link,
  Text,
  Image,
  Spacer,
  Separator,
  SimpleGrid,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import Logo from "../assets/logo.png";
import { Link as RouterLink } from "react-router-dom";

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

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("dinkes"); // State untuk menu yang dipilih
  const [selectedPPIDMenu, setSelectedPPIDMenu] = useState("profile"); // State untuk submenu PPID yang dipilih
  const [selectedProgramMenu, setSelectedProgramMenu] = useState("yankes"); // State untuk menu program yang dipilih
  const navbarRef = useRef(null);
  const [isTop, setIsTop] = useState(true);

  // Hapus semua ref menu yang tidak perlu
  const [dropdownTop, setDropdownTop] = useState(64); // default height navbar

  // Daftar menu
  const menus = [
    { key: "home", label: "HOME", dropdown: false },
    { key: "profil", label: "PROFIL", dropdown: true },
    { key: "informasi", label: "PPID", dropdown: true },
    { key: "standar", label: "PROGRAM", dropdown: true },
    { key: "galeri", label: "GALERI", dropdown: true },
    { key: "aplikasi", label: "APLIKASI", dropdown: true },
    { key: "laporan", label: "LAPORAN", dropdown: true },
  ];

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

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setSelectedPPIDMenu("profile"); // Reset PPID menu ke default
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Atur posisi dropdown tepat di bawah navbar
  useEffect(() => {
    if (openDropdown && navbarRef.current) {
      const rect = navbarRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom);
    }
  }, [openDropdown]);

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
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              Dinas Kesehatan
            </Text>
            <Flex direction="column" gap={2}>
              <Button
                as={RouterLink}
                to="/dinkes/visi-misi"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Visi & Misi
              </Button>
              <Button
                as={RouterLink}
                to="/dinkes/struktur"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Struktur Organisasi
              </Button>
              <Button
                as={RouterLink}
                to="/dinkes/tugas-fungsi"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Tugas & Fungsi
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Tentang Dinas
              </Button>
            </Flex>
          </Box>
        );
      case "puskesmas":
        return (
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              UPTD Puskesmas
            </Text>
            <SimpleGrid columns={[1, null, 3]} gap={1}>
              {puskesmasList.map((puskesmas, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="ghost"
                  color="whiteAlpha.900"
                  _hover={{ bg: "whiteAlpha.200", color: "white" }}
                  justifyContent="flex-start"
                  textAlign="left"
                  fontSize={"12px"}
                  fontWeight="normal"
                  px={2}
                  py={1}
                  h="auto"
                  minH="32px"
                >
                  • {puskesmas}
                </Button>
              ))}
            </SimpleGrid>
          </Box>
        );
      case "uptd":
        return (
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              UPTD Lainnya
            </Text>
            <Flex direction="column" gap={1}>
              <Button
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Labkesda
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Gudang Farmasi
              </Button>
            </Flex>
          </Box>
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
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              Profile PPID
            </Text>
            <SimpleGrid columns={[1, null, 1]} gap={1}>
              <Button
                as={RouterLink}
                to="/ppid/profile"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Profile Pelaksana
              </Button>
              <Button
                as={RouterLink}
                to="/ppid/tugas-dan-fungsi"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Tugas & Fungsu
              </Button>
            </SimpleGrid>
          </Box>
        );
      case "informasi":
        return (
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              Informasi
            </Text>
            <SimpleGrid columns={[2, null, 2]}>
              <Button
                as={RouterLink}
                to="/informasi/berkala"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Berkala
              </Button>
              <Button
                as={RouterLink}
                to="/informasi/publik"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Publik
              </Button>
              <Button
                as={RouterLink}
                to="/informasi/serta-merta"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Serta Merta
              </Button>
              <Button
                as={RouterLink}
                to="/informasi/setiap-saat"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Setiap Saat
              </Button>
            </SimpleGrid>
          </Box>
        );
      case "layanan":
        return (
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              Layanan PPID
            </Text>
            <SimpleGrid columns={[2, null, 2]}>
              <Button
                as={RouterLink}
                to="/pelayanan/permohonan"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • Permohonan
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Pengajuan Keberatan
              </Button>
              <Button
                as={RouterLink}
                to="/pelayanan/cek-permohonan"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • Cek Status
              </Button>
            </SimpleGrid>
          </Box>
        );
      case "sop":
        return (
          <Box>
            <Text
              fontSize={"14px"}
              fontWeight={600}
              mb={2}
              color="whiteAlpha.900"
            >
              SOP PPID
            </Text>
            <SimpleGrid columns={[2, null, 1]}>
              <Button
                as={RouterLink}
                to="/sop/pengajuan-informasi"
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
                onClick={() => setOpenDropdown(null)}
              >
                • SOP Permohonan Informasi
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                justifyContent="flex-start"
                textAlign="left"
                fontSize={"12px"}
                fontWeight="normal"
                px={2}
                py={1}
                h="auto"
                minH="32px"
              >
                • SOP sanggahan Informasi
              </Button>
            </SimpleGrid>
          </Box>
        );
      default:
        return null;
    }
  };

  // Dropdown content
  const renderDropdown = (type) => {
    const closeButton = (
      <Button
        onClick={() => {
          setOpenDropdown(null);
          setSelectedPPIDMenu("profile"); // Reset PPID menu ke default
        }}
        position="absolute"
        top="16px"
        right="32px"
        zIndex={100}
        bg="transparent" // Ubah jadi transparan
        color="white"
        size="sm"
        fontSize="30px"
        fontWeight="bold"
        _hover={{ bg: "whiteAlpha.400" }} // Hover tetap ada efek, tapi transparan
        aria-label="Tutup dropdown"
      >
        ×
      </Button>
    );
    if (type === "profil") {
      return (
        <MotionBox
          borderTop="2px solid white"
          position="fixed"
          left={0}
          top={dropdownTop + "px"}
          width="100vw"
          minH="180px"
          boxShadow="lg"
          bgColor={"#14A75B"}
          zIndex={99}
          px={{ base: 6, md: 24 }}
          py={8}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "fixed" }}
          color={"white"}
        >
          {closeButton}
          <Flex
            width="1200px"
            gap={{ base: 6, md: 5 }}
            direction={{ base: "column", md: "row" }}
          >
            <Box maxWidth={"300px"}>
              <Text fontSize={"20px"} fontWeight={600}>
                {" "}
                PROFIL DINAS KESEHATAN
              </Text>
              <Text>KABUPATEN PASER</Text>
              <Text mt={"30px"}>
                Temukan informasi penting tentang pendidikan, kesehatan, dan
                lainnya, serta dapatkan panduan berguna untuk setiap tahapan
                kehidupan Anda.
              </Text>
            </Box>{" "}
            <Separator orientation="vertical" mx={0} />
            <SimpleGrid columns={[1, null, 1]} gap="20px">
              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedMenu("dinkes")}
                bg={
                  selectedMenu === "dinkes" ? "whiteAlpha.300" : "transparent"
                }
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={icon1}
                    alt="icon1"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Dinas Kesehatan</Text>
                  <Text fontSize={"12px"}>
                    Visi Misi, Struktur, Fungsi dan Tentang Dinas
                  </Text>
                </Box>
              </Flex>

              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedMenu("puskesmas")}
                bg={
                  selectedMenu === "puskesmas"
                    ? "whiteAlpha.300"
                    : "transparent"
                }
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={icon2}
                    alt="icon2"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>UPTD Puskesmas</Text>
                  <Text fontSize={"12px"}>
                    {puskesmasList.length} Puskesmas di Kabupaten Paser
                  </Text>
                </Box>
              </Flex>
              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedMenu("uptd")}
                bg={selectedMenu === "uptd" ? "whiteAlpha.300" : "transparent"}
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={icon3}
                    alt="icon"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>UPTD Lainnya</Text>
                  <Text fontSize={"12px"}>Labkesda dan Gudang Farmasi</Text>
                </Box>
              </Flex>
            </SimpleGrid>
            <Separator orientation="vertical" mx={0} />
            <Box maxWidth={"400px"}>
              <Text fontSize={"16px"} fontWeight={600} mb={4}>
                SUB MENU
              </Text>
              {renderSubMenu()}
            </Box>
          </Flex>
        </MotionBox>
      );
    } else if (type === "informasi") {
      return (
        <MotionBox
          borderTop="2px solid white"
          position="fixed"
          left={0}
          top={dropdownTop + "px"}
          width="100vw"
          minH="180px"
          boxShadow="lg"
          bgColor={"#14A75B"}
          zIndex={99}
          px={{ base: 6, md: 24 }}
          py={8}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "fixed" }}
          color={"white"}
        >
          {closeButton}
          <Flex
            width="1200px"
            gap={{ base: 6, md: 5 }}
            direction={{ base: "column", md: "row" }}
          >
            <Box maxWidth={"300px"}>
              <Text fontSize={"20px"} fontWeight={600}>
                PPID
              </Text>
              <Text>PELAYANAN INFORMASI PUBLIK</Text>
              <Text mt={"30px"}>
                Temukan informasi penting tentang layanan informasi publik dan
                dapatkan panduan untuk mengakses informasi yang Anda butuhkan.
              </Text>
            </Box>{" "}
            <Separator orientation="vertical" mx={0} />
            <SimpleGrid columns={[1, null, 2]} gap="5px">
              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedPPIDMenu("profile")}
                bg={
                  selectedPPIDMenu === "profile"
                    ? "whiteAlpha.300"
                    : "transparent"
                }
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconPPID1}
                    alt="icon1"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Profile</Text>
                  <Text fontSize={"12px"}>
                    Profile Pelaksana dan Penjelasan
                  </Text>
                </Box>
              </Flex>
              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedPPIDMenu("informasi")}
                bg={
                  selectedPPIDMenu === "informasi"
                    ? "whiteAlpha.300"
                    : "transparent"
                }
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconPPID2}
                    alt="icon2"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Informasi</Text>
                  <Text fontSize={"12px"}>
                    Berkala, Publik, Serta Merta, Setiap Saat
                  </Text>
                </Box>
              </Flex>
              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedPPIDMenu("layanan")}
                bg={
                  selectedPPIDMenu === "layanan"
                    ? "whiteAlpha.300"
                    : "transparent"
                }
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconPPID3}
                    alt="icon"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Layanan</Text>
                  <Text fontSize={"12px"}>
                    Permohonan, Pengajuan Keberatan, Cek Status
                  </Text>
                </Box>
              </Flex>{" "}
              <Flex
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                onClick={() => setSelectedPPIDMenu("sop")}
                bg={
                  selectedPPIDMenu === "informasi"
                    ? "whiteAlpha.300"
                    : "transparent"
                }
                _hover={{
                  boxShadow: "md",
                  bg: "whiteAlpha.200",
                }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconPPID2}
                    alt="icon2"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>SOP PPID</Text>
                  <Text fontSize={"12px"}>Standar Operasional Prosedur</Text>
                </Box>
              </Flex>
            </SimpleGrid>
            <Separator orientation="vertical" mx={0} />
            <Box maxWidth={"400px"}>
              <Text fontSize={"16px"} fontWeight={600} mb={4}>
                SUB MENU
              </Text>
              {renderPPIDSubMenu()}
            </Box>
          </Flex>
        </MotionBox>
      );
    } else if (type === "standar") {
      return (
        <MotionBox
          borderTop="2px solid white"
          position="fixed"
          left={0}
          top={dropdownTop + "px"}
          width="100vw"
          minH="180px"
          boxShadow="lg"
          bgColor={"#14A75B"}
          zIndex={99}
          px={{ base: 6, md: 24 }}
          py={8}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "fixed" }}
          color={"white"}
        >
          {closeButton}
          <Flex
            width="1200px"
            gap={{ base: 6, md: 5 }}
            direction={{ base: "column", md: "row" }}
          >
            {/* Kolom kiri: Judul dan deskripsi umum */}
            <Box maxWidth={"300px"}>
              <Text fontSize={"20px"} fontWeight={600}>
                PROGRAM
              </Text>
              <Text>Informasi program Dinas Kesehatan.</Text>
              <Text mt={"30px"}>
                Pilih salah satu kategori program untuk melihat deskripsi
                singkatnya.
              </Text>
            </Box>
            <Separator orientation="vertical" mx={0} />
            {/* Kolom tengah: Pilihan kategori program */}
            <SimpleGrid columns={[3, null, 3]} gap="20px">
              <Flex
                as={RouterLink}
                to="/bidang/yankes"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconBidang1}
                    alt="yankes"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Yankes</Text>
                  <Text fontSize={"12px"}>Pelayanan Kesehatan</Text>
                </Box>
              </Flex>
              <Flex
                as={RouterLink}
                to="/bidang/sdk"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconBidang2}
                    alt="sdk"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>SDK</Text>
                  <Text fontSize={"12px"}>Sumber Daya Kesehatan</Text>
                </Box>
              </Flex>
              <Flex
                as={RouterLink}
                to="/bidang/kesmas"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconBidang3}
                    alt="kesmas"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Kesmas</Text>
                  <Text fontSize={"12px"}>Kesehatan Masyarakat</Text>
                </Box>
              </Flex>
              <Flex
                as={RouterLink}
                to="/bidang/sekret"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconBidang4}
                    alt="sekretariat"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Sekretariat</Text>
                  <Text fontSize={"12px"}>Administrasi & Keuangan</Text>
                </Box>
              </Flex>
              <Flex
                as={RouterLink}
                to="/bidang/p2p"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconBidang5}
                    alt="p2p"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>P2P</Text>
                  <Text fontSize={"12px"}>
                    Pencegahan & Pengendalian Penyakit
                  </Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Flex>
        </MotionBox>
      );
    } else if (type === "aplikasi") {
      return (
        <MotionBox
          borderTop="2px solid white"
          position="fixed"
          left={0}
          top={dropdownTop + "px"}
          width="100vw"
          minH="180px"
          boxShadow="lg"
          bgColor={"#14A75B"}
          zIndex={99}
          px={{ base: 6, md: 24 }}
          py={8}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "fixed" }}
          color={"white"}
        >
          {closeButton}
          <Flex
            width="1200px"
            gap={{ base: 6, md: 5 }}
            direction={{ base: "column", md: "row" }}
          >
            {/* Kolom kiri: Judul dan deskripsi umum */}
            <Box maxWidth={"300px"}>
              <Text fontSize={"20px"} fontWeight={600}>
                APLIKASI
              </Text>
              <Text>Layanan aplikasi Dinas Kesehatan.</Text>
              <Text mt={"30px"}>
                Pilih salah satu aplikasi untuk mengakses layanan yang tersedia.
              </Text>
            </Box>
            <Separator orientation="vertical" mx={0} />
            {/* Kolom tengah: Pilihan aplikasi */}
            <SimpleGrid columns={[2, null, 2]} gap="20px">
              <Flex
                as="a"
                href="https://pena.dinkes.paserkab.go.id/login"
                target="_blank"
                rel="noopener noreferrer"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
                textDecoration="none"
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={PenaLogo}
                    alt="pena-dinkes"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Pena Dinkes</Text>
                  <Text fontSize={"12px"}>Sistem Informasi Dinkes</Text>
                </Box>
              </Flex>
              <Flex
                as="a"
                href="https://kenaikan-pangkat.dinkes.paserkab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
                textDecoration="none"
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={PangkatLogo}
                    alt="kenaikan-pangkat"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Kenaikan Pangkat</Text>
                  <Text fontSize={"12px"}>Sistem Kenaikan Pangkat</Text>
                </Box>
              </Flex>
              <Flex
                as="a"
                href="https://aset.dinkes.paserkab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
                textDecoration="none"
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={AsetLogo}
                    alt="aset-dinkes"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>Aset Dinkes</Text>
                  <Text fontSize={"12px"}>Sistem Manajemen Aset</Text>
                </Box>
              </Flex>
              <Flex
                as="a"
                href="https://sdmk.dinkes.paserkab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
                textDecoration="none"
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={iconBidang4}
                    alt="sdmk"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>SDMK</Text>
                  <Text fontSize={"12px"}>Sistem Data Manajemen Kesehatan</Text>
                </Box>
              </Flex>{" "}
              <Flex
                as="a"
                href="https://sdmk.dinkes.paserkab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                gap={"10px"}
                borderRadius="md"
                p={"10px"}
                alignItems="center"
                maxWidth={"300px"}
                cursor="pointer"
                _hover={{ boxShadow: "md", bg: "whiteAlpha.200" }}
                textDecoration="none"
              >
                <Box
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"4px"}
                  bg={"white"}
                  p={"10px"}
                >
                  <Image
                    height="100%"
                    width="100%"
                    objectFit="contain"
                    src={AptekaLogo}
                    alt="sdmk"
                  />
                </Box>
                <Box>
                  <Text fontSize={"15px"}>APTEKA</Text>
                  <Text fontSize={"12px"}>
                    Aplikasi Pengelolaan Persedian Obat
                  </Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Flex>
        </MotionBox>
      );
    } else if (type === "galeri") {
      return (
        <MotionBox
          borderTop="2px solid white"
          position="fixed"
          left={0}
          top={dropdownTop + "px"}
          width="100vw"
          minH="180px"
          boxShadow="lg"
          bgColor={"#14A75B"}
          zIndex={99}
          px={{ base: 6, md: 24 }}
          py={8}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "fixed" }}
        >
          {closeButton}
          <Flex
            width="1200px"
            gap={{ base: 6, md: 24 }}
            direction={{ base: "column", md: "row" }}
          >
            <Box maxWidth={"400px"}>
              <Text fontSize={"20px"} fontWeight={600}>
                GALERI
              </Text>
              <Text>Kumpulan dokumentasi dan foto kegiatan.</Text>
            </Box>
          </Flex>
        </MotionBox>
      );
    } else if (type === "laporan") {
      return (
        <MotionBox
          borderTop="2px solid white"
          position="fixed"
          left={0}
          top={dropdownTop + "px"}
          width="100vw"
          minH="180px"
          boxShadow="lg"
          bgColor={"#14A75B"}
          zIndex={99}
          px={{ base: 6, md: 24 }}
          py={8}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "fixed" }}
        >
          {closeButton}
          <Flex
            width="1200px"
            gap={{ base: 6, md: 24 }}
            direction={{ base: "column", md: "row" }}
          >
            <Box maxWidth={"400px"}>
              <Text fontSize={"20px"} fontWeight={600}>
                LAPORAN
              </Text>
              <Text>Data dan laporan Dinas Kesehatan.</Text>
            </Box>
          </Flex>
        </MotionBox>
      );
    } else {
      return null;
    }
  };

  return (
    <Box
      as="nav"
      w="100%"
      bgColor={openDropdown ? "#14A75B" : isTop ? "transparent" : "#14A75B"}
      color="white"
      boxShadow="md"
      position="fixed"
      top={0}
      zIndex={100}
      ref={navbarRef}
      transition="background-color 0.4s cubic-bezier(0.4,0,0.2,1)"
      style={{
        // Jika ingin sedikit blur, bisa tambahkan, tapi jangan terlalu tebal
        backdropFilter: isTop ? "blur(2px)" : "none",
        WebkitBackdropFilter: isTop ? "blur(2px)" : "none",
      }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
        py={"20px"}
      >
        <Flex gap={3} alignItems="center">
          <Image height="40px" src={Logo} alt="Logo" />
          <Box>
            <Text color={"white"} fontSize={"16px"} fontWeight={700}>
              Dinas Kesehatan
            </Text>
            <Text color={"white"} mt={0} fontSize={"14px"}>
              Kabupaten Paser
            </Text>
          </Box>
        </Flex>
        <Flex as="ul" gap={8} listStyleType="none" align="center" m={0} p={0}>
          {menus.map((menu) => (
            <Box as="li" key={menu.key} position="relative" mt={"10px"}>
              {menu.dropdown ? (
                <Button
                  variant="ghost"
                  fontWeight="medium"
                  fontSize="xl"
                  color="white"
                  bg="transparent"
                  _hover={{ bg: "whiteAlpha.300", color: "white" }}
                  onClick={() =>
                    setOpenDropdown(openDropdown === menu.key ? null : menu.key)
                  }
                  px={2}
                  position="relative"
                  height="48px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  boxSizing="border-box"
                >
                  <Flex as="span" zIndex={2}>
                    {menu.label} <BiChevronDown />
                  </Flex>
                  {/* Animated underline */}
                  <Box position="relative" width="100%" height="4px" mt={"0px"}>
                    <AnimatePresence>
                      {openDropdown === menu.key && (
                        <motion.div
                          key="underline"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{
                            originX: 0,
                            height: "4px",
                            width: "100%",
                            background: "white",
                            borderRadius: "0px",
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </Box>
                </Button>
              ) : (
                <Link
                  as={RouterLink}
                  to="/"
                  fontWeight="medium"
                  fontSize="md"
                  color="white"
                  _hover={{ color: "white" }}
                  px={2}
                  position="relative"
                  height="48px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  boxSizing="border-box"
                >
                  <Box as="span" zIndex={2}>
                    {menu.label}
                  </Box>
                  {/* Animated underline for Home if needed */}
                  <Box
                    position="relative"
                    width="100%"
                    height="4px"
                    mt={"2px"}
                  ></Box>
                </Link>
              )}
            </Box>
          ))}
        </Flex>
      </Flex>
      {/* Render dropdown di luar Flex agar full-width, dengan transisi Fade+Slide */}
      <AnimatePresence>
        {openDropdown && renderDropdown(openDropdown)}
      </AnimatePresence>
    </Box>
  );
}

export default Navbar;
