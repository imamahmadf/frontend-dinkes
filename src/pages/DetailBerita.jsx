import { useEffect, useState } from "react";
import { Box, Button, Container, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function teksBersih(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "").trim();
}

function KartuRekomendasi({ item }) {
  const [gagal, setGagal] = useState(false);

  return (
    <Box
      as={RouterLink}
      to={`/berita/${item.slug}`}
      bg="var(--card)"
      color="var(--text)"
      borderWidth="1px"
      borderColor="var(--line)"
      borderRadius="16px"
      overflow="hidden"
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      _hover={{ borderColor: "#14A75B" }}
    >
      {item.foto && !gagal ? (
        <Image
          src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${item.foto}`}
          alt=""
          h="140px"
          w="100%"
          objectFit="cover"
          onError={() => setGagal(true)}
        />
      ) : (
        <Box h="140px" bg="var(--surface)" />
      )}
      <Box p={4}>
        <Text fontSize="12px" fontWeight="700" color="#0E7A45" textTransform="uppercase">
          {item.temaBerita?.tema || "Berita"}
        </Text>
        <Heading as="h3" mt={2} fontSize="16px" lineHeight="1.35" color="var(--heading)">
          {item.judul}
        </Heading>
        {teksBersih(item.ringkasan) ? (
          <Text mt={2} fontSize="14px" color="var(--muted)" lineClamp={2}>
            {teksBersih(item.ringkasan)}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}

function Detailberita() {
  const { slug } = useParams();
  const [dataBerita, setDataBerita] = useState(null);
  const [rekomendasi, setRekomendasi] = useState([]);
  const [status, setStatus] = useState("loading");
  const [gagalGambar, setGagalGambar] = useState(false);

  useEffect(() => {
    let ignore = false;
    window.scrollTo(0, 0);

    async function load() {
      setStatus("loading");
      setGagalGambar(false);
      try {
        const [detail, daftar] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/get/detail/${slug}`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/get/all?page=0&limit=4`),
        ]);
        if (ignore) return;
        const hasil = detail.data.result;
        setDataBerita(hasil);
        setRekomendasi(
          (daftar.data.result || []).filter((item) => item.slug !== slug).slice(0, 3)
        );
        setStatus(hasil ? "ready" : "empty");
        if (hasil?.judul) {
          document.title = `${hasil.judul} | Dinkes Paser`;
        }
      } catch (err) {
        if (ignore) return;
        console.error(err);
        setStatus("error");
      }
    }

    if (slug) load();
    return () => {
      ignore = true;
    };
  }, [slug]);

  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh" color="var(--text)">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 6, md: 8 }}>
          <Container maxW="760px" px={{ base: 4, md: 6 }}>
            <Button
              as={RouterLink}
              to="/daftar-berita-dinkes"
              variant="ghost"
              color="white"
              px={0}
              h="auto"
              minH="32px"
              _hover={{ bg: "transparent", textDecoration: "underline" }}
            >
              Semua berita
            </Button>
            {status === "ready" && dataBerita ? (
              <>
                <Text mt={3} fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
                  {dataBerita.temaBerita?.tema || "Berita"}
                </Text>
                <Heading as="h1" mt={2} fontSize={{ base: "26px", md: "34px" }} lineHeight="1.25">
                  {dataBerita.judul}
                </Heading>
                {dataBerita.penulis ? (
                  <Text mt={3} fontSize="14px" color="whiteAlpha.900">
                    {dataBerita.penulis}
                  </Text>
                ) : null}
              </>
            ) : (
              <Heading as="h1" mt={3} fontSize={{ base: "26px", md: "34px" }}>
                Berita
              </Heading>
            )}
          </Container>
        </Box>

        <Container maxW="760px" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
          <Box bg="var(--card)" borderWidth="1px" borderColor="var(--line)" borderRadius="16px" boxShadow="sm" overflow="hidden">
            {status === "loading" ? <Text p={{ base: 4, md: 8 }} color="var(--muted)">Memuat berita...</Text> : null}
            {status === "error" ? (
              <Text p={{ base: 4, md: 8 }} color="var(--muted)">
                Berita belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.
              </Text>
            ) : null}
            {status === "empty" ? (
              <Text p={{ base: 4, md: 8 }} color="var(--muted)">Berita ini tidak ditemukan.</Text>
            ) : null}

            {status === "ready" && dataBerita ? (
              <>
                {dataBerita.foto && !gagalGambar ? (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${dataBerita.foto}`}
                    alt=""
                    w="100%"
                    maxH={{ base: "240px", md: "420px" }}
                    objectFit="cover"
                    onError={() => setGagalGambar(true)}
                  />
                ) : null}
                <Box
                  p={{ base: 4, md: 8 }}
                  fontSize={{ base: "16px", md: "17px" }}
                  lineHeight="1.7"
                  css={{
                    "& p": { marginBottom: "0.9rem" },
                    "& h1, & h2, & h3": { fontWeight: 700, margin: "1.2rem 0 0.6rem", lineHeight: 1.3 },
                    "& ul, & ol": { paddingLeft: "1.25rem", marginBottom: "0.9rem" },
                    "& img": { maxWidth: "100%", height: "auto", borderRadius: "12px" },
                    "& a": { color: "#0E7A45" },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: dataBerita.isi || "<p>Isi berita belum tersedia.</p>",
                  }}
                />
              </>
            ) : null}
          </Box>
        </Container>

        {status === "ready" && rekomendasi.length > 0 ? (
          <Container maxW="1100px" px={{ base: 4, md: 6 }} pb={{ base: 8, md: 10 }}>
            <Heading as="h2" fontSize={{ base: "22px", md: "26px" }}>
              Berita terbaru
            </Heading>
            <Text mt={1} mb={4} fontSize="14px" color="var(--muted)">
              Bacaan lain dari Dinas Kesehatan Kabupaten Paser.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
              {rekomendasi.map((item) => (
                <KartuRekomendasi key={item.id || item.slug} item={item} />
              ))}
            </SimpleGrid>
          </Container>
        ) : null}
      </Box>
    </Layout>
  );
}

export default Detailberita;
