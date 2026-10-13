import { useEffect, useState } from "react";
import { Box, Button, Flex, Table, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage from "../../../components/Admin/AdminPage";

function DaftarBerita() {
  const [dataBerita, setDataBerita] = useState([]);
  const [status, setStatus] = useState("loading");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/get/all?page=0&limit=50`
        );
        if (ignore) return;
        setDataBerita(res.data.result || []);
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
  }, [refresh]);

  const hapus = async (item) => {
    const yakin = window.confirm(`Hapus berita "${item.judul}"?`);
    if (!yakin) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/delete/${item.id}`
      );
      setRefresh((value) => value + 1);
    } catch (error) {
      console.error(error);
      window.alert("Berita gagal dihapus.");
    }
  };

  return (
    <LayoutAdmin>
      <AdminPage
        title="Berita"
        description="Daftar berita yang tampil di situs dinas."
        action={
          <Button as={RouterLink} to="/admin/tambah-berita" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>
            Tambah berita
          </Button>
        }
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? (
          <Text color="var(--muted)">Data belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
        ) : null}
        {status === "ready" && dataBerita.length === 0 ? (
          <Text color="var(--muted)">Belum ada berita.</Text>
        ) : null}

        {status === "ready" && dataBerita.length > 0 ? (
          <>
            <Text fontSize="14px" color="var(--muted)" mb={4}>
              {dataBerita.length} berita
            </Text>
            <Box display={{ base: "none", md: "block" }} overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row bg="#14A75B">
                    <Table.ColumnHeader color="white" w="52px">No</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Judul</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Bidang</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Tema</Table.ColumnHeader>
                    <Table.ColumnHeader color="white" textAlign="end">Aksi</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {dataBerita.map((item, index) => (
                    <Table.Row key={item.id || index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell fontWeight="600">{item.judul}</Table.Cell>
                      <Table.Cell>{item.bidang?.nama || "-"}</Table.Cell>
                      <Table.Cell>{item.temaBerita?.tema || "-"}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <Flex gap={2} justify="flex-end" wrap="wrap">
                          <Button
                            as={RouterLink}
                            to={item.slug ? `/berita/${item.slug}` : "/daftar-berita-dinkes"}
                            size="sm"
                            variant="outline"
                            borderColor="#14A75B"
                            color="#0E7A45"
                          >
                            Lihat
                          </Button>
                          <Button as={RouterLink} to={`/admin/edit-berita/${item.id}`} size="sm" variant="outline">
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
              {dataBerita.map((item, index) => (
                <Box key={item.id || index} borderWidth="1px" borderColor="var(--line)" borderRadius="12px" p={4}>
                  <Text fontSize="12px" color="var(--muted)">
                    {index + 1}. {item.temaBerita?.tema || "Berita"}
                  </Text>
                  <Text mt={1} fontWeight="700">{item.judul}</Text>
                  <Text mt={1} fontSize="14px" color="var(--muted)">{item.bidang?.nama || "-"}</Text>
                  <Flex mt={3} gap={2} wrap="wrap">
                    <Button
                      as={RouterLink}
                      to={item.slug ? `/berita/${item.slug}` : "/daftar-berita-dinkes"}
                      size="sm"
                      variant="outline"
                      borderColor="#14A75B"
                      color="#0E7A45"
                    >
                      Lihat
                    </Button>
                    <Button as={RouterLink} to={`/admin/edit-berita/${item.id}`} size="sm" variant="outline">
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

export default DaftarBerita;
