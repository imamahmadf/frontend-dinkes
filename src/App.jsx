import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";
import Home from "./pages/Home";
import VisiMisi from "./pages/DinasKesehatan/VisiMisi";
import TugasDanFungsi from "./pages/DinasKesehatan/TugasDanFungsi";
import Struktur from "./pages/DinasKesehatan/Struktur";
import Berkala from "./pages/PPID/Berkala";
import Publik from "./pages/PPID/Publik";
import SertaMerta from "./pages/PPID/SertaMerta";
import SetiapSaat from "./pages/PPID/SetiapSaat";
import Permohonan from "./pages/Pelayanan/Permohonan";
import CekPermohonan from "./pages/Pelayanan/CekPermohonan";
import P2P from "./pages/Bidang/P2P";
import Sekret from "./pages/Bidang/Sekret";
import SDK from "./pages/Bidang/SDK";
import Yankes from "./pages/Bidang/Yankes";
import Kesmas from "./pages/Bidang/Kesmas";
import ProfilePPID from "./pages/ProfilPPID/Profile";
import TugasDanFungsiPPID from "./pages/ProfilPPID/TugasDanFUngsiPPID";
import SOPInformasi from "./pages/SOP/SOPInformasi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dinkes/visi-misi" element={<VisiMisi />} />
        <Route path="/dinkes/tugas-fungsi" element={<TugasDanFungsi />} />
        <Route path="/dinkes/struktur" element={<Struktur />} />
        <Route path="/" element={<Home />} />

        <Route path="/informasi/berkala" element={<Berkala />} />
        <Route path="/informasi/publik" element={<Publik />} />
        <Route path="/informasi/serta-merta" element={<SertaMerta />} />
        <Route path="/informasi/setiap-saat" element={<SetiapSaat />} />
        <Route path="/pelayanan/permohonan" element={<Permohonan />} />
        <Route path="/pelayanan/cek-permohonan" element={<CekPermohonan />} />

        <Route path="/bidang/p2p" element={<P2P />} />
        <Route path="/bidang/sekret" element={<Sekret />} />
        <Route path="/bidang/sdk" element={<SDK />} />
        <Route path="/bidang/yankes" element={<Yankes />} />
        <Route path="/bidang/kesmas" element={<Kesmas />} />

        <Route path="/ppid/profile" element={<ProfilePPID />} />
        <Route path="/ppid/tugas-dan-fungsi" element={<TugasDanFungsiPPID />} />

        <Route path="/sop/pengajuan-informasi" element={<SOPInformasi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
