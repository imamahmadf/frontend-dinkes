import { useEffect, useState } from "react";
import { Box, Button, CloseButton, Container, Dialog, Flex, Heading, Image, Portal, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import Layout from "../../components/Layout";

const gayaField = {
  width: "100%",
  height: "40px",
  padding: "0 12px",
  borderRadius: "10px",
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--text)",
};

function formatTanggal(value) {
  if (!value) return "";
  const [tahun, bulan, hari] = String(value).slice(0, 10).split("-");
  const date = new Date(Number(tahun), Number(bulan) - 1, Number(hari));
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function GaleriPublik({ tipe, title, description }) {
  const [data, setData] = useState([]);
  const [opsiTahun, setOpsiTahun] = useState([]);
  const [opsiBidang, setOpsiBidang] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("loading");
  const [tahun, setTahun] = useState("");
  const [bidangId, setBidangId] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [dipilih, setDipilih] = useState(null);
  const limit = 9;
  const adaFilter = Boolean(tahun || bidangId || deskripsi);

  useEffect(() => {
    setTahun("");
    setBidangId("");
    setKataKunci("");
    setDeskripsi("");
    setPage(0);
  }, [tipe]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeskripsi((sekarang) => {
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
        if (tahun) params.set("tahun", tahun);
        if (bidangId) params.set("bidang", bidangId);
        if (deskripsi) params.set("deskripsi", deskripsi);

        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/galeri/get/${tipe}?${params.toString()}`
        );
        if (ignore) return;
        setData(res.data.result || []);
        setPages(res.data.totalPage || 0);
        setTotal(res.data.totalRows || 0);
        setOpsiTahun(res.data.filters?.tahun || []);
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
  }, [tipe, page, tahun, bidangId, deskripsi]);

  const resetFilter = () => {
    setStatus("loading");
    setTahun("");
    setBidangId("");
    setKataKunci("");
    setDeskripsi("");
    setPage(0);
  };

  const gantiHalaman = (berikutnya) => {
    setPage(berikutnya);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh" color="var(--text)">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 6, md: 8 }}>
          <Container maxW="1100px" px={{ base: 4, md: 6 }}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
              Galeri
            </Text>
            <Heading as="h1" mt={2} fontSize={{ base: "28px", md: "36px" }} lineHeight="1.2">
              {title}
            </Heading>
            <Text mt={3} maxW="680px" fontSize={{ base: "15px", md: "17px" }} color="whiteAlpha.900">
              {description}
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
              if (deskripsi !== berikutnya) setPage(0);
              setDeskripsi(berikutnya);
            }}
          >
            <Flex direction={{ base: "column", lg: "row" }} gap={3} align={{ lg: "end" }}>
              <Box flex={{ lg: "0 0 150px" }}>
                <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">Tahun</Text>
                <select
                  aria-label="Filter tahun"
                  value={tahun}
                  onChange={(event) => {
                    setTahun(event.target.value);
                    setPage(0);
                  }}
                  style={gayaField}
                >
                  <option value="">Semua tahun</option>
                  {opsiTahun.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </Box>
              <Box flex={{ lg: "1 1 200px" }}>
                <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">Bidang</Text>
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
                    <option key={item.id} value={item.id}>{item.nama}</option>
                  ))}
                </select>
              </Box>
              <Box flex={{ lg: "1.4 1 260px" }}>
                <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">Deskripsi</Text>
                <input
                  aria-label="Filter deskripsi"
                  value={kataKunci}
                  onChange={(event) => setKataKunci(event.target.value)}
                  placeholder="Cari deskripsi"
                  style={gayaField}
                />
              </Box>
              <Flex gap={2}>
                <Button type="submit" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>Cari</Button>
                {adaFilter ? (
                  <Button type="button" variant="outline" borderColor="var(--line)" color="var(--text)" onClick={resetFilter}>
                    Atur ulang
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          </Box>

          {status === "loading" ? <Text color="var(--muted)">Memuat galeri...</Text> : null}
          {status === "error" ? (
            <Text color="var(--muted)">Galeri belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
          ) : null}
          {status === "ready" && data.length === 0 ? (
            <Text color="var(--muted)">
              {adaFilter ? `Tidak ada ${title.toLowerCase()} yang sesuai dengan filter.` : `Belum ada ${title.toLowerCase()}.`}
            </Text>
          ) : null}
          {status === "ready" && data.length > 0 ? (
            <Text mb={4} fontSize="14px" color="var(--muted)">{total} {title.toLowerCase()}</Text>
          ) : null}
          {status === "ready" && data.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {data.map((item) => (
                <Box
                  key={item.id}
                  as="button"
                  type="button"
                  textAlign="left"
                  bg="var(--card)"
                  color="var(--text)"
                  borderWidth="1px"
                  borderColor="var(--line)"
                  borderRadius="16px"
                  overflow="hidden"
                  cursor={item.foto ? "pointer" : "default"}
                  _hover={item.foto ? { borderColor: "#14A75B" } : undefined}
                  onClick={() => {
                    if (item.foto) setDipilih(item);
                  }}
                >
                  {item.foto ? (
                    <Image
                      src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${item.foto}`}
                      alt={item.deskripsi || title}
                      w="100%"
                      h="200px"
                      objectFit="cover"
                    />
                  ) : (
                    <Box h="200px" bg="var(--surface)" />
                  )}
                  <Box p={4}>
                    <Text fontWeight="600" lineHeight="1.5">
                      {item.deskripsi}
                    </Text>
                    <Text mt={2} fontSize="14px" color="var(--muted)">
                      {[item.bidang?.nama, formatTanggal(item.tanggal)].filter(Boolean).join(" · ")}
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
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

      <Dialog.Root open={Boolean(dipilih)} onOpenChange={(details) => { if (!details.open) setDipilih(null); }}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="960px" bg="var(--card)" color="var(--text)" mx={4}>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {dipilih?.foto ? (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${dipilih.foto}`}
                    alt={dipilih.deskripsi || title}
                    w="100%"
                    maxH="70vh"
                    objectFit="contain"
                    bg="var(--surface)"
                    borderRadius="12px"
                  />
                ) : null}
                {dipilih?.deskripsi ? (
                  <Text mt={4} fontWeight="600" lineHeight="1.5">
                    {dipilih.deskripsi}
                  </Text>
                ) : null}
                <Text mt={1} fontSize="14px" color="var(--muted)">
                  {[dipilih?.bidang?.nama, formatTanggal(dipilih?.tanggal)].filter(Boolean).join(" · ")}
                </Text>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Layout>
  );
}

export default GaleriPublik;
