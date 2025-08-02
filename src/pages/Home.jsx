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
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsYoutube } from "react-icons/bs";
import { BsTiktok } from "react-icons/bs";
import Layout from "../components/Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Peta from "../components/Peta";
import BeritaCard from "../components/BeritaCard";
import { BsWhatsapp } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { BsBuilding, BsTelephone, BsClock } from "react-icons/bs";
import Home1 from "../assets/home1.jpg";
import Home2 from "../assets/home2.jpg";
import Home3 from "../assets/home3.png";
import Bupati from "../assets/bupati-kab-paser.jpg";
import Wabup from "../assets/wakil-bupati-kab-paser.jpg";
import Sekda from "../assets/sekda-paser-2024.jpg";
import Banner1 from "../assets/banner1.png";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.png";
import Banner4 from "../assets/banner4.png";
import Banner5 from "../assets/banner5.png";
import Banner6 from "../assets/banner6.png";
import api from "../utils/api";
import { BsInstagram } from "react-icons/bs";
import LaporPelayanan from "../components/LaporPelayanan";
import { BsFacebook } from "react-icons/bs";
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const images = [Home1, Home2, Home3];
const BannerSwiper = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6];
const leaders = [
  {
    img: Bupati,
    title: "BUPATI PASER",
    name: "dr. Fahmi Fadli",
  },
  {
    img: Wabup,
    title: "WAKIL BUPATI PASER",
    name: "H. Ikhwan Antasari, S.Sos.",
  },
  {
    img: Sekda,
    title: "SEKRETARIS DAERAH",
    name: "Drs. Katsul Wijaya, M.Si",
  },
];

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [databerita, setDataBerita] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  async function fetchBerita() {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/berita/list");
      console.log(response.data);
      setDataBerita(response.data.result);
    } catch (error) {
      console.error("Error fetching berita:", error);
      setError("Gagal memuat data berita. Silakan coba lagi nanti.");
      setDataBerita(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBerita();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Trigger animasi ketika user scroll ke bagian atas (dalam 200px dari atas)
      if (scrollTop < 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Set initial state
    setIsVisible(true);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <Box bgColor="white">
        <Box w="100vw" h="100vh" overflow="hidden" position="relative">
          <Box
            position="absolute"
            top="50%"
            left={{ base: "10px", md: "20px", lg: "30px" }}
            transform="translateY(-50%)"
            zIndex={20}
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
            gap={{ base: 2, md: 3, lg: 4 }}
          >
            {/* WhatsApp */}
            <Link href="https://wa.me/6281234567890" isExternal>
              <Box
                bg="#25D366"
                color={"white"}
                borderRadius="full"
                boxShadow="md"
                p={{ base: 2, md: 2.5, lg: 3 }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                _hover={{ bg: "#1DA851" }}
                transition="0.2s"
              >
                <BsWhatsapp />
              </Box>
            </Link>
            {/* Instagram */}
            <Link href="https://instagram.com/dinkespaser" isExternal>
              <Box
                bg="#E1306C"
                color={"white"}
                borderRadius="full"
                boxShadow="md"
                p={{ base: 2, md: 2.5, lg: 3 }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                _hover={{ bg: "#C13584" }}
                transition="0.2s"
              >
                <BsInstagram />
              </Box>
            </Link>
            {/* Facebook */}
            <Link href="https://facebook.com/dinkespaser" isExternal>
              <Box
                bg="#1877F3"
                color={"white"}
                borderRadius="full"
                boxShadow="md"
                p={{ base: 2, md: 2.5, lg: 3 }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                _hover={{ bg: "#145DB2" }}
                transition="0.2s"
              >
                <BsFacebook />
              </Box>
            </Link>
            <Link href="https://facebook.com/dinkespaser" isExternal>
              <Box
                bg="black"
                color={"white"}
                borderRadius="full"
                boxShadow="md"
                p={{ base: 2, md: 2.5, lg: 3 }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                _hover={{ bg: "black" }}
                transition="0.2s"
              >
                <BsTiktok />
              </Box>
            </Link>
            <Link href="https://facebook.com/dinkespaser" isExternal>
              <Box
                bg="red"
                color={"white"}
                borderRadius="full"
                boxShadow="md"
                p={{ base: 2, md: 2.5, lg: 3 }}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                _hover={{ bg: "red" }}
                transition="0.2s"
              >
                <BsYoutube />
              </Box>
            </Link>
          </Box>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={10}
            w="90%"
            maxW="1200px"
          >
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={8}
              align="center"
            >
              <Box flex="1" textAlign={{ base: "center", lg: "left" }}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isVisible
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ delay: 0, duration: 0.6 }}
                  color="white"
                  textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                  mb={6}
                >
                  <MotionText
                    fontSize={{ base: "2xl", md: "4xl", lg: "40px" }}
                    fontWeight="bold"
                    mb={0}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    Pusat Layanan dan Informasi
                  </MotionText>
                  <MotionText
                    fontSize={{ base: "2xl", md: "4xl", lg: "40px" }}
                    fontWeight="bold"
                    mb={2}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Kesehatan di Kabupaten Paser
                  </MotionText>
                  <MotionText
                    fontSize={{ base: "sm", lg: "14px" }}
                    mb={2}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    TUNTAS (TANGGUH, UNGGUL, TRANSFORMATIF, ADIL, DAN SEJAHTERA)
                  </MotionText>
                </MotionBox>

                <HStack
                  spacing={4}
                  justify={{ base: "center", lg: "flex-start" }}
                  flexWrap="wrap"
                >
                  {[
                    { label: "Pelayanan Online", color: "blue.500" },
                    { label: "Informasi PPID", color: "green.500" },
                    { label: "Profil Dinkes", color: "orange.500" },
                  ].map((btn, i) => (
                    <MotionButton
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      size={{ base: "md", md: "lg" }}
                      bg={btn.color}
                      _hover={{ bg: btn.color.replace(".500", ".600") }}
                      color="white"
                      px={6}
                      py={3}
                      borderRadius="5px"
                      boxShadow="lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      {btn.label}
                    </MotionButton>
                  ))}
                </HStack>
              </Box>

              <MotionBox
                flex="1"
                maxW={{ base: "100%", lg: "50%" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ delay: 1, duration: 0.6 }}
                bg="rgba(17, 15, 15, 0.1)"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                p={6}
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
              >
                <VStack spacing={4} align="stretch" color="white">
                  <Flex align="flex-start" gap={3}>
                    <Box mt={1}>
                      <BsBuilding size={20} />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Alamat:</Text>
                      <Text>
                        Komplek Perkantoran Jl. Kusuma Bangsa KM. 05 Gedung A.
                        Lt.2 Kav. 1,Tanah Grogot, Paser
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="flex-start" gap={3}>
                    <Box mt={1}>
                      <BsTelephone size={20} />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Kontak:</Text>
                      <Text>WhatsApp: 0812-xxxx-xxxx</Text>
                      <Text>Email: dinkes@paserkab.go.id</Text>
                    </Box>
                  </Flex>
                  <Flex align="flex-start" gap={3}>
                    <Box mt={1}>
                      <BsClock size={20} />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Jam Operasional:</Text>
                      <Text>Senin - Jumat, 08.00 - 16.00 WITA</Text>
                    </Box>
                  </Flex>
                </VStack>
              </MotionBox>
            </Flex>
          </Box>

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            style={{ height: "100%", width: "100%" }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={img}
                  objectFit="cover"
                  w="100%"
                  h="100vh"
                  alt={`slide-${i}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Container
          mt={0}
          pt={"30px"}
          maxW="container.lg"
          position="relative"
          bgColor={"white"}
        >
          <Box>
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom-swiper-pagination",
              }}
              navigation={{
                nextEl: ".banner-next",
                prevEl: ".banner-prev",
              }}
              style={{
                width: "100%",
                height: "250px",

                overflow: "hidden",
              }}
            >
              {BannerSwiper.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img}
                    objectFit="cover"
                    w="100%"
                    h="250px"
                    alt={`banner-${i}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Tombol custom */}
            <button
              className="swiper-button-prev banner-prev"
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                zIndex: 20,
              }}
            ></button>
            <button
              className="swiper-button-next banner-next"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                zIndex: 20,
              }}
            ></button>
            {/* Custom pagination di bawah banner */}
            <div
              className="custom-swiper-pagination"
              style={{ marginTop: "16px", textAlign: "center" }}
            ></div>
          </Box>
        </Container>
        ;
        <Container
          mt={"30px"}
          p={{ base: "20px", md: "30px" }}
          maxW="container.lg"
          bgColor="gray.100"
        >
          <Center height={{ base: "80px", md: "100px" }} color={"#524E4E"}>
            <Box width="100%" mb={{ base: "20px", md: "30px" }}>
              {" "}
              <MotionText
                fontSize={{ base: "28px", md: "40px" }}
                fontWeight={1000}
                textAlign="center"
                mb={0}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                PIMPINAN DAERAH
              </MotionText>
            </Box>
          </Center>
          <SimpleGrid color={"#524E4E"} columns={[1, null, 3]} gap={4}>
            {leaders.map((leader, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: 0.5, duration: 1 }}
              >
                <Flex
                  gap={5}
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "center", md: "flex-start" }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Image
                    src={leader.img}
                    width={{ base: "200px", md: "180px" }}
                    h={{ base: "250px", md: "220px" }}
                    objectFit="cover"
                  />
                  <Box>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontWeight={400}
                    >
                      {leader.title}
                    </Text>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontWeight={700}
                      color="black"
                    >
                      {leader.name}
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
        <Container my={"60px"}>
          <Flex>
            {loading && (
              <Text textAlign="center" color="gray.500" fontSize="lg" py={8}>
                Memuat data berita...
              </Text>
            )}
            {error && (
              <Text textAlign="center" color="red.500" fontSize="lg" py={8}>
                {error}
              </Text>
            )}
            {!loading && !error && databerita && databerita.length > 0 && (
              <Box mt={"60px"}>
                <Box color={"#524E4E"} width="100%" mb={"30px"}>
                  <MotionText
                    fontSize={{ base: "28px", md: "40px" }}
                    fontWeight={1000}
                    textAlign="center"
                    mb={0}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    BERITA TERKINI
                  </MotionText>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                  {databerita.map((berita, index) => (
                    <BeritaCard key={berita.id} berita={berita} index={index} />
                  ))}
                </SimpleGrid>
              </Box>
            )}
            {!loading && !error && (!databerita || databerita.length === 0) && (
              <Text textAlign="center" color="gray.500" fontSize="lg" py={8}>
                Tidak ada berita tersedia saat ini
              </Text>
            )}
          </Flex>

          <Button
            as={RouterLink}
            to="/daftar-berita-dinkes"
            my={"30px"}
            w={"100%"}
          >
            Semua Berita
          </Button>
        </Container>
        <Container>
          <Flex
            gap={{ base: "20px", md: "30px", lg: "50px" }}
            direction={{ base: "column", lg: "row" }}
            align={{ base: "center", lg: "flex-start" }}
          >
            <Box w={{ base: "100%", lg: "70%" }}>
              <iframe
                width="100%"
                height={{ base: "250", md: "350", lg: "550" }}
                src="https://www.youtube-nocookie.com/embed/mUtaYgkgUhs?si=SFK4MmVGtSMUk_Ux"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </Box>
            <Flex
              flexDirection={"column"}
              w={{ base: "100%", lg: "30%" }}
              align={{ base: "center", lg: "flex-start" }}
              textAlign={{ base: "center", lg: "left" }}
            >
              <Avatar.Root
                borderRadius={0}
                minW={{ base: "250px", md: "300px", lg: "400px" }}
                h={{ base: "300px", md: "350px", lg: "450px" }}
              >
                <Avatar.Fallback name="Kepala Dinas" />
              </Avatar.Root>
              <Spacer />
              <Text
                fontSize={{ base: "18px", md: "22px", lg: "25px" }}
                fontWeight={100}
              >
                KEPALA DINAS
              </Text>
              <Text
                fontSize={{ base: "20px", md: "25px", lg: "30px" }}
                fontWeight={600}
              >
                Amri Yulihardi, S.STP., M.Si.
              </Text>
            </Flex>
          </Flex>
        </Container>
        <Box bgColor="gray.100" color={"#524E4E"} mt={"60px"} p={"30px"}>
          <Box width="100%" mb={"60px"}>
            <Text fontSize="40px" fontWeight={1000} textAlign="center">
              PERSEBARAN PUSKESMAS
            </Text>
          </Box>
          <Peta />
        </Box>
      </Box>
    </Layout>
  );
}

export default Home;
