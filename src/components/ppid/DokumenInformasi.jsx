import { useEffect, useState } from "react";
import { Box, Button, Flex, Table, Text } from "@chakra-ui/react";
import axios from "axios";
import PpidLayout from "./PpidLayout";

const gayaField = {
  width: "100%",
  height: "40px",
  padding: "0 12px",
  borderRadius: "10px",
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--text)",
};

function DokumenInformasi({ jenisId, title, description }) {
  const [dokumen, setDokumen] = useState([]);
  const [opsiTahun, setOpsiTahun] = useState([]);
  const [opsiBidang, setOpsiBidang] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("loading");
  const [tahun, setTahun] = useState("");
  const [bidangId, setBidangId] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [judul, setJudul] = useState("");
  const limit = 10;
  const adaFilter = Boolean(tahun || bidangId || judul);

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
        if (tahun) params.set("tahun", tahun);
        if (bidangId) params.set("bidang", bidangId);
        if (judul) params.set("judul", judul);

        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/get/${jenisId}?${params.toString()}`
        );
        if (ignore) return;
        setDokumen(res.data.result || []);
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
  }, [jenisId, page, tahun, bidangId, judul]);

  const bukaDokumen = (fileName) => {
    if (!fileName) return;
    window.open(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${fileName}`, "_blank", "noopener,noreferrer");
  };

  const resetFilter = () => {
    setStatus("loading");
    setTahun("");
    setBidangId("");
    setKataKunci("");
    setJudul("");
    setPage(0);
  };

  return (
    <PpidLayout eyebrow="Informasi publik" title={title} description={description} wide>
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
          <Box flex={{ lg: "0 0 150px" }}>
            <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">
              Tahun
            </Text>
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
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Box>

          <Box flex={{ lg: "1 1 220px" }}>
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

          <Box flex={{ lg: "1.4 1 280px" }}>
            <Text mb={1} fontSize="13px" fontWeight="600" color="var(--muted)">
              Judul
            </Text>
            <input
              aria-label="Filter judul"
              value={kataKunci}
              onChange={(event) => setKataKunci(event.target.value)}
              placeholder="Cari judul dokumen"
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

      {status === "loading" ? <Text color="var(--muted)">Memuat dokumen...</Text> : null}
      {status === "error" ? (
        <Text color="var(--muted)">Dokumen belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
      ) : null}
      {status === "ready" && dokumen.length === 0 ? (
        <Text color="var(--muted)">
          {adaFilter ? "Tidak ada dokumen yang sesuai dengan filter." : "Belum ada dokumen pada kategori ini."}
        </Text>
      ) : null}

      {status === "ready" && dokumen.length > 0 ? (
        <>
          <Text fontSize="14px" color="var(--muted)" mb={4}>
            {total} dokumen
          </Text>

          <Box display={{ base: "none", md: "block" }} overflowX="auto">
            <Table.Root size="md">
              <Table.Header>
                <Table.Row bg="#14A75B">
                  <Table.ColumnHeader color="white" w="56px">No</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Judul</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Ringkasan</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Bidang</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Tahun</Table.ColumnHeader>
                  <Table.ColumnHeader color="white" textAlign="end">Dokumen</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {dokumen.map((item, index) => (
                  <Table.Row key={item.id || index}>
                    <Table.Cell>{page * limit + index + 1}</Table.Cell>
                    <Table.Cell fontWeight="600">{item.judul}</Table.Cell>
                    <Table.Cell>{item.ringkasan || "-"}</Table.Cell>
                    <Table.Cell>{item.bidang?.nama || "-"}</Table.Cell>
                    <Table.Cell>{item.tahun || "-"}</Table.Cell>
                    <Table.Cell textAlign="end">
                      <Button
                        size="sm"
                        bg="#14A75B"
                        color="white"
                        _hover={{ bg: "#0E7A45" }}
                        disabled={!item.dokumen}
                        onClick={() => bukaDokumen(item.dokumen)}
                      >
                        Lihat
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          <Flex display={{ base: "flex", md: "none" }} direction="column" gap={3}>
            {dokumen.map((item, index) => (
              <Box key={item.id || index} borderWidth="1px" borderColor="var(--line)" borderRadius="12px" p={4} bg="var(--surface)">
                <Text fontSize="12px" color="var(--muted)">
                  {page * limit + index + 1}. {item.bidang?.nama || "Dinas Kesehatan"} · {item.tahun || "-"}
                </Text>
                <Text mt={1} fontWeight="700">
                  {item.judul}
                </Text>
                {item.ringkasan ? (
                  <Text mt={2} fontSize="14px" color="var(--muted)">
                    {item.ringkasan}
                  </Text>
                ) : null}
                <Button
                  mt={3}
                  size="sm"
                  bg="#14A75B"
                  color="white"
                  _hover={{ bg: "#0E7A45" }}
                  disabled={!item.dokumen}
                  onClick={() => bukaDokumen(item.dokumen)}
                >
                  Lihat dokumen
                </Button>
              </Box>
            ))}
          </Flex>

          {pages > 1 ? (
            <Flex mt={6} align="center" justify="space-between" gap={3}>
              <Button
                variant="outline"
                borderColor="#14A75B"
                color="#0E7A45"
                disabled={page <= 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
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
                onClick={() => setPage((current) => current + 1)}
              >
                Berikutnya
              </Button>
            </Flex>
          ) : null}
        </>
      ) : null}
    </PpidLayout>
  );
}

export default DokumenInformasi;
