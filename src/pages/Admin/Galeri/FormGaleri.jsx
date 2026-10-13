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

function FormGaleri() {
  const { id, tipe: tipeAwal } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [tipe, setTipe] = useState(tipeAwal === "infografis" ? "infografis" : "foto");
  const [deskripsi, setDeskripsi] = useState("");
  const [bidangId, setBidangId] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [bidangList, setBidangList] = useState([]);
  const [status, setStatus] = useState(isEdit ? "loading" : "ready");
  const [pesan, setPesan] = useState("");
  const [kirim, setKirim] = useState(false);
  const judul = tipe === "infografis" ? "infografis" : "foto";

  useEffect(() => {
    let ignore = false;
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/get/seed`)
      .then((res) => {
        if (!ignore) setBidangList(res.data.resultBidang || []);
      })
      .catch((error) => console.error(error));
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!isEdit) return undefined;
    let ignore = false;

    async function load() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/galeri/detail/${id}`);
        if (ignore) return;
        const data = res.data.result;
        setTipe(data.tipe === "infografis" ? "infografis" : "foto");
        setDeskripsi(data.deskripsi || "");
        setBidangId(data.bidangId ? String(data.bidangId) : "");
        setTanggal(data.tanggal ? String(data.tanggal).slice(0, 10) : "");
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
    if (!deskripsi.trim() || !bidangId || !tanggal) {
      setPesan("Deskripsi, bidang, dan tanggal wajib diisi.");
      return;
    }
    if (!isEdit && !file) {
      setPesan("Foto wajib diunggah.");
      return;
    }

    const formData = new FormData();
    formData.append("tipe", tipe);
    formData.append("deskripsi", deskripsi.trim());
    formData.append("bidang", bidangId);
    formData.append("tanggal", tanggal);
    if (file) formData.append("foto", file);

    setKirim(true);
    setPesan("");
    try {
      await axios({
        method: isEdit ? "put" : "post",
        url: isEdit
          ? `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/galeri/update/${id}`
          : `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/galeri/post`,
        data: formData,
      });
      navigate(`/admin/galeri?tipe=${tipe}`);
    } catch (error) {
      console.error(error);
      setPesan(error.response?.data?.message || "Data gagal disimpan.");
      setKirim(false);
    }
  };

  return (
    <LayoutAdmin>
      <AdminPage
        title={isEdit ? `Ubah ${judul}` : `Tambah ${judul}`}
        description="Isi foto, deskripsi, bidang, dan tanggal."
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? <Text color="var(--muted)">Data tidak ditemukan.</Text> : null}
        {status === "ready" ? (
          <Box as="form" onSubmit={simpan} display="flex" flexDirection="column" gap={4} maxW="640px">
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Jenis</Text>
              <select aria-label="Jenis galeri" value={tipe} onChange={(event) => setTipe(event.target.value)} style={gayaField}>
                <option value="foto">Foto</option>
                <option value="infografis">Infografis</option>
              </select>
            </Box>
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Foto</Text>
              <input
                aria-label="Foto galeri"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => {
                  const dipilih = event.target.files?.[0] || null;
                  setFile(dipilih);
                  if (dipilih) setPreview(URL.createObjectURL(dipilih));
                }}
              />
              {preview ? (
                <Image src={preview} alt="" mt={3} maxH="220px" borderRadius="12px" objectFit="cover" />
              ) : null}
            </Box>
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Deskripsi</Text>
              <textarea
                aria-label="Deskripsi"
                value={deskripsi}
                onChange={(event) => setDeskripsi(event.target.value)}
                rows={4}
                style={gayaField}
              />
            </Box>
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Bidang</Text>
              <select aria-label="Bidang" value={bidangId} onChange={(event) => setBidangId(event.target.value)} style={gayaField}>
                <option value="">Pilih bidang</option>
                {bidangList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </Box>
            <Box>
              <Text mb={1} fontSize="14px" fontWeight="600">Tanggal</Text>
              <input aria-label="Tanggal" type="date" value={tanggal} onChange={(event) => setTanggal(event.target.value)} style={gayaField} />
            </Box>
            {pesan ? <Text color="red.500">{pesan}</Text> : null}
            <Flex gap={3}>
              <Button type="submit" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }} loading={kirim}>
                Simpan
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(`/admin/galeri?tipe=${tipe}`)}>
                Batal
              </Button>
            </Flex>
          </Box>
        ) : null}
      </AdminPage>
    </LayoutAdmin>
  );
}

export default FormGaleri;
