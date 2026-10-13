import { Box, Heading, List, Text } from "@chakra-ui/react";
import PpidLayout from "../../components/ppid/PpidLayout";

const ditolakJika = [
  "Pemohon tidak memberikan identitas dengan jelas.",
  "Tujuan permintaan informasi tidak jelas.",
  "Informasi yang diminta dikecualikan oleh undang-undang.",
  "Pemohon tidak mengikuti prosedur yang berlaku.",
  "Dinas Kesehatan tidak memiliki atau menyimpan informasi tersebut.",
  "Informasi yang diminta belum didokumentasikan.",
];

const mencakup = [
  "Informasi yang dikecualikan.",
  "Informasi yang dapat menghambat proses hukum.",
  "Informasi yang dapat mengganggu perlindungan hak kekayaan intelektual.",
  "Informasi yang dapat mengganggu ketahanan ekonomi nasional.",
  "Informasi yang dapat mengganggu pertahanan dan keamanan negara.",
  "Informasi yang dapat mengungkapkan kekayaan alam Indonesia.",
  "Informasi yang dapat merugikan hubungan luar negeri.",
  "Informasi yang mengungkapkan isi akta otentik yang bersifat pribadi atau wasiat.",
  "Informasi yang tidak boleh diungkapkan menurut Undang-Undang Nomor 14 Tahun 2008, khususnya Pasal 17 dan Pasal 18.",
];

function Bagian({ title, items }) {
  return (
    <Box mb={8}>
      <Heading as="h2" fontSize="20px" mb={3}>
        {title}
      </Heading>
      <List.Root as="ol" gap={2} ps={5} fontSize="16px" lineHeight="1.6">
        {items.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List.Root>
    </Box>
  );
}

function AlasanPenolakan() {
  return (
    <PpidLayout
      title="Alasan Penolakan"
      description="Permohonan informasi dapat ditolak hanya pada kondisi berikut."
    >
      <Bagian title="Permohonan ditolak jika" items={ditolakJika} />
      <Bagian title="Jenis informasi yang dapat ditolak" items={mencakup} />
      <Text fontSize="14px" color="var(--muted)">
        Dasar hukum: Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
      </Text>
    </PpidLayout>
  );
}

export default AlasanPenolakan;
