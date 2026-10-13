import { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function teksBersih(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "").trim();
}

function KartuBerita({ item }) {
  const [gagal, setGagal] = useState(false);
  const ringkasan = teksBersih(item.ringkasan);

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
          h="180px"
          w="100%"
          objectFit="cover"
          onError={() => setGagal(true)}
        />
      ) : (
        <Box h="180px" bg="var(--surface)" />
      )}
      <Box p={4} display="flex" flexDirection="column" flex="1">
        <Text fontSize="12px" fontWeight="700" color="#0E7A45" textTransform="uppercase">
          {item.temaBerita?.tema || "Berita"}
        </Text>
        <Heading as="h2" mt={2} fontSize="18px" lineHeight="1.35" color="var(--heading)">
          {item.judul}
        </Heading>
        {ringkasan ? (
          <Text mt={2} fontSize="14px" color="var(--muted)" lineClamp={3}>
            {ringkasan}
          </Text>
        ) : null}
        <Text mt="auto" pt={4} fontSize="14px" fontWeight="700" color="#14A75B">
          Baca selengkapnya
        </Text>
      </Box>
    </Box>
  );
}

const gayaField = {
  width: "100%",
  height: "40px",
  padding: "0 12px",
  borderRadius: "10px",
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--text)",
};

function DaftarBeritaDinkes() {
  const [dataBerita, setDataBerita] = useState([]);
  const [opsiTema, setOpsiTema] = useState([]);
  const [opsiBidang, setOpsiBidang] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [status, setStatus] = useState("loading");
  const [temaId, setTemaId] = useState("");
  const [bidangId, setBidangId] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [judul, setJudul] = useState("");
  const limit = 9;
  const adaFilter = Boolean(temaId || bidangId || judul);

  useEffect(() => {
    const timer = setTimeout(() => {
      setJudul((sekarang) => {
        const berikutnya = kataKunci.trim();
        if (sekarang !== berikutnya) setPage(0);
        return berikutnya;
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [kataKunci]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (temaId) params.set("tema", temaId);
        if (bidangId) params.set("bidang", bidangId);
        if (judul) params.set("judul", judul);

        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/get/all?${params.toString()}`
        );
        if (ignore) return;
        setDataBerita(res.data.result || []);
        setPages(res.data.totalPage || 0);
        setRows(res.data.totalRows || 0);
        setOpsiTema(res.data.filters?.tema || []);
        setOpsiBidang(res.data.filters?.bidang || []);
        setStatus("ready");
      } catch (error) {
        if (ignore) return;
        console.error(error);
        setStatus("error");
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [page, temaId, bidangId, judul]);

  const resetFilter = () => {
    setStatus("loading");
    setTemaId("");
    setBidangId("");
    setKataKunci("");
    setJudul("");
    setPage(0);
  };

  const gantiHalaman = (berikutnya) => {
    setPage(berikutnya);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 8, md: 10 }}>
          <Container maxW="1100px" px={{ base: 4, md: 6 }}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
              Dinas Kesehatan
            </Text>
            <Heading as="h1" mt={2} fontSize={{ base: "28px", md: "36px" }} lineHeight="1.2">
              Berita
            </Heading>
            <Text mt={3} maxW="680px" fontSize={{ base: "15px", md: "17px" }} color="whiteAlpha.900">
              Kabar kegiatan dan informasi terbaru dari Dinas Kesehatan Kabupaten Paser.
            </Text>
          </Container>
        </Box>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
          <Box
            as="form"
            mb={5}
            onSubmit={(event) => {
              event.preventDefault();
              const berikutnya = kataKunci.trim();
              if (judul !== berikutnya) setPage(0);
              setJudul(berikutnya);
            }}
          >
            <Flex direction={{ base: "column", lg: "row" }} gap={3} align={{ lg: "end" }}>
              <Box flex={{ lg: "1 1 200px" }}>
                <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">
                  Tema
                </Text>
                <select
                  aria-label="Filter tema"
                  value={temaId}
                  onChange={(event) => {
                    setTemaId(event.target.value);
                    setPage(0);
                  }}
                  style={gayaField}
                >
                  <option value="">Semua tema</option>
                  {opsiTema.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </Box>

              <Box flex={{ lg: "1 1 200px" }}>
                <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">
                  Bidang
                </Text>
                <select
                  aria-label="Filter bidang"
                  value={bidangId}
                  onChange={(event) => {
                    setBidangId(event.target.value);
                    setPage(0);
                  }}
                  style={gayaField}
                >
                  <option value="">Semua bidang</option>
                  {opsiBidang.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </Box>

              <Box flex={{ lg: "1.4 1 260px" }}>
                <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">
                  Judul
                </Text>
                <input
                  aria-label="Filter judul"
                  value={kataKunci}
                  onChange={(event) => setKataKunci(event.target.value)}
                  placeholder="Cari judul berita"
                  style={gayaField}
                />
              </Box>

              <Flex gap={2}>
                <Button type="submit" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>
                  Cari
                </Button>
                {adaFilter ? (
                  <Button type="button" variant="outline" borderColor="var(--line)" color="var(--text)" onClick={resetFilter}>
                    Atur ulang
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          </Box>

          {status === "loading" ? <Text color="var(--muted)">Memuat berita...</Text> : null}
          {status === "error" ? (
            <Text color="var(--muted)">Berita belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
          ) : null}
          {status === "ready" && dataBerita.length === 0 ? (
            <Text color="var(--muted)">
              {adaFilter ? "Tidak ada berita yang sesuai dengan filter." : "Belum ada berita."}
            </Text>
          ) : null}

          {status === "ready" && dataBerita.length > 0 ? (
            <>
              <Text mb={4} fontSize="14px" color="var(--muted)">
                {rows} berita
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {dataBerita.map((item) => (
                  <KartuBerita key={item.id || item.slug} item={item} />
                ))}
              </SimpleGrid>
            </>
          ) : null}

          {status === "ready" && pages > 0 ? (
            <Flex mt={8} align="center" justify="space-between" gap={3}>
              <Button
                variant="outline"
                borderColor="#14A75B"
                color="#0E7A45"
                disabled={page <= 0}
                onClick={() => gantiHalaman(Math.max(0, page - 1))}
              >
                Sebelumnya
              </Button>
              <Text fontSize="14px" color="var(--muted)">
                Halaman {page + 1} dari {pages}
              </Text>
              <Button
                variant="outline"
                borderColor="#14A75B"
                color="#0E7A45"
                disabled={page + 1 >= pages}
                onClick={() => gantiHalaman(page + 1)}
              >
                Berikutnya
              </Button>
            </Flex>
          ) : null}
        </Container>
      </Box>
    </Layout>
  );
}

export default DaftarBeritaDinkes;
