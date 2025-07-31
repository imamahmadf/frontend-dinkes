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

const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function Publik() {
  const [dataPublik, setDataPublik] = useState(null);
  async function fetchDataPublik() {
    await axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/get/publik`
      )
      .then((res) => {
        setDataPublik(res.data.result);
        console.log(res.data.result);
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
    fetchDataPublik();
  }, []);

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
                  INFORMASI PUBLIK
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
                Informasi Publik
              </Heading>{" "}
              <Table.Root stickyHeader fontSize={"20px"}>
                <Table.Header>
                  <Table.Row bgColor={"#14A75B"} py={"50px"}>
                    {" "}
                    <Table.ColumnHeader color={"white"}>No.</Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"}>
                      Judul Informasi
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"}>
                      Ringkasan
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"} textAlign="end">
                      unit
                    </Table.ColumnHeader>{" "}
                    <Table.ColumnHeader textAlign="end" color={"white"}>
                      Aksi
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {dataPublik?.map((item, index) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item?.judul}</Table.Cell>
                      <Table.Cell>{item?.ringkasan}</Table.Cell>
                      <Table.Cell textAlign="end">{item?.unit}</Table.Cell>{" "}
                      <Table.Cell textAlign="end">
                        {" "}
                        <Button onClick={() => handlePreview(item?.dokumen)}>
                          Lihat
                        </Button>{" "}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default Publik;
