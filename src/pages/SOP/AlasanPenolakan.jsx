import React from "react";
import {
  Box,
  Image,
  Text,
  Center,
  Container,
  Heading,
  List,
} from "@chakra-ui/react";
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
import AlurPermohonan from "../../assets/alurPermohonan.jpg";

import SOP1 from "../../assets/SOP.png";
const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function AlasanPenolakan() {
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
                      ALUR PELAYANAN
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
                  Alasan Penolakan Informasi Publik
                </Text>
              </Box>
            </Center>
          </Box>
          {/* Box biru, langsung di bawah swiper */}
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              py={"80px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
            >
              <Text fontWeight={600} fontSize={"30px"}>
                PERMOHONAN INFORMASI AKAN DITOLAK JIKA:
              </Text>{" "}
              <Box ms={"35px"} mb={"35px"}>
                <List.Root as="ol" fontSize={"25px"}>
                  <List.Item>
                    Pemohon Informasi tidak memberikan data identitas dengan
                    jelas;
                  </List.Item>
                  <List.Item>
                    Permintaan informasi untuk kepentingan yang tidak jelas;
                  </List.Item>
                  <List.Item>
                    Penolakan atas subtansi, yaitu menolak memberikan informasi
                    yang dikecualikan oleh UU KIP atau perundang-undangan
                    lainnya;
                  </List.Item>{" "}
                  <List.Item>
                    Penolakan atas prosedur, yakni menolak memberikan informasi
                    apabila pemohon informasi tidak mematuhi ketentuan yang
                    diatur dalam perundang-undangan;
                  </List.Item>
                  <List.Item>
                    Dinas Kesehatan Kabupaten Paser tidak
                    menguasai/memiliki/menyimpan informasi publik yang
                    dimohonkan oleh pemohon informasi;
                  </List.Item>{" "}
                  <List.Item>
                    Informasi publik yang diminta belum dikuasai atau
                    didokumentasikan.
                  </List.Item>
                </List.Root>
              </Box>
              <Text fontWeight={600} fontSize={"30px"}>
                PERMOHONAN INFORMASI YANG DITOLAK MENCAKUP TENTANG :
              </Text>{" "}
              <Box ms={"35px"}>
                <List.Root as="ol" fontSize={"25px"}>
                  <List.Item>Informasi yang dikecualikan;</List.Item>
                  <List.Item>
                    Informasi yang apabila dibuka dapat menghambat proses hukum;
                  </List.Item>
                  <List.Item>
                    Informasi yang apabila dibuka dapat mengganggu kepentingan
                    perlindungan hak atas kekayaan intelektual;
                  </List.Item>{" "}
                  <List.Item>
                    Informasi yang apabila dibuka dapat mengganggu ketahanan
                    ekonomi nasional;
                  </List.Item>
                  <List.Item>
                    Informasi yang apabila dibuka dapat mengganggu pertahanan
                    dan keamanan negara;
                  </List.Item>{" "}
                  <List.Item>
                    Informasi yang apabila dibuka dapat mengungkapkan kekayaan
                    alam Indonesia;
                  </List.Item>
                  <List.Item>
                    Informasi yang apabila dibuka dapat merugikan hubungan Luar
                    Negeri;
                  </List.Item>
                  <List.Item>
                    Informasi yang apabila dibuka dapat mengungkapkan isi akta
                    otentik yang bersifat pribadi atau wasiat seseorang;
                  </List.Item>{" "}
                  <List.Item>
                    Informasi yang tidak boleh diungkapkan berdasarkan UU dengan
                    perincian dan penjelasan sebagaimana dimaksud Pasal 17 dan
                    18 Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan
                    Publik
                  </List.Item>
                </List.Root>
              </Box>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default AlasanPenolakan;
