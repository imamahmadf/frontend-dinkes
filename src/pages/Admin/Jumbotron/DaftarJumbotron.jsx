import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Table, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage from "../../../components/Admin/AdminPage";

function DaftarJumbotron() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/jumbotron/get`);
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
  }, [refresh]);

  const hapus = async (item) => {
    const yakin = window.confirm("Hapus foto jumbotron ini?");
    if (!yakin) return;
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/jumbotron/delete/${item.id}`);
      setRefresh((value) => value + 1);
    } catch (error) {
      console.error(error);
      window.alert("Data gagal dihapus.");
    }
  };

  return (
    <LayoutAdmin>
      <AdminPage
        title="Jumbotron"
        description="Kelola foto latar yang tampil di bagian atas beranda."
        action={
          <Button as={RouterLink} to="/admin/jumbotron/tambah" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>
            Tambah foto
          </Button>
        }
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? (
          <Text color="var(--muted)">Data belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
        ) : null}
        {status === "ready" && data.length === 0 ? (
          <Text color="var(--muted)">Belum ada foto. Beranda masih memakai foto bawaan sampai ada foto yang disimpan.</Text>
        ) : null}

        {status === "ready" && data.length > 0 ? (
          <>
            <Text fontSize="14px" color="var(--muted)" mb={4}>
              {data.length} foto
            </Text>
            <Box display={{ base: "none", md: "block" }} overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row bg="#14A75B">
                    <Table.ColumnHeader color="white" w="120px">Foto</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Urutan</Table.ColumnHeader>
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
                            w="96px"
                            h="56px"
                            objectFit="cover"
                            borderRadius="8px"
                          />
                        ) : (
                          "-"
                        )}
                      </Table.Cell>
                      <Table.Cell>{item.urutan}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <Flex gap={2} justify="flex-end">
                          <Button as={RouterLink} to={`/admin/jumbotron/edit/${item.id}`} size="sm" variant="outline">
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
                  <Text mt={3} fontWeight="600">Urutan {item.urutan}</Text>
                  <Flex gap={2} mt={3}>
                    <Button as={RouterLink} to={`/admin/jumbotron/edit/${item.id}`} size="sm" variant="outline">
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

export default DaftarJumbotron;
