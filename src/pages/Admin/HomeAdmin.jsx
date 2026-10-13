import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import LayoutAdmin from "../../components/Admin/LayoutAdmin";
import AdminPage from "../../components/Admin/AdminPage";

const menus = [
  {
    title: "Informasi",
    description: "Kelola dokumen yang tampil di halaman PPID.",
    to: "/admin/daftar-informasi",
  },
  {
    title: "Berita",
    description: "Tulis dan tinjau berita dinas.",
    to: "/admin/daftar-berita",
  },
  {
    title: "Permohonan",
    description: "Lihat permohonan informasi dari masyarakat.",
    to: "/admin/daftar-permohonan",
  },
  {
    title: "Galeri",
    description: "Kelola foto kegiatan dan infografis.",
    to: "/admin/galeri",
  },
  {
    title: "Jumbotron",
    description: "Kelola foto latar di bagian atas beranda.",
    to: "/admin/jumbotron",
  },
];

function HomeAdmin() {
  return (
    <LayoutAdmin>
      <AdminPage
        title="Dashboard"
        description="Pilih bagian yang ingin dikelola."
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {menus.map((menu) => (
            <Box
              key={menu.to}
              as={RouterLink}
              to={menu.to}
              p={5}
              borderRadius="14px"
              borderWidth="1px"
              borderColor="var(--line)"
              bg="var(--surface)"
              _hover={{ borderColor: "#14A75B" }}
            >
              <Text fontWeight="700" fontSize="18px">
                {menu.title}
              </Text>
              <Text mt={2} fontSize="14px" color="var(--muted)">
                {menu.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </AdminPage>
    </LayoutAdmin>
  );
}

export default HomeAdmin;
