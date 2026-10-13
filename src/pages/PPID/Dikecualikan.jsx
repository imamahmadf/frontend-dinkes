import DokumenInformasi from "../../components/ppid/DokumenInformasi";

function Dikecualikan() {
  return (
    <DokumenInformasi
      jenisId={3}
      title="Informasi yang Dikecualikan"
      description="Daftar informasi yang tidak dapat dibuka karena dilindungi ketentuan peraturan perundang-undangan."
    />
  );
}

export default Dikecualikan;
