import { useEffect, useState } from "react";
import { Box, Button, Flex, Table, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage, { AdminPager } from "../../../components/Admin/AdminPage";

function DaftarInformasi() {
  const [dataPublik, setDataPublik] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [status, setStatus] = useState("loading");
  const [refresh, setRefresh] = useState(0);
  const limit = 10;

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/get/0?page=${page}&limit=${limit}`
        );
        if (ignore) return;
        setDataPublik(res.data.result || []);
        setPages(res.data.totalPage || 0);
        setRows(res.data.totalRows || 0);
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
  }, [page, refresh]);

  const hapus = async (item) => {
    const yakin = window.confirm(`Hapus "${item.judul}"?`);
    if (!yakin) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/delete/${item.id}`
      );
      setRefresh((value) => value + 1);
    } catch (error) {
      console.error(error);
      window.alert("Informasi gagal dihapus.");
    }
  };

  const bukaDokumen = (fileName) => {
    if (!fileName) return;
    window.open(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${fileName}`, "_blank", "noopener,noreferrer");
  };

  return (
    <LayoutAdmin>
      <AdminPage
        title="Informasi publik"
        description="Daftar dokumen yang ditampilkan di halaman PPID."
        action={
          <Button as={RouterLink} to="/admin/tambah-dokumen" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>
            Tambah informasi
          </Button>
        }
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? (
          <Text color="var(--muted)">Data belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
        ) : null}
        {status === "ready" && dataPublik.length === 0 ? (
          <Text color="var(--muted)">Belum ada informasi.</Text>
        ) : null}

        {status === "ready" && dataPublik.length > 0 ? (
          <>
            <Text fontSize="14px" color="var(--muted)" mb={4}>
              {rows} dokumen
            </Text>
            <Box display={{ base: "none", lg: "block" }} overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row bg="#14A75B">
                    <Table.ColumnHeader color="white" w="52px">No</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Judul</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Ringkasan</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Bidang</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Jenis</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Tahun</Table.ColumnHeader>
                    <Table.ColumnHeader color="white" textAlign="end">Aksi</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {dataPublik.map((item, index) => (
                    <Table.Row key={item.id || index}>
                      <Table.Cell>{page * limit + index + 1}</Table.Cell>
                      <Table.Cell fontWeight="600">{item.judul}</Table.Cell>
                      <Table.Cell>{item.ringkasan || "-"}</Table.Cell>
                      <Table.Cell>{item.bidang?.nama || "-"}</Table.Cell>
                      <Table.Cell>{item.jenisInformasi?.jenis || "-"}</Table.Cell>
                      <Table.Cell>{item.tahun || "-"}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <Flex gap={2} justify="flex-end" wrap="wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            borderColor="#14A75B"
                            color="#0E7A45"
                            disabled={!item.dokumen}
                            onClick={() => bukaDokumen(item.dokumen)}
                          >
                            Lihat
                          </Button>
                          <Button as={RouterLink} to={`/admin/edit-dokumen/${item.id}`} size="sm" variant="outline">
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

            <Flex display={{ base: "flex", lg: "none" }} direction="column" gap={3}>
              {dataPublik.map((item, index) => (
                <Box key={item.id || index} borderWidth="1px" borderColor="var(--line)" borderRadius="12px" p={4}>
                  <Text fontSize="12px" color="var(--muted)">
                    {page * limit + index + 1}. {item.jenisInformasi?.jenis || "Informasi"} · {item.tahun || "-"}
                  </Text>
                  <Text mt={1} fontWeight="700">{item.judul}</Text>
                  <Text mt={1} fontSize="14px" color="var(--muted)">{item.bidang?.nama || "-"}</Text>
                  {item.ringkasan ? (
                    <Text mt={2} fontSize="14px">{item.ringkasan}</Text>
                  ) : null}
                  <Flex mt={3} gap={2} wrap="wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="#14A75B"
                      color="#0E7A45"
                      disabled={!item.dokumen}
                      onClick={() => bukaDokumen(item.dokumen)}
                    >
                      Lihat
                    </Button>
                    <Button as={RouterLink} to={`/admin/edit-dokumen/${item.id}`} size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" color="red.600" borderColor="red.300" onClick={() => hapus(item)}>
                      Hapus
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Flex>

            <AdminPager page={page} pages={pages} onChange={setPage} />
          </>
        ) : null}
      </AdminPage>
    </LayoutAdmin>
  );
}

export default DaftarInformasi;
