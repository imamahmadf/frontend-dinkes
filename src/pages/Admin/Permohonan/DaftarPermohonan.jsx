import { useEffect, useState } from "react";
import { Box, Button, Flex, Table, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage, { AdminPager } from "../../../components/Admin/AdminPage";

function DaftarPermohonan() {
  const [dataPermohonan, setDataPermohonan] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [status, setStatus] = useState("loading");
  const limit = 10;

  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/get?page=${page}&limit=${limit}`
        );
        if (ignore) return;
        setDataPermohonan(res.data.result || []);
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
  }, [page]);

  return (
    <LayoutAdmin>
      <AdminPage
        title="Permohonan"
        description="Daftar permohonan informasi yang masuk."
      >
        {status === "loading" ? <Text color="var(--muted)">Memuat data...</Text> : null}
        {status === "error" ? (
          <Text color="var(--muted)">Data belum bisa dimuat. Periksa koneksi, lalu muat ulang halaman.</Text>
        ) : null}
        {status === "ready" && dataPermohonan.length === 0 ? (
          <Text color="var(--muted)">Belum ada permohonan.</Text>
        ) : null}

        {status === "ready" && dataPermohonan.length > 0 ? (
          <>
            <Text fontSize="14px" color="var(--muted)" mb={4}>
              {rows} permohonan
            </Text>
            <Box display={{ base: "none", lg: "block" }} overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row bg="#14A75B">
                    <Table.ColumnHeader color="white" w="52px">No</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Nama</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Asal</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">WhatsApp</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Email</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Nomor</Table.ColumnHeader>
                    <Table.ColumnHeader color="white">Status</Table.ColumnHeader>
                    <Table.ColumnHeader color="white" textAlign="end">Aksi</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {dataPermohonan.map((item, index) => (
                    <Table.Row key={item.id || index}>
                      <Table.Cell>{page * limit + index + 1}</Table.Cell>
                      <Table.Cell fontWeight="600">{item.nama || "-"}</Table.Cell>
                      <Table.Cell>{item.asal || "-"}</Table.Cell>
                      <Table.Cell>{item.nomorWA ? `+62 ${item.nomorWA}` : "-"}</Table.Cell>
                      <Table.Cell>{item.email || "-"}</Table.Cell>
                      <Table.Cell>{item.noPermohonan || "-"}</Table.Cell>
                      <Table.Cell>{item.status?.nama || "-"}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <Button as={RouterLink} to={`/admin/permohonan/${item.id}`} size="sm" variant="outline">
                          Detail
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            <Flex display={{ base: "flex", lg: "none" }} direction="column" gap={3}>
              {dataPermohonan.map((item, index) => (
                <Box key={item.id || index} borderWidth="1px" borderColor="var(--line)" borderRadius="12px" p={4}>
                  <Text fontSize="12px" color="var(--muted)">
                    {page * limit + index + 1}. {item.noPermohonan || "Tanpa nomor"}
                  </Text>
                  <Text mt={1} fontWeight="700">{item.nama || "-"}</Text>
                  <Text mt={1} fontSize="14px">{item.asal || "-"}</Text>
                  <Text mt={1} fontSize="14px" color="var(--muted)">
                    {item.email || "-"} · {item.nomorWA ? `+62 ${item.nomorWA}` : "-"}
                  </Text>
                  <Text mt={2} fontWeight="600">{item.status?.nama || "-"}</Text>
                  <Button as={RouterLink} to={`/admin/permohonan/${item.id}`} size="sm" variant="outline" mt={3}>
                    Detail
                  </Button>
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

export default DaftarPermohonan;
