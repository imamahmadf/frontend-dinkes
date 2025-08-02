import React from "react";
import {
  Box,
  Image,
  Text,
  Center,
  Container,
  Heading,
  VStack,
  HStack,
  Badge,
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
const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

function KepalaDinas() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box w="100vw" position="relative">
          <Box bgColor={"#14A75B"} height={"350px"}></Box>
          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            top="calc(25vh - 30px)"
            bg="white"
            color="black"
            px={8}
            py={4}
            zIndex={10}
            minHeight={"100px"}
            minWidth={"1500px"}
            bgColor={"gray"}
          >
            <Center height={"100px"}>
              <Box width={"100%"}>
                <Text
                  fontSize={"40px"}
                  fontWeight={1000}
                  color={"white"}
                  textAlign={"center"}
                >
                  KEPALA DINAS KESEHATAN
                </Text>
                <Text
                  fontSize={"30px"}
                  fontWeight={100}
                  color={"white"}
                  textAlign={"center"}
                >
                  KABUPATEN PASER
                </Text>
              </Box>
            </Center>
          </Box>
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              pt={"80px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
              px={"80px"}
              pb={"80px"}
            >
              <Center flexDirection={"column"}>
                <Heading
                  mb={"40px"}
                  fontSize={"35px"}
                  textAlign="center"
                  color={"#14A75B"}
                >
                  Profil Kepala Dinas Kesehatan
                </Heading>

                {/* Foto dan Informasi Utama */}
                <Box
                  display="flex"
                  gap="40px"
                  mb="40px"
                  alignItems="flex-start"
                >
                  <Box flex="0 0 300px">
                    <Image
                      src={Dinkes1}
                      alt="Kepala Dinas Kesehatan"
                      borderRadius="lg"
                      boxShadow="lg"
                      width="100%"
                      height="400px"
                      objectFit="cover"
                    />
                  </Box>

                  <Box flex="1">
                    <VStack spacing="20px" align="stretch">
                      <Box>
                        <Heading size="lg" color="#14A75B" mb="15px">
                          Amri Yulihardi, S.STP., M.Si.
                        </Heading>
                        <Badge colorScheme="green" fontSize="14px" mb="10px">
                          Kepala Dinas Kesehatan
                        </Badge>
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="bold" mb="10px">
                          Informasi Pribadi:
                        </Text>
                        <VStack spacing="8px" align="stretch">
                          <HStack justify="space-between">
                            <Text fontWeight="semibold" width="150px">
                              NIP:
                            </Text>
                            <Text>198407262002121001</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontWeight="semibold" width="150px">
                              Pangkat/Golongan:
                            </Text>
                            <Text>Pembina Utama Muda / IV C</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontWeight="semibold" width="150px">
                              Alamat:
                            </Text>
                            <Text>
                              Tanah Grogot Kabupaten Paser Kalimantan Timur
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontWeight="semibold" width="150px">
                              Agama:
                            </Text>
                            <Text>Islam</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontWeight="semibold" width="150px">
                              Jenis Kelamin:
                            </Text>
                            <Text>Laki-laki</Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </VStack>
                  </Box>
                </Box>

                {/* <Divider my="30px" /> */}

                {/* Pendidikan */}
                <Box width="100%" mb="30px">
                  <Heading size="md" color="#14A75B" mb="15px">
                    Pendidikan
                  </Heading>
                  <Box bg="gray.50" p="20px" borderRadius="md">
                    <Text fontSize="16px">
                      <strong>S-2 Administrasi Pemerintahan Daerah</strong>
                    </Text>
                  </Box>
                </Box>

                {/* Riwayat Jabatan */}
                <Box width="100%" mb="30px">
                  <Heading size="md" color="#14A75B" mb="15px">
                    Riwayat Jabatan
                  </Heading>
                  <Box bg="gray.50" p="20px" borderRadius="md">
                    <VStack spacing="12px" align="stretch">
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          1.
                        </Text>
                        <Text>Kepala Dinas Kesehatan (19 Juni 2024 - )</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          2.
                        </Text>
                        <Text>
                          Kepala Bagian Sumber Daya Alam Sekretariat Daerah (02
                          Februari 2023 – 18 Juni 2024)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          3.
                        </Text>
                        <Text>
                          Sekretaris Dinas Komunikasi Informatika Statistik dan
                          Persandian (05 April 2022- 01 Februari 2023)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          4.
                        </Text>
                        <Text>
                          Camat Muara Samu (08 Agustus 2018- 04 April 2022)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          5.
                        </Text>
                        <Text>
                          Sekretaris Camat Batu Engau (30 Desember 2016-07
                          Agustus 2018)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          6.
                        </Text>
                        <Text>
                          Sekretaris Badan Lingkungan Hidup Kab. Paser (20
                          Agustus 2014-29 Desember 2016)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          7.
                        </Text>
                        <Text>
                          Sekretaris Camat Kuaro (02 April 2012-20 Agustus 2014)
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>

                {/* Riwayat Diklat */}
                <Box width="100%">
                  <Heading size="md" color="#14A75B" mb="15px">
                    Riwayat Diklat Teknis dan Kepemimpinan
                  </Heading>
                  <Box bg="gray.50" p="20px" borderRadius="md">
                    <VStack spacing="12px" align="stretch">
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          1.
                        </Text>
                        <Text>
                          PELATIHAN KEPEMIMPINAN NASIONAL TINGKAT II (PKN TK II)
                          (2024)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          2.
                        </Text>
                        <Text>DIKLATPIM TK III (2012)</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          3.
                        </Text>
                        <Text>DIKLATPIM TK IV (2006)</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          4.
                        </Text>
                        <Text>
                          Workshop Penguatan Manajemen Kinerja Sistem
                          Akuntabilitas Kinerja Instansi Pemerintah (SAKIP)
                          (2024)
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold" width="30px">
                          5.
                        </Text>
                        <Text>
                          Pelatihan Pengelolaan Manajemen Risiko Perangkat
                          Daerah (2023)
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>
              </Center>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default KepalaDinas;
