import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Table, Text } from "@chakra-ui/react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage from "../../../components/Admin/AdminPage";

const jenis = [
  { id: "foto", label: "Foto" },
  { id: "infografis", label: "Infografis" },
];

function formatTanggal(value) {
  if (!value) return "-";
  const [tahun, bulan, hari] = String(value).slice(0, 10).split("-");
  const date = new Date(Number(tahun), Number(bulan) - 1, Number(hari));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function DaftarGaleri() {
  const [params, setParams] = useSearchParams();
  const tipe = params.get("tipe") === "infografis" ? "infografis" : "foto";
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [refresh, setRefresh] = useState(0);
  const label = tipe === "infografis" ? "Infografis" : "Foto";

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/galeri/get/${tipe}`
        );
        if (ignore) return;
        setData(res.data.result || []);
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
  }, [tipe, refresh]);

  const hapus = async (item) => {
    const yakin = window.confirm(`Hapus ${label.toLowerCase()} ini?`);
    if (!yakin) return;
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/galeri/delete/${item.id}`);
      setRefresh((value) => value + 1);
    } catch (error) {
      console.error(error);
      window.alert("Data gagal dihapus.");
    }
  };

  return (
    <LayoutAdmin>
      <AdminPage
        title="Galeri"
        description="Kelola foto kegiatan dan infografis yang tampil di menu galeri."
        action={
          <Button
            as={RouterLink}
            to={`/admin/galeri/tambah/${tipe}`}
            bg="#14A75B"
            color="white"
            _hover={{ bg: "#0E7A45" }}
          >
            Tambah {label.toLowerCase()}
          </Button>
        }
      >
        <Flex gap={2} mb={5}>
          {jenis.map((item) => (
            <Button
              key={item.id}
              size="sm"
              bg={tipe === item.id ? "#14A75B" : "transparent"}
              color={tipe === item.id ? "white" : "var(--text)"}
              borderWidth="1px"
              borderColor={tipe === item.id ? "#14A75B" : "var(--line)"}
              _hover={{ bg: tipe === item.id ? "#0E7A45" : "var(--surface)" }}
              onClick={() => setParams({ tipe: item.id })}
            >
              {item.label}
            </Button>
          ))}
        </Flex>

        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? (
          <Text color="var(--muted)">Data belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
        ) : null}
        {status === "ready" && data.length === 0 ? (
          <Text color="var(--muted)">Belum ada {label.toLowerCase()}.</Text>
        ) : null}

        {status === "ready" && data.length > 0 ? (
          <>
            <Text fontSize="14px" color="var(--muted)" mb={4}>
              {data.length} {label.toLowerCase()}
            </Text>
            <Box display={{ base: "none", md: "block" }} overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row bg="#14A75B">
                    <Table.ColumnHeader color="white" w="88px">Foto</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Deskripsi</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Bidang</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Tanggal</Table.ColumnHeader>
                    <Table.ColumnHeader color="white" textAlign="end">Aksi</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>
                        {item.foto ? (
                          <Image
                            src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${item.foto}`}
                            alt=""
                            w="64px"
                            h="48px"
                            objectFit="cover"
                            borderRadius="8px"
                          />
                        ) : (
                          "-"
                        )}
                      </Table.Cell>
                      <Table.Cell maxW="320px">
                        <Text lineClamp={2}>{item.deskripsi}</Text>
                      </Table.Cell>
                      <Table.Cell>{item.bidang?.nama || "-"}</Table.Cell>
                      <Table.Cell>{formatTanggal(item.tanggal)}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <Flex gap={2} justify="flex-end">
                          <Button as={RouterLink} to={`/admin/galeri/edit/${item.id}`} size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" color="red.600" borderColor="red.300" onClick={() => hapus(item)}>
                            Hapus
                          </Button>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            <Flex display={{ base: "flex", md: "none" }} direction="column" gap={3}>
              {data.map((item) => (
                <Box key={item.id} borderWidth="1px" borderColor="var(--line)" borderRadius="12px" p={4} bg="var(--surface)">
                  {item.foto ? (
                    <Image
                      src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${item.foto}`}
                      alt=""
                      w="100%"
                      h="160px"
                      objectFit="cover"
                      borderRadius="10px"
                    />
                  ) : null}
                  <Text mt={3} fontWeight="600">{item.deskripsi}</Text>
                  <Text mt={1} fontSize="14px" color="var(--muted)">
                    {item.bidang?.nama || "-"} · {formatTanggal(item.tanggal)}
                  </Text>
                  <Flex gap={2} mt={3}>
                    <Button as={RouterLink} to={`/admin/galeri/edit/${item.id}`} size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" color="red.600" borderColor="red.300" onClick={() => hapus(item)}>
                      Hapus
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </>
        ) : null}
      </AdminPage>
    </LayoutAdmin>
  );
}

export default DaftarGaleri;
