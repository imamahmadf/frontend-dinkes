import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage from "../../../components/Admin/AdminPage";

const gayaField = {
  width: "100%",
  minHeight: "40px",
  padding: "8px 12px",
  borderRadius: "10px",
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--text)",
};

function FormJumbotron() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [urutan, setUrutan] = useState("1");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState(isEdit ? "loading" : "ready");
  const [pesan, setPesan] = useState("");
  const [kirim, setKirim] = useState(false);

  useEffect(() => {
    if (!isEdit) return undefined;
    let ignore = false;

    async function load() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/jumbotron/detail/${id}`);
        if (ignore) return;
        const data = res.data.result;
        setUrutan(data.urutan ? String(data.urutan) : "1");
        if (data.foto) setPreview(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${data.foto}`);
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
  }, [id, isEdit]);

  const simpan = async (event) => {
    event.preventDefault();
    const angka = parseInt(urutan, 10);
    if (Number.isNaN(angka) || angka < 1) {
      setPesan("Urutan wajib diisi, mulai dari 1.");
      return;
    }
    if (!isEdit && !file) {
      setPesan("Foto wajib diunggah.");
      return;
    }

    const formData = new FormData();
    formData.append("urutan", String(angka));
    if (file) formData.append("foto", file);

    setKirim(true);
    setPesan("");
    try {
      await axios({
        method: isEdit ? "put" : "post",
        url: isEdit
          ? `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/jumbotron/update/${id}`
          : `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/jumbotron/post`,
        data: formData,
      });
      navigate("/admin/jumbotron");
    } catch (error) {
      console.error(error);
      setPesan(error.response?.data?.message || "Data gagal disimpan.");
      setKirim(false);
    }
  };

  return (
    <LayoutAdmin>
      <AdminPage
        title={isEdit ? "Ubah foto jumbotron" : "Tambah foto jumbotron"}
        description="Foto ini menjadi latar bagian atas beranda. Angka urutan yang lebih kecil tampil lebih dulu."
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? <Text color="var(--muted)">Data tidak ditemukan.</Text> : null}
        {status === "ready" ? (
          <Box as="form" onSubmit={simpan} display="flex" flexDirection="column" gap={4} maxW="640px">
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Foto</Text>
              <input
                aria-label="Foto jumbotron"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => {
                  const dipilih = event.target.files?.[0] || null;
                  setFile(dipilih);
                  if (dipilih) setPreview(URL.createObjectURL(dipilih));
                }}
              />
              {preview ? (
                <Image src={preview} alt="" mt={3} w="100%" maxH="240px" objectFit="cover" borderRadius="12px" />
              ) : null}
            </Box>
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Urutan</Text>
              <input
                aria-label="Urutan"
                type="number"
                min="1"
                value={urutan}
                onChange={(event) => setUrutan(event.target.value)}
                style={gayaField}
              />
            </Box>
            {pesan ? <Text color="red.500">{pesan}</Text> : null}
            <Flex gap={3}>
              <Button type="submit" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }} loading={kirim}>
                Simpan
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/jumbotron")}>
                Batal
              </Button>
            </Flex>
          </Box>
        ) : null}
      </AdminPage>
    </LayoutAdmin>
  );
}

export default FormJumbotron;
