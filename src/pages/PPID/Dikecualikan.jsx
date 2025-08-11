import {
  Box,
  Image,
  Text,
  Center,
  Container,
  Heading,
  Table,
  Button,
} from "@chakra-ui/react";
import { For, SimpleGrid, Tabs } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import React, { useRef, useState, useEffect } from "react";
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
import axios from "axios";
import ReactPaginate from "react-paginate";
import Daftar1 from "../../assets/pengecualian1.jpg";
import Daftar2 from "../../assets/pengecualian2.jpg";
import Daftar3 from "../../assets/pengecualian3.jpg";
import Daftar4 from "../../assets/pengecualian4.jpg";
import Daftar5 from "../../assets/pengecualian5.jpg";
import "../../styles/pagination.css";

const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function Dikecualikan() {
  const [dataSertaMerta, setDataSertaMerta] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  async function fetchDataSertaMerta() {
    await axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/informasi/get/3?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setDataSertaMerta(res.data.result);
        console.log(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handlePreview = (fileName) => {
    const url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}${fileName}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchDataSertaMerta();
  }, [page]);

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
          >
            <Center height={"100px"}>
              <Box width={"100%"}>
                <Text
                  fontSize={"40px"}
                  fontWeight={1000}
                  color={"white"}
                  textAlign={"center"}
                >
                  INFORMASI DINAS KESEHATAN
                </Text>
                <Text
                  fontSize={"30px"}
                  fontWeight={100}
                  color={"white"}
                  textAlign={"center"}
                >
                  Informasi yang Dikecualikan
                </Text>
              </Box>
            </Center>
          </Box>
          {/* Box biru, langsung di bawah swiper */}
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              py={"120px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
              px={"80px"}
            >
              <Heading mb={"30px"} fontSize={"35px"}>
                Informasi yang Dikecualikan
              </Heading>{" "}
              <Box px={"130px"}>
                <Image
                  src={Daftar1}
                  w="100%"
                  h="auto"
                  objectFit="contain"
                  alt="SOP Pengajuan Informasi"
                />{" "}
                <Image
                  src={Daftar2}
                  w="100%"
                  h="auto"
                  objectFit="contain"
                  alt="SOP Pengajuan Informasi"
                />
                <Image
                  src={Daftar3}
                  w="100%"
                  h="auto"
                  objectFit="contain"
                  alt="SOP Pengajuan Informasi"
                />
                <Image
                  src={Daftar4}
                  w="100%"
                  h="auto"
                  objectFit="contain"
                  alt="SOP Pengajuan Informasi"
                />
                <Image
                  src={Daftar5}
                  w="100%"
                  h="auto"
                  objectFit="contain"
                  alt="SOP Pengajuan Informasi"
                />
              </Box>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default Dikecualikan;
