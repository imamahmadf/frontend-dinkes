import DokumenInformasi from "../../components/ppid/DokumenInformasi";

function Publik() {
  return (
    <DokumenInformasi
      jenisId={1}
      title="Informasi Publik"
      description="Dokumen yang dapat diakses masyarakat tanpa perlu mengajukan permohonan."
    />
  );
}

export default Publik;
