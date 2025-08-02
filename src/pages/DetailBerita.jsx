import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Center,
  Container,
  Heading,
  List,
  Flex,
} from "@chakra-ui/react";
import { Badge, Button, Card, HStack } from "@chakra-ui/react";
import { For, SimpleGrid, Tabs } from "@chakra-ui/react";
import Layout from "../components/Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // penting!
import Dinkes3 from "../assets/dinkes3.png";
import Dinkes4 from "../assets/dinkes4.png";
import Dinkes1 from "../assets/dinkes1.png";
import Dinkes2 from "../assets/dinkes2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "../styles/pagination.css";

const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function Detailberita(props) {
  const { slug } = useParams(); // Mendapatkan nilai slug dari URL
  const [dataBerita, setDataBerita] = useState(null);

  // Debug: tampilkan slug yang diterima
  console.log("Slug dari URL:", slug);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  async function fetchDataBerita() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/berita/get/detail/${slug}`
      );
      setDataBerita(response.data.result);
      console.log("Berita detail:", response.data.result);
    } catch (err) {
      console.error("Error fetching berita detail:", err);
    }
  }

  useEffect(() => {
    if (slug) {
      fetchDataBerita();
    }
  }, [slug]); // Re-fetch ketika slug berubah
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box w="100vw" position="relative">
          {/* Swiper */}
          <Box>
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
              navigation
              style={{ width: "100%" }} // Hapus height di sini
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img}
                    objectFit="contain" // atau "unset" jika ingin benar-benar asli
                    w="100%"
                    h="auto"
                    maxH="80vh" // opsional, agar tidak terlalu tinggi di layar besar
                    alt={`slide-${i}`}
                    display="block"
                    mx="auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          {/* Box merah, absolute di bawah swiper */}

          {/* Box biru, langsung di bawah swiper */}
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              py={"80px"}
              bgColor={"white"}
              maxWidth={"1400px"}
              color={"#524E4E"}
              px={"80px"}
            >
              <Heading mb={"15px"} fontWeight={800} fontSize={"35px"}>
                BERITA DAN INFO SEPUTAR DINAS KESEHATAN
              </Heading>

              <Box pb={"30px"}>
                {dataBerita ? (
                  <>
                    <Text fontSize={"30px"} textAlign={"justify"} mb={"20px"}>
                      {dataBerita.judul || "Judul Berita"}
                    </Text>
                    {dataBerita.foto && (
                      <Image
                        src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${
                          dataBerita.foto
                        }`}
                        alt={dataBerita.judul}
                        maxW="100%"
                        h="auto"
                        mb="20px"
                      />
                    )}
                    <Box
                      fontSize={"20px"}
                      textAlign={"justify"}
                      mb={"20px"}
                      dangerouslySetInnerHTML={{
                        __html:
                          dataBerita.isi ||
                          "Isi berita akan ditampilkan di sini",
                      }}
                    />
                  </>
                ) : (
                  <Text fontSize={"16px"} textAlign={"center"}>
                    Memuat detail berita...
                  </Text>
                )}
              </Box>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default Detailberita;
