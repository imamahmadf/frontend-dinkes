import React, { useState, useEffect } from "react";
import {
  Box,
  CloseButton,
  Container,
  Dialog,
  Image,
  Flex,
  Portal,
  SimpleGrid,
  Text,
  Button,
  HStack,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
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
import Home3 from "../assets/home3.jpg";
import Home4 from "../assets/home4.jpg";
import Bupati from "../assets/bupati-kab-paser.jpg";
import Wabup from "../assets/wakil-bupati-kab-paser.jpg";
import Sekda from "../assets/sekda-paser-2024.jpg";
import Banner1 from "../assets/banner1.png";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.png";
import Banner4 from "../assets/banner4.png";
import Banner5 from "../assets/banner5.png";
import Banner6 from "../assets/banner6.png";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import Kadis from "../assets/kadis.jpg";
import axios from "axios";

function formatTanggal(value) {
  if (!value) return "";
  const [tahun, bulan, hari] = String(value).slice(0, 10).split("-");
  const date = new Date(Number(tahun), Number(bulan) - 1, Number(hari));
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const images = [Home1, Home2, Home3, Home4];
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
  const [fotoList, setFotoList] = useState([]);
  const [infoList, setInfoList] = useState([]);
  const [dipilih, setDipilih] = useState(null);
  const [slideJumbotron, setSlideJumbotron] = useState(images);
  async function fetchBerita() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/list`
      );
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
    let ignore = false;
    const base = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    async function loadGaleri() {
      try {
        const [foto, info] = await Promise.all([
          axios.get(`${base}/galeri/get/foto?page=0&limit=10`),
          axios.get(`${base}/galeri/get/infografis?page=0&limit=3`),
        ]);
        if (ignore) return;
        setFotoList(foto.data.result || []);
        setInfoList(info.data.result || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadGaleri();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const base = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    axios
      .get(`${base}/jumbotron/get`)
      .then((res) => {
        if (ignore) return;
        const daftar = (res.data.result || []).filter((item) => item.foto).map((item) => `${base}${item.foto}`);
        if (daftar.length) setSlideJumbotron(daftar);
      })
      .catch((err) => console.error(err));

    return () => {
      ignore = true;
    };
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
      <Box bgColor="var(--page-bg)" overflowX="hidden">
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
                    as="h1"
                    fontSize={{ base: "3xl", md: "5xl", lg: "52px" }}
                    fontWeight="bold"
                    lineHeight="1.15"
                    mb={1}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    Dinkes Paser
                  </MotionText>
                  <MotionText
                    as="p"
                    fontSize={{ base: "lg", md: "2xl", lg: "28px" }}
                    fontWeight="semibold"
                    mb={2}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Dinas Kesehatan Kabupaten Paser
                  </MotionText>
                  <MotionText
                    as="p"
                    fontSize={{ base: "sm", lg: "16px" }}
                    mb={2}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 1.1, duration: 0.6 }}
                  >
                    Website resmi pusat layanan dan informasi kesehatan di
                    Kabupaten Paser
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
                      <Text>WhatsApp: 0853-8638-4948</Text>
                      <Text>Email: dinkes@paserkab.go.id</Text>
                    </Box>
                  </Flex>
                  <Flex align="flex-start" gap={3}>
                    <Box mt={1}>
                      <BsClock size={20} />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Jam Operasional:</Text>
                      <Text>Senin - Kamis, 08.00 - 16.00 WITA</Text>
                      <Text>Jumat, 08.00 - 11.30 WITA</Text>
                    </Box>
                  </Flex>
                </VStack>
              </MotionBox>
            </Flex>
          </Box>

          <Swiper
            key={slideJumbotron.join("|")}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={slideJumbotron.length > 1}
            style={{ height: "100%", width: "100%" }}
          >
            {slideJumbotron.map((img, i) => (
              <SwiperSlide key={`${img}-${i}`}>
                <Image
                  src={img}
                  objectFit="cover"
                  w="100%"
                  h="100vh"
                  alt="Dinas Kesehatan Kabupaten Paser"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <style>{`
          .banner-beranda .swiper-button-prev,
          .banner-beranda .swiper-button-next {
            width: 36px;
            height: 36px;
            margin-top: 0;
            transform: translateY(-50%);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.92);
            color: #0E7A45;
          }
          .banner-beranda .swiper-button-prev::after,
          .banner-beranda .swiper-button-next::after {
            font-size: 14px;
            font-weight: 700;
          }
          .banner-beranda .swiper-button-prev { left: 12px; }
          .banner-beranda .swiper-button-next { right: 12px; }
          .custom-swiper-pagination .swiper-pagination-bullet-active,
          .foto-pagination .swiper-pagination-bullet-active { background: #14A75B; }
          .foto-beranda .swiper-button-prev,
          .foto-beranda .swiper-button-next {
            width: 36px;
            height: 36px;
            margin-top: 0;
            transform: translateY(-50%);
            border-radius: 999px;
            background: #ffffff;
            color: #0E7A45;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
          }
          .foto-beranda .swiper-button-prev::after,
          .foto-beranda .swiper-button-next::after {
            font-size: 14px;
            font-weight: 700;
          }
          .foto-beranda .swiper-button-prev { left: 8px; }
          .foto-beranda .swiper-button-next { right: 8px; }
        `}</style>
        <Container maxW="1100px" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 8 }}>
          <Box className="banner-beranda" position="relative" bg="var(--card)" borderWidth="1px" borderColor="var(--line)" borderRadius="16px" overflow="hidden">
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
              style={{ width: "100%", height: "100%" }}
            >
              {BannerSwiper.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img}
                    objectFit="contain"
                    w="100%"
                    h={{ base: "180px", md: "280px" }}
                    bg="var(--surface)"
                    alt="Banner informasi Dinas Kesehatan Kabupaten Paser"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-button-prev banner-prev" type="button" aria-label="Banner sebelumnya" />
            <button className="swiper-button-next banner-next" type="button" aria-label="Banner berikutnya" />
          </Box>
          <Box className="custom-swiper-pagination" mt={3} textAlign="center" />
        </Container>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
          <Text as="h2" textAlign="center" fontSize={{ base: "26px", md: "34px" }} fontWeight="700" color="var(--heading)">
            PIMPINAN DAERAH
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={6}>
            {leaders.map((leader) => (
              <Box
                key={leader.name}
                bg="var(--card)"
                borderWidth="1px"
                borderColor="var(--line)"
                borderRadius="16px"
                p={4}
                textAlign="center"
              >
                <Image
                  src={leader.img}
                  alt={`${leader.title}, ${leader.name}`}
                  w="180px"
                  h="220px"
                  mx="auto"
                  objectFit="cover"
                  objectPosition="top"
                  borderRadius="12px"
                />
                <Text mt={4} fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                  {leader.title}
                </Text>
                <Text mt={1} fontSize={{ base: "16px", md: "18px" }} fontWeight="700" color="var(--heading)">
                  {leader.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }}>
          {loading ? (
            <Text textAlign="center" color="var(--muted)" py={8}>
              Memuat data berita...
            </Text>
          ) : null}
          {error ? (
            <Text textAlign="center" color="red.500" py={8}>
              {error}
            </Text>
          ) : null}
          {!loading && !error && databerita && databerita.length > 0 ? (
            <Box>
              <Text as="h2" textAlign="center" fontSize={{ base: "26px", md: "34px" }} fontWeight="700" color="var(--heading)" mb={6}>
                BERITA TERKINI
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {databerita.map((berita, index) => (
                  <BeritaCard key={berita.id} berita={berita} index={index} />
                ))}
              </SimpleGrid>
            </Box>
          ) : null}
          {!loading && !error && (!databerita || databerita.length === 0) ? (
            <Text textAlign="center" color="var(--muted)" py={8}>
              Tidak ada berita tersedia saat ini
            </Text>
          ) : null}
          <Flex justify="center" mt={6}>
            <Button as={RouterLink} to="/daftar-berita-dinkes" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>
              Semua Berita
            </Button>
          </Flex>
        </Container>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }}>
          <Flex justify="space-between" align="center" gap={3} mb={6}>
            <Text as="h2" fontSize={{ base: "26px", md: "34px" }} fontWeight="700" color="var(--heading)">
              INFOGRAFIS TERBARU
            </Text>
            <Button as={RouterLink} to="/galeri/info-grafis" variant="outline" borderColor="#14A75B" color="#0E7A45" flexShrink={0}>
              Semua
            </Button>
          </Flex>
          {infoList.length === 0 ? (
            <Text color="var(--muted)">Belum ada infografis.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
              {infoList.map((item) => (
                <Box
                  key={item.id}
                  as="button"
                  type="button"
                  textAlign="left"
                  bg="var(--card)"
                  color="var(--text)"
                  borderWidth="1px"
                  borderColor="var(--line)"
                  borderRadius="16px"
                  overflow="hidden"
                  cursor="pointer"
                  _hover={{ borderColor: "#14A75B" }}
                  onClick={() => setDipilih(item)}
                >
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${item.foto}`}
                    alt={item.deskripsi || "Infografis"}
                    w="100%"
                    h="220px"
                    objectFit="cover"
                  />
                  <Box p={4}>
                    <Text fontWeight="600" lineClamp={2}>{item.deskripsi}</Text>
                    <Text mt={2} fontSize="14px" color="var(--muted)">
                      {[item.bidang?.nama, formatTanggal(item.tanggal)].filter(Boolean).join(" · ")}
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Container>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }}>
          <Flex justify="space-between" align="center" gap={3} mb={6}>
            <Text as="h2" fontSize={{ base: "26px", md: "34px" }} fontWeight="700" color="var(--heading)">
              FOTO TERBARU
            </Text>
            <Button as={RouterLink} to="/galeri/foto" variant="outline" borderColor="#14A75B" color="#0E7A45" flexShrink={0}>
              Semua
            </Button>
          </Flex>
          {fotoList.length === 0 ? (
            <Text color="var(--muted)">Belum ada foto.</Text>
          ) : (
            <Box className="foto-beranda" position="relative">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
                loop={fotoList.length > 3}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true, el: ".foto-pagination" }}
                navigation={{ nextEl: ".foto-next", prevEl: ".foto-prev" }}
              >
                {fotoList.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Box
                      as="button"
                      type="button"
                      w="100%"
                      textAlign="left"
                      bg="var(--card)"
                      color="var(--text)"
                      borderWidth="1px"
                      borderColor="var(--line)"
                      borderRadius="16px"
                      overflow="hidden"
                      cursor="pointer"
                      onClick={() => setDipilih(item)}
                    >
                      <Image
                        src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${item.foto}`}
                        alt={item.deskripsi || "Foto kegiatan"}
                        w="100%"
                        h="220px"
                        objectFit="cover"
                      />
                      <Box p={4}>
                        <Text fontWeight="600" lineClamp={2}>{item.deskripsi}</Text>
                        <Text mt={2} fontSize="14px" color="var(--muted)">
                          {[item.bidang?.nama, formatTanggal(item.tanggal)].filter(Boolean).join(" · ")}
                        </Text>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="swiper-button-prev foto-prev" type="button" aria-label="Foto sebelumnya" />
              <button className="swiper-button-next foto-next" type="button" aria-label="Foto berikutnya" />
              <Box className="foto-pagination" mt={3} textAlign="center" />
            </Box>
          )}
        </Container>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }}>
          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 5, lg: 6 }} align="stretch">
            <Box flex="1" minW={0} borderRadius="16px" overflow="hidden" bg="black" position="relative" h={{ base: "220px", md: "420px" }}>
              <iframe
                src="https://www.youtube.com/embed/abBU-dOeTaQ?si=oYWKVdOEq_13S-_I"
                title="Video Dinas Kesehatan Kabupaten Paser"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </Box>
            <Box
              w={{ base: "100%", lg: "300px" }}
              flexShrink={0}
              bg="var(--card)"
              borderWidth="1px"
              borderColor="var(--line)"
              borderRadius="16px"
              p={4}
              textAlign="center"
            >
              <Image
                src={Kadis}
                alt="Amri Yulihardi, Kepala Dinas Kesehatan Kabupaten Paser"
                w="100%"
                h={{ base: "280px", lg: "340px" }}
                objectFit="cover"
                objectPosition="top"
                borderRadius="12px"
              />
              <Text mt={4} fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                KEPALA DINAS
              </Text>
              <Text mt={1} fontSize={{ base: "20px", md: "22px" }} fontWeight="700" color="var(--heading)">
                Amri Yulihardi, S.STP., M.Si.
              </Text>
            </Box>
          </Flex>
        </Container>

        <Box bg="var(--surface)" color="var(--text)" py={{ base: 8, md: 12 }}>
          <Container maxW="1100px" px={{ base: 4, md: 6 }}>
            <Text as="h2" textAlign="center" fontSize={{ base: "26px", md: "34px" }} fontWeight="700" color="var(--heading)" mb={6}>
              PERSEBARAN PUSKESMAS
            </Text>
            <Box bg="var(--card)" borderWidth="1px" borderColor="var(--line)" borderRadius="16px" overflow="hidden">
              <Peta />
            </Box>
          </Container>
        </Box>
      </Box>

      <Dialog.Root open={Boolean(dipilih)} onOpenChange={(details) => { if (!details.open) setDipilih(null); }}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="960px" bg="var(--card)" color="var(--text)" mx={4}>
              <Dialog.Header>
                <Dialog.Title>{dipilih?.tipe === "infografis" ? "Infografis" : "Foto"}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {dipilih?.foto ? (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${dipilih.foto}`}
                    alt={dipilih.deskripsi || "Galeri"}
                    w="100%"
                    maxH="70vh"
                    objectFit="contain"
                    bg="var(--surface)"
                    borderRadius="12px"
                  />
                ) : null}
                {dipilih?.deskripsi ? (
                  <Text mt={4} fontWeight="600">{dipilih.deskripsi}</Text>
                ) : null}
                <Text mt={1} fontSize="14px" color="var(--muted)">
                  {[dipilih?.bidang?.nama, formatTanggal(dipilih?.tanggal)].filter(Boolean).join(" · ")}
                </Text>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Layout>
  );
}

export default Home;
