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

const images = [Dinkes3, Dinkes4, Dinkes1, Dinkes2];

const items = [
  "pengoordinasian penyusunan rencana strategis Dinas berdasarkan rencana pembangunan jangka menengah Daerah sebagai pedoman penyusunan rencana kerja;",
  "pengoordinasian penyusunan rencana kerja berdasarkan rencana strategis Dinas sebagai pedoman penyusunan kegiatan dan anggaran;",

  "pelaksanaan penetapan perjanjian kinerja Dinas sesuai dengan ketentuan yang berlaku;",
  "pengoordinasian penyusunan kegiatan dan anggaran Dinas sesuai dengan rencana kerja yang telah ditetapkan guna pencapaian kinerja Dinas;",

  "penetapan standar operasional prosedur dan standar pelayanan di lingkungan Dinas sebagai pedoman pelaksanaan tugas dan fungsi;",
  "perumusan kebijakan di bidang kesehatan yang meliputi bidang pemenuhan upaya kesehatan perorangan dan upaya kesehatan masyarakat, sediaan farmasi, alat kesehatan dan makanan minuman, peningkatan kapasitas sumber daya manusia kesehatan dan pemberdayaan masyarakat bidang kesehatan;",

  "pengoordinasian pelaksanaan kebijakan di bidang pemenuhan upaya kesehatan perorangan dan upaya kesehatan masyarakat, sediaan farmasi, alat kesehatan dan makanan minuman, peningkatan kapasitas sumber daya manusia kesehatan dan pemberdayaan masyarakat bidang kesehatan;",
  "pelaksanaan evaluasi dan pelaporan di bidang pemenuhan upaya kesehatan perorangan dan upaya kesehatan masyarakat, sediaan farmasi, alat kesehatan dan makanan minuman, peningkatan kapasitas sumber daya manusia kesehatan dan pemberdayaan masyarakat bidang kesehatan;",

  "pelaksanaan evaluasi dan pelaporan pelaksanaan rencana strategis Dinas guna mengetahui permasalahan yang dihadapi dan sebagai bahan pertimbangan pengambilan kebijakan.",
  "pelaksanaan evaluasi dan pelaporan pengelolaan keuangan secara berkala, yang meliputi laporan keuangan bulanan, triwulan, semester dan laporan keuangan tahunan Dinas sesuai dengan ketentuan peraturan perundang-undangan;",

  "pelaksanaan pelaporan capaian kinerja dalam bentuk laporan akuntabilitas kinerja Dinas sesuai ketentuan yang berlaku;",
  "penyelenggaraan fungsi kesekretariatan Dinas;",

  "pembinaan Jabatan Fungsional pada Dinas sesuai dengan kewenangan yang diberikan;",
  "pengoordinasian penyusunan rencana kebutuhan jabatan fungsional dan pelaksana pada Dinas;",

  "pengendalian pelaksanaan tugas UPTD;",
  "penyelenggaraan kerja sama dengan pihak atau instansi terkait dalam rangka mendukung pelaksanaan urusan pemerintah dibidang kesehatan.",

  "pelaksanaan penilaian tugas bawahan melalui sistem penilaian yang tersedia sesuai ketentuan yang berlaku dalam rangka peningkatan karir, pemberian penghargaan dan sanksi;",
  "pemberian saran dan pertimbangan teknis kepada Bupati melalui Sekretaris Daerah sebagai bahan masukan dalam pengambilan kebijakan Daerah; dan",

  "pelaksanaan fungsi lain sesuai dengan ketentuan peraturan perundang-undangan.",
];
function TugasDanFungsi() {
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
                  PROFILE DINAS KESEHATAN
                </Text>
                <Text
                  fontSize={"30px"}
                  fontWeight={100}
                  color={"white"}
                  textAlign={"center"}
                >
                  TUGAS & FUNGSI
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
                Tugas & Fungsi
              </Heading>

              <Box pb={"30px"}>
                <Text fontSize={"30px"} textAlign={"justify"} mb={"20px"}>
                  Berdasarkan Peraturan Bupati Kabupaten Paser Nomor 4 tahun
                  2023 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi,
                  Serta Tata Kerja Pada Dinas Kesehatan Kabupaten Paser, tugas
                  pokok dari Dinas Kesehatan Kabupaten Paser adalah membantu
                  Bupati melaksanakan urusan pemerintahan bidang Kesehatan yang
                  menjadi kewenangan dan tugas pembantuan yang diberikan kepada
                  daerah.
                </Text>
                <Text fontSize={"30px"} textAlign={"justify"}>
                  Dalam melaksanakan tugas tersebut, Dinas Kesehatan mempunyai
                  fungsi:
                </Text>
                <List.Root fontSize={"30px"} textAlign={"justify"} ms={"30px"}>
                  {items.map((item, index) => (
                    <List.Item key={index} _marker={{ color: "inherit" }}>
                      {item}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </Layout>
  );
}

export default TugasDanFungsi;
