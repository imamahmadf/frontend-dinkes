import { List, Text } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";

const janji = [
  "Memberikan pelayanan informasi yang cepat dan tepat waktu.",
  "Memudahkan masyarakat memperoleh informasi publik dengan cara yang sederhana.",
  "Menyediakan informasi yang akurat, benar, dan tidak menyesatkan.",
  "Menyediakan daftar informasi yang wajib diumumkan.",
  "Menjamin penggunaan informasi dan fasilitas pelayanan sesuai ketentuan.",
  "Menyiapkan ruang dan fasilitas yang nyaman.",
  "Menanggapi permintaan informasi dan keberatan dengan cepat, baik secara langsung maupun melalui media.",
  "Menyiapkan petugas informasi yang siap melayani.",
  "Melakukan pengawasan internal dan evaluasi kinerja pelaksana.",
];

function Maklumat() {
  return (
    <PpidLayout
      title="Maklumat Pelayanan"
      description="Janji layanan informasi publik Dinas Kesehatan Kabupaten Paser."
    >
      <Text fontWeight="700" mb={4}>
        Kami berjanji untuk:
      </Text>
      <List.Root as="ol" gap={3} ps={5} fontSize="16px" lineHeight="1.6">
        {janji.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List.Root>
    </PpidLayout>
  );
}

export default Maklumat;
