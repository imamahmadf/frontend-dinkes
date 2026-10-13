import { Image, Stack } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";
import SK1 from "../../assets/SKPPID1.jpg";
import SK2 from "../../assets/SKPPID2.jpg";
import SK3 from "../../assets/SKPPID3.jpg";
import SK4 from "../../assets/SKPPID4.jpg";
import SK5 from "../../assets/SKPPID5.jpg";

const dokumen = [SK1, SK2, SK3, SK4, SK5];

function ProfilePPID() {
  return (
    <PpidLayout
      title="Profil Pelaksana"
      description="Surat keputusan dan dokumen penetapan pejabat pengelola informasi dan dokumentasi."
    >
      <Stack gap={4}>
        {dokumen.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Dokumen profil PPID halaman ${index + 1}`}
            w="100%"
            borderRadius="12px"
            borderWidth="1px"
            borderColor="gray.200"
          />
        ))}
      </Stack>
    </PpidLayout>
  );
}

export default ProfilePPID;
