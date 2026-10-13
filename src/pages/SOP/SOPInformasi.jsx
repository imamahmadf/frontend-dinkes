import { Image } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";
import AlurPermohonan from "../../assets/alurPermohonan.jpg";

function SOPInformasi() {
  return (
    <PpidLayout
      title="Permohonan Informasi"
      description="Langkah mengajukan permintaan informasi publik."
    >
      <Image
        src={AlurPermohonan}
        alt="Alur permohonan informasi"
        w="100%"
        borderRadius="12px"
      />
    </PpidLayout>
  );
}

export default SOPInformasi;
