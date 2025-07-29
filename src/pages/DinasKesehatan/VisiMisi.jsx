import React from "react";
import { Box, Image, Text, Center, Container, Heading } from "@chakra-ui/react";
import { For, SimpleGrid, Tabs } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // penting!
import Dinkes3 from "../../assets/dinkes3.png";
import Dinkes4 from "../../assets/dinkes4.png";
import Dinkes1 from "../../assets/dinkes1.png";
import Dinkes2 from "../../assets/dinkes2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import KiriGambar from "../../assets/kiri.png";
import KananGambar from "../../assets/kanan.png";
const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function VisiMisi() {
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
          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            top="calc(40vh - 30px)"
            bg="white"
            color="black"
            px={8}
            py={4}
            zIndex={10}
            minHeight={"100px"}
            minWidth={"1500px"}
            bgColor={"#14A75B"}
            style={{
              backgroundImage: `url(${KiriGambar}), url(${KananGambar})`,
              backgroundPosition: "16px center, calc(100% - 16px) center",
              backgroundRepeat: "no-repeat, no-repeat",
              backgroundSize: "auto 100px, auto 100px",
            }}
          >
            <Center height={"100px"}>
              <Box width={"100%"}>
                <Box>
                  <Center flexDirection="column">
                    <Text
                      fontSize={"40px"}
                      fontWeight={1000}
                      color={"white"}
                      textAlign={"center"}
                    >
                      PROFILE DINAS KESEHATAN
                    </Text>
                    <Box
                      height={"5px"}
                      width="fit-content"
                      bg={"yellow"}
                      alignSelf="center"
                      mt={"4px"}
                      px={"32px"}
                    ></Box>
                  </Center>
                </Box>
                <Text
                  fontSize={"30px"}
                  fontWeight={100}
                  color={"white"}
                  textAlign={"center"}
                >
                  Visi dan Misi
                </Text>
              </Box>
            </Center>
          </Box>
          {/* Box biru, langsung di bawah swiper */}
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              pt={"80px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
            >
              <Box mb={"50px"}>
                <Center mb={"30px"}>
                  <Heading fontSize={"35px"}>Visi</Heading>
                </Center>

                <Text fontSize={"30px"} textAlign={"center"}>
                  TUNTAS (TANGGUH, UNGGUL, TRANSFORMATIF, ADIL, DAN SEJAHTERA)”
                </Text>
              </Box>
              <Center mb={"30px"}>
                <Heading fontSize={"35px"}>Misi</Heading>
              </Center>
              <Box pb={"30px"}>
                <Text fontSize={"30px"} textAlign={"justify"} mb={"20px"}>
                  Mewujudkan masyarakat yang sehat, cerdas, kreatif sejahtera,
                  unggul dan berdaya saing didasari nilai-nilai keagamaan yang
                  kuat.
                </Text>
                <Text fontSize={"30px"} textAlign={"justify"}>
                  Misi ini berfokus pada Pembangunan sumber daya manusia
                  khususnya di bidang kesehatan dan pendidikan. Salah satu Peran
                  Dinas Kesehatan dalam pencapaian Misi ini adalah membentuk
                  masyarakat Kabupaten Paser yang sehat. Dengan sehat diharapkan
                  masyarakat dan generasi mendatang menjadi cerdas, kreatif,
                  sejahtera, unggul dan berdaya saing dengan tetap berpegang
                  pada nilai-nilai keagamaan.
                </Text>
              </Box>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default VisiMisi;
