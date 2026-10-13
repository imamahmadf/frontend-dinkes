import { Box, Heading, Text } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";

function TugasDanFungsi() {
  return (
    <PpidLayout
      title="Tugas dan Fungsi"
      description="Arah layanan informasi publik Dinas Kesehatan Kabupaten Paser."
    >
      <Box mb={8}>
        <Heading as="h2" fontSize="22px" mb={3}>
          Visi
        </Heading>
        <Text fontSize="17px" lineHeight="1.7">
          TUNTAS (Tangguh, Unggul, Transformatif, Adil, dan Sejahtera).
        </Text>
      </Box>
      <Heading as="h2" fontSize="22px" mb={3}>
        Misi
      </Heading>
      <Text fontSize="17px" lineHeight="1.7" mb={4}>
        Mewujudkan masyarakat yang sehat, cerdas, kreatif, sejahtera, unggul, dan
        berdaya saing didasari nilai-nilai keagamaan yang kuat.
      </Text>
      <Text fontSize="17px" lineHeight="1.7">
        Misi ini berfokus pada pembangunan sumber daya manusia, khususnya di
        bidang kesehatan dan pendidikan. Dinas Kesehatan berperan membentuk
        masyarakat Kabupaten Paser yang sehat, supaya generasi mendatang menjadi
        cerdas, kreatif, sejahtera, unggul, dan berdaya saing dengan tetap
        berpegang pada nilai-nilai keagamaan.
      </Text>
    </PpidLayout>
  );
}

export default TugasDanFungsi;
