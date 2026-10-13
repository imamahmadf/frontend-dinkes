import { Image } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";
import GambarSengketa from "../../assets/sengketa.jpg";

function SengketaInformasi() {
  return (
    <PpidLayout
      title="Sengketa Informasi"
      description="Alur jika permohonan informasi berlanjut menjadi sengketa."
    >
      <Image
        src={GambarSengketa}
        alt="Alur sengketa informasi"
        w="100%"
        borderRadius="12px"
      />
    </PpidLayout>
  );
}

export default SengketaInformasi;
