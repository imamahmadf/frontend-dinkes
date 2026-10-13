import { Button, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PpidLayout from "../components/ppid/PpidLayout";
import GambarPelaporan from "../assets/pelaporanPejabat.jpg";

function AlurPelaporan() {
  return (
    <PpidLayout
      title="Alur Pelaporan"
      description="Cara melaporkan pelanggaran pejabat publik atau pihak yang mendapat izin maupun perjanjian kerja."
    >
      <Image
        src={GambarPelaporan}
        alt="Alur pelaporan pelanggaran"
        w="100%"
        borderRadius="12px"
        mb={6}
      />
      <Button as={RouterLink} to="/kontak" bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }}>
        Sampaikan laporan
      </Button>
    </PpidLayout>
  );
}

export default AlurPelaporan;
