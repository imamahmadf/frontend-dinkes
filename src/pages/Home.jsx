import React from "react";
import {
  Avatar,
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
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // penting!
import Peta from "../components/Peta";

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
const images = [Home1, Home2, Home3];

const BannerSwiper = [Banner1, Banner2, Banner3];

function Home() {
  return (
    <Layout>
      <Box bgColor={"white"}>
        <Box w="100vw" h="100vh" overflow="hidden" position="relative">
          {/* Tombol Sosial Media di Kiri */}
          <Box
            position="absolute"
            top="50%"
            left="30px"
            transform="translateY(-50%)"
            zIndex={20}
            display="flex"
            flexDirection="column"
            gap={4}
          >
            {/* WhatsApp */}
            <Link href="https://wa.me/6281234567890" isExternal>
              <Box
                bg="#25D366"
                borderRadius="full"
                boxShadow="md"
                p={3}
                _hover={{ bg: "#1DA851" }}
                transition="0.2s"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.59 1.38 5.08L2 22l5.09-1.36A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18c-1.64 0-3.18-.4-4.51-1.1l-.32-.17-3.02.8.81-2.95-.17-.3A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8Zm4.43-5.34c-.24-.12-1.41-.7-1.62-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.33 1 2.49.14.16 1.7 2.6 4.13 3.54.58.2 1.03.32 1.38.41.58.15 1.1.13 1.52.08.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </Box>
            </Link>
            {/* Instagram */}
            <Link href="https://instagram.com/dinkespaser" isExternal>
              <Box
                bg="#E1306C"
                borderRadius="full"
                boxShadow="md"
                p={3}
                _hover={{ bg: "#C13584" }}
                transition="0.2s"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 2.25A6.25 6.25 0 1 1 5.75 12 6.25 6.25 0 0 1 12 5.75Zm0 1.5A4.75 4.75 0 1 0 16.75 12 4.75 4.75 0 0 0 12 7.25Zm5.25-.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.25 6.75Z" />
                </svg>
              </Box>
            </Link>
            {/* Facebook */}
            <Link href="https://facebook.com/dinkespaser" isExternal>
              <Box
                bg="#1877F3"
                borderRadius="full"
                boxShadow="md"
                p={3}
                _hover={{ bg: "#145DB2" }}
                transition="0.2s"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.1V12h2.1v-1.6c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.9h-1.93v7.05A10 10 0 0 0 22 12Z" />
                </svg>
              </Box>
            </Link>
          </Box>
          {/* Konten Utama - Teks dan Button di Kiri, Info Box di Kanan */}
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
              {/* Bagian Kiri - Teks dan Button */}
              <Box flex="1" textAlign={{ base: "center", lg: "left" }}>
                <Box
                  color="white"
                  textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                  mb={6}
                >
                  <Text
                    fontSize={{ base: "2xl", md: "4xl", lg: "40px" }}
                    fontWeight="bold"
                    mb={0}
                  >
                    Pusat Layanan dan Informasi
                  </Text>
                  <Text
                    fontSize={{ base: "2xl", md: "4xl", lg: "40px" }}
                    fontWeight="bold"
                    mb={2}
                  >
                    Kesehatan di Kabupaten Paser
                  </Text>
                  <Text
                    fontSize={{ base: "2xl", md: "4xl", lg: "14px" }}
                    mb={2}
                  >
                    TUNTAS (TANGGUH, UNGGUL, TRANSFORMATIF, ADIL, DAN SEJAHTERA)
                  </Text>
                </Box>

                {/* Button Section */}
                <HStack
                  spacing={4}
                  justify={{ base: "center", lg: "flex-start" }}
                  flexWrap="wrap"
                >
                  <Button
                    size={{ base: "md", md: "lg" }}
                    colorScheme="blue"
                    bg="blue.500"
                    _hover={{ bg: "blue.600" }}
                    color="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    boxShadow="lg"
                  >
                    Pelayanan Online
                  </Button>
                  <Button
                    size={{ base: "md", md: "lg" }}
                    colorScheme="green"
                    bg="green.500"
                    _hover={{ bg: "green.600" }}
                    color="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    boxShadow="lg"
                  >
                    Informasi PPID
                  </Button>
                  <Button
                    size={{ base: "md", md: "lg" }}
                    colorScheme="orange"
                    bg="orange.500"
                    _hover={{ bg: "orange.600" }}
                    color="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    boxShadow="lg"
                  >
                    Profil Dinkes
                  </Button>
                </HStack>
              </Box>

              {/* Bagian Kanan - Info Box */}
              <Box flex="1" maxW={{ base: "100%", lg: "50%" }}>
                <Box
                  bg="rgba(17, 15, 15, 0.1)"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  p={6}
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
                >
                  <VStack spacing={4} align="stretch">
                    <Flex align="flex-start" color="white" gap={3}>
                      <Box mt={1}>
                        <BsBuilding size={20} />
                      </Box>
                      <Box>
                        <Text fontSize="18px" fontWeight="bold" mb={1}>
                          Alamat:
                        </Text>
                        <Text fontSize="16px">
                          Komplek Perkantoran Jl. Kusuma Bangsa KM. 05 Gedung A.
                          Lt.2 Kav. 1 Kav.1,Tanah Grogot,Paser,Kalimantan Timur
                          76251
                        </Text>
                      </Box>
                    </Flex>
                    <Flex align="flex-start" color="white" gap={3}>
                      <Box mt={1}>
                        <BsTelephone size={20} />
                      </Box>
                      <Box>
                        <Text fontSize="18px" fontWeight="bold" mb={1}>
                          Kontak:
                        </Text>
                        <Text fontSize="16px">WhatsApp: 0812-xxxx-xxxx</Text>
                        <Text fontSize="16px">
                          Email: dinkes@paserkab.go.id
                        </Text>
                      </Box>
                    </Flex>
                    <Flex align="flex-start" color="white" gap={3}>
                      <Box mt={1}>
                        <BsClock size={20} />
                      </Box>
                      <Box>
                        <Text fontSize="18px" fontWeight="bold" mb={1}>
                          Jam Operasional:
                        </Text>
                        <Text fontSize="16px">
                          Senin - Jumat, 08.00 - 16.00 WITA
                        </Text>
                      </Box>
                    </Flex>
                  </VStack>
                </Box>
              </Box>
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
        <Container
          mt={"30px"}
          p={"30px"}
          maxW="container.lg"
          bgColor={"gray.100"}
        >
          {" "}
          <Center height={"100px"} color={"#524E4E"}>
            <Box width={"100%"}>
              <Text fontSize={"40px"} fontWeight={1000} textAlign={"center"}>
                PIMPINAN DAERAH
              </Text>
            </Box>
          </Center>
          <SimpleGrid color={"#524E4E"} columns={[2, null, 3]} gap={4}>
            <Flex gap={5}>
              <Image src={Bupati} width={"180px"} h={"220px"} />
              <Box>
                <Text fontSize={"20px"} fontWeight={400}>
                  BUPATI PASER
                </Text>
                <Text fontSize={"20px"} fontWeight={700} color={"black"}>
                  dr. Fahmi Fadli
                </Text>
              </Box>
            </Flex>
            <Flex gap={10}>
              <Image src={Wabup} width={"180px"} h={"220px"} />
              <Box>
                <Text fontSize={"20px"} fontWeight={400}>
                  WAKIL BUPATI PASER
                </Text>
                <Text fontSize={"20px"} fontWeight={700} color={"black"}>
                  H. Ikhwan Antasari, S.Sos.
                </Text>
              </Box>
            </Flex>{" "}
            <Flex gap={10}>
              <Image src={Sekda} width={"180px"} h={"220px"} />
              <Box>
                <Text fontSize={"20px"} fontWeight={400}>
                  SEKRETARIS DAERAH
                </Text>
                <Text fontSize={"20px"} fontWeight={700} color={"black"}>
                  Drs. Katsul Wijaya, M.Si
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>{" "}
        <Box>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/mUtaYgkgUhs?si=SFK4MmVGtSMUk_Ux"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </Box>
        <Box p={"30px"}>
          <Peta />
        </Box>
      </Box>
    </Layout>
  );
}

export default Home;
