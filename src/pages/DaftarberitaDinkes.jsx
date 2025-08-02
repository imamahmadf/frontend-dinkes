import React, { useRef, useState, useEffect } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import "../styles/pagination.css";

const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function DaftarBeritaDinkes() {
  const [dataBerita, setDataBerita] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  async function fetchDataBerita() {
    await axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/berita/get/all?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setDataBerita(res.data.result);
        console.log(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    fetchDataBerita();
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
                <Text fontSize={"30px"} textAlign={"justify"} mb={"20px"}>
                  BWERIIAA
                </Text>

                <Flex>
                  <Box>
                    {dataBerita?.map((item) => (
                      <Card.Root
                        flexDirection="row"
                        overflow="hidden"
                        mb={"30px"}
                        borderRadius={"0px"}
                      >
                        <Image
                          width="80%"
                          height="400px"
                          objectFit="cover"
                          src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${
                            item.foto
                          }`}
                          alt="Caffe Latte"
                        />
                        <Box>
                          <Card.Body>
                            <Card.Title fontSize={"30px"} mb="2">
                              {item?.judul}
                            </Card.Title>
                            <Card.Description>
                              {item.ringkasan}
                            </Card.Description>
                            <HStack mt="4">
                              <Badge>{item?.temaBerita.tema}</Badge>
                            </HStack>
                          </Card.Body>
                          <Card.Footer>
                            <Button as={RouterLink} to={`/berita/${item.slug}`}>
                              Buy Latte
                            </Button>
                          </Card.Footer>
                        </Box>
                      </Card.Root>
                    ))}
                  </Box>
                </Flex>
              </Box>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ReactPaginate
                  previousLabel={"+"}
                  nextLabel={"-"}
                  pageCount={pages}
                  onPageChange={changePage}
                  activeClassName={"item active "}
                  breakClassName={"item break-me "}
                  breakLabel={"..."}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  marginPagesDisplayed={1}
                  nextClassName={"item next "}
                  pageClassName={"item pagination-page "}
                  pageRangeDisplayed={2}
                  previousClassName={"item previous"}
                />
              </div>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default DaftarBeritaDinkes;
