import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "../../components/Layout";

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

function CekPermohonan() {
  const [kata, setKata] = useState("");
  const [hasil, setHasil] = useState([]);
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(false);

  const cekStatus = async (event) => {
    event.preventDefault();
    const nilai = kata.trim();
    if (!nilai) {
      setHasil([]);
      setPesan("Masukkan nomor permohonan atau NIK.");
      return;
    }

    setMemuat(true);
    setPesan("");
    setHasil([]);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/get/status`,
        { params: { kata: nilai } }
      );
      setHasil(res.data.result || []);
    } catch (error) {
      console.error(error);
      setPesan(error.response?.data?.message || "Permohonan tidak ditemukan.");
    } finally {
      setMemuat(false);
    }
  };

  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh" color="var(--text)" overflowX="hidden">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 6, md: 8 }}>
          <Container maxW="860px" px={{ base: 4, md: 6 }}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
              Layanan PPID
            </Text>
            <Heading as="h1" mt={2} fontSize={{ base: "28px", md: "36px" }} color="white">
              Cek Status Permohonan
            </Heading>
            <Text mt={3} color="whiteAlpha.900">
              Masukkan nomor permohonan atau NIK untuk melihat status dan detail permohonan.
            </Text>
          </Container>
        </Box>

        <Container maxW="860px" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
          <Box
            as="form"
            onSubmit={cekStatus}
            bg="var(--card)"
            borderWidth="1px"
            borderColor="var(--line)"
            borderRadius="16px"
            p={{ base: 4, md: 6 }}
          >
            <Heading as="h2" fontSize={{ base: "20px", md: "24px" }} color="var(--heading)">
              Cek Permohonan Informasi
            </Heading>
            <Text mt={2} mb={4} color="var(--muted)">
              Gunakan nomor permohonan atau NIK yang dipakai saat mengajukan permohonan.
            </Text>
            <Input
              aria-label="Nomor permohonan atau NIK"
              height="52px"
              bg="var(--surface)"
              color="var(--text)"
              borderColor="var(--line)"
              placeholder="Nomor permohonan atau NIK"
              value={kata}
              onChange={(event) => setKata(event.target.value)}
            />
            <Button
              type="submit"
              mt={4}
              w="100%"
              bg="#14A75B"
              color="white"
              _hover={{ bg: "#0E7A45" }}
              loading={memuat}
              loadingText="Mencari..."
            >
              Cari status
            </Button>
            {pesan ? <Text mt={4} color="red.500">{pesan}</Text> : null}
          </Box>

          {hasil.length > 0 ? (
            <Box mt={4} display="flex" flexDirection="column" gap={4}>
              <Text color="var(--muted)">
                {hasil.length} permohonan ditemukan
              </Text>
              {hasil.map((item) => (
                <Box
                  key={item.id}
                  bg="var(--card)"
                  borderWidth="1px"
                  borderColor="var(--line)"
                  borderRadius="16px"
                  p={{ base: 4, md: 6 }}
                  display="flex"
                  flexDirection="column"
                  gap={4}
                >
                  <Box>
                    <Text fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                      STATUS
                    </Text>
                    <Text mt={1} fontSize="20px" fontWeight="700" color="var(--heading)">
                      {item.status?.nama || "Belum ada status"}
                    </Text>
                  </Box>
                  <Baris label="NOMOR PERMOHONAN">{item.noPermohonan}</Baris>
                  <Baris label="NAMA">{item.nama}</Baris>
                  <Baris label="NIK">{item.nik}</Baris>
                  <Baris label="ASAL">{item.asal}</Baris>
                  <Baris label="ALAMAT">{item.alamat}</Baris>
                  <Baris label="EMAIL">{item.email}</Baris>
                  <Baris label="WHATSAPP">{item.nomorWA ? `+62 ${item.nomorWA}` : ""}</Baris>
                  <Baris label="ALASAN">{item.alasan}</Baris>
                  <Baris label="RINCIAN">{item.rincian}</Baris>
                  {item.keberatans?.[0]?.alasan ? (
                    <Baris label="ALASAN KEBERATAN">{item.keberatans[0].alasan}</Baris>
                  ) : null}
                </Box>
              ))}
            </Box>
          ) : null}
        </Container>
      </Box>
    </Layout>
  );
}

export default CekPermohonan;
