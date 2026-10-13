import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage from "../../../components/Admin/AdminPage";

const gayaField = {
  width: "100%",
  maxWidth: "320px",
  minHeight: "40px",
  padding: "8px 12px",
  borderRadius: "10px",
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--text)",
};

function Baris({ label, children }) {
  return (
    <Box>
      <Text fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
        {label}
      </Text>
      <Text mt={1} lineHeight="1.6">{children || "-"}</Text>
    </Box>
  );
}

function DetailPermohonan() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [daftarStatus, setDaftarStatus] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [status, setStatus] = useState("loading");
  const [pesan, setPesan] = useState("");
  const [kirim, setKirim] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const [detail, statuses] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/detail/${id}`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/status`),
        ]);
        if (ignore) return;
        const hasil = detail.data.result;
        setData(hasil);
        setStatusId(hasil?.statusId ? String(hasil.statusId) : "");
        setDaftarStatus(statuses.data.result || []);
        setStatus("ready");
      } catch (error) {
        if (ignore) return;
        console.error(error);
        setStatus(error.response?.status === 404 ? "empty" : "error");
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  const simpan = async (event) => {
    event.preventDefault();
    if (!statusId) {
      setPesan("Status wajib dipilih.");
      return;
    }
    setKirim(true);
    setPesan("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/status/${id}`,
        { statusId }
      );
      setData(res.data.result);
      setStatusId(res.data.result?.statusId ? String(res.data.result.statusId) : statusId);
      setPesan("Status berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      setPesan(error.response?.data?.message || "Status gagal diperbarui.");
    } finally {
      setKirim(false);
    }
  };

  const keberatan = data?.keberatans?.[0];

  return (
    <LayoutAdmin>
      <AdminPage
        title="Detail permohonan"
        description={data?.noPermohonan ? `Nomor ${data.noPermohonan}` : "Data permohonan informasi."}
        action={
          <Button as={RouterLink} to="/admin/daftar-permohonan" variant="outline">
            Kembali
          </Button>
        }
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? (
          <Text color="var(--muted)">Data belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
        ) : null}
        {status === "empty" ? <Text color="var(--muted)">Permohonan tidak ditemukan.</Text> : null}

        {status === "ready" && data ? (
          <Flex direction={{ base: "column", lg: "row" }} gap={6} align="start">
            <Box flex="1" display="flex" flexDirection="column" gap={4}>
              <Baris label="NOMOR">{data.noPermohonan}</Baris>
              <Baris label="NAMA">{data.nama}</Baris>
              <Baris label="NIK">{data.nik}</Baris>
              <Baris label="ASAL">{data.asal}</Baris>
              <Baris label="ALAMAT">{data.alamat}</Baris>
              <Baris label="EMAIL">{data.email}</Baris>
              <Baris label="WHATSAPP">{data.nomorWA ? `+62 ${data.nomorWA}` : ""}</Baris>
              <Baris label="ALASAN">{data.alasan}</Baris>
              <Baris label="RINCIAN">{data.rincian}</Baris>
              <Baris label="STATUS">{data.status?.nama || "Belum ada status"}</Baris>
              {keberatan ? <Baris label="ALASAN KEBERATAN">{keberatan.alasan}</Baris> : null}
              {data.ktp ? (
                <Box>
                  <Text fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                    KTP
                  </Text>
                  <Image
                    mt={2}
                    src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${data.ktp}`}
                    alt="Foto KTP pemohon"
                    maxH="280px"
                    borderRadius="12px"
                    objectFit="contain"
                    bg="var(--surface)"
                  />
                </Box>
              ) : null}
            </Box>

            <Box
              as="form"
              onSubmit={simpan}
              w={{ base: "100%", lg: "320px" }}
              flexShrink={0}
              borderWidth="1px"
              borderColor="var(--line)"
              borderRadius="14px"
              p={4}
              bg="var(--surface)"
            >
              <Text fontWeight="700">Ubah status</Text>
              <Text mt={1} mb={3} fontSize="14px" color="var(--muted)">
                Pilih status terbaru, lalu simpan.
              </Text>
              <select aria-label="Status permohonan" value={statusId} onChange={(event) => setStatusId(event.target.value)} style={gayaField}>
                <option value="">Pilih status</option>
                {daftarStatus.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              {pesan ? (
                <Text mt={3} fontSize="14px" color={pesan.includes("berhasil") ? "#0E7A45" : "red.500"}>
                  {pesan}
                </Text>
              ) : null}
              <Button type="submit" mt={4} bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }} loading={kirim}>
                Simpan status
              </Button>
            </Box>
          </Flex>
        ) : null}
      </AdminPage>
    </LayoutAdmin>
  );
}

export default DetailPermohonan;
