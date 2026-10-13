import { Image } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";
import AlurPermohonan from "../../assets/alurPermohonan.jpg";

function SanggahInformasi() {
  return (
    <PpidLayout
      title="Sanggahan Informasi"
      description="Langkah menyampaikan sanggahan jika jawaban informasi belum sesuai."
    >
      <Image
        src={AlurPermohonan}
        alt="Alur sanggahan informasi"
        w="100%"
        borderRadius="12px"
      />
    </PpidLayout>
  );
}

export default SanggahInformasi;
