import { Box, Container, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import Kadis from "../../assets/kadis.jpg";

const identitas = [
  { label: "NIP", value: "198407262002121001" },
  { label: "Pangkat/Golongan", value: "Pembina Utama Muda / IV C" },
  { label: "Alamat", value: "Tanah Grogot, Kabupaten Paser, Kalimantan Timur" },
  { label: "Agama", value: "Islam" },
  { label: "Jenis kelamin", value: "Laki-laki" },
];

const jabatan = [
  "Kepala Dinas Kesehatan (19 Juni 2024 – sekarang)",
  "Kepala Bagian Sumber Daya Alam Sekretariat Daerah (02 Februari 2023 – 18 Juni 2024)",
  "Sekretaris Dinas Komunikasi Informatika Statistik dan Persandian (05 April 2022 – 01 Februari 2023)",
  "Camat Muara Samu (08 Agustus 2018 – 04 April 2022)",
  "Sekretaris Camat Batu Engau (30 Desember 2016 – 07 Agustus 2018)",
  "Sekretaris Badan Lingkungan Hidup Kab. Paser (20 Agustus 2014 – 29 Desember 2016)",
  "Sekretaris Camat Kuaro (02 April 2012 – 20 Agustus 2014)",
];

const diklat = [
  "Pelatihan Kepemimpinan Nasional Tingkat II (PKN TK II) (2024)",
  "Diklatpim TK III (2012)",
  "Diklatpim TK IV (2006)",
  "Workshop Penguatan Manajemen Kinerja Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP) (2024)",
  "Pelatihan Pengelolaan Manajemen Risiko Perangkat Daerah (2023)",
];

function Bagian({ judul, children }) {
  return (
    <Box
      mt={4}
      bg="var(--card)"
      borderWidth="1px"
      borderColor="var(--line)"
      borderRadius="16px"
      p={{ base: 4, md: 6 }}
    >
      <Heading as="h2" fontSize={{ base: "18px", md: "20px" }} color="var(--heading)">
        {judul}
      </Heading>
      <Box mt={4}>{children}</Box>
    </Box>
  );
}

function Daftar({ items }) {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {items.map((item, index) => (
        <Box key={item} display="flex" gap={3} alignItems="flex-start">
          <Text
            flexShrink={0}
            w="28px"
            h="28px"
            borderRadius="full"
            bg="var(--surface)"
            color="#0E7A45"
            fontSize="13px"
            fontWeight="700"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {index + 1}
          </Text>
          <Text pt="3px" fontSize="15px" lineHeight="1.6">
            {item}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

function KepalaDinas() {
  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh" color="var(--text)">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 6, md: 8 }}>
          <Container maxW="960px" px={{ base: 4, md: 6 }}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
              Dinas Kesehatan
            </Text>
            <Heading as="h1" mt={2} fontSize={{ base: "28px", md: "36px" }} lineHeight="1.2">
              Kepala Dinas
            </Heading>
            <Text mt={3} fontSize={{ base: "15px", md: "17px" }} color="whiteAlpha.900">
              Profil kepala Dinas Kesehatan Kabupaten Paser.
            </Text>
          </Container>
        </Box>

        <Container maxW="960px" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
          <Box
            bg="var(--card)"
            borderWidth="1px"
            borderColor="var(--line)"
            borderRadius="16px"
            overflow="hidden"
          >
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 5, md: 8 }}
              p={{ base: 4, md: 6 }}
            >
              <Image
                src={Kadis}
                alt="Amri Yulihardi, Kepala Dinas Kesehatan Kabupaten Paser"
                w={{ base: "100%", md: "280px" }}
                h={{ base: "320px", md: "360px" }}
                objectFit="cover"
                objectPosition="top"
                borderRadius="12px"
                flexShrink={0}
              />
              <Box flex="1" minW={0}>
                <Text fontSize="13px" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="#0E7A45">
                  Kepala Dinas Kesehatan
                </Text>
                <Heading as="h2" mt={2} fontSize={{ base: "24px", md: "30px" }} lineHeight="1.25" color="var(--heading)">
                  Amri Yulihardi, S.STP., M.Si.
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                  {identitas.map((item) => (
                    <Box key={item.label}>
                      <Text fontSize="13px" color="var(--muted)">
                        {item.label}
                      </Text>
                      <Text mt={1} fontSize="15px" fontWeight="600" color="var(--heading)">
                        {item.value}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Box>

          <Bagian judul="Pendidikan">
            <Text fontSize="15px" lineHeight="1.6">
              S-2 Administrasi Pemerintahan Daerah
            </Text>
          </Bagian>

          <Bagian judul="Riwayat jabatan">
            <Daftar items={jabatan} />
          </Bagian>

          <Bagian judul="Riwayat diklat teknis dan kepemimpinan">
            <Daftar items={diklat} />
          </Bagian>
        </Container>
      </Box>
    </Layout>
  );
}

export default KepalaDinas;
