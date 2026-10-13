import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://dinkes.paserkab.go.id";
const BRAND = "Dinkes Paser";

const DEFAULT_DESCRIPTION =
  "Website resmi Dinkes Paser, Dinas Kesehatan Kabupaten Paser. Layanan kesehatan, informasi PPID, berita, dan pengaduan masyarakat di Tanah Grogot, Kalimantan Timur.";

const pages = {
  "/": {
    title: "Dinkes Paser | Website Resmi Dinas Kesehatan Kabupaten Paser",
    description: DEFAULT_DESCRIPTION,
  },
  "/dinkes/visi-misi": {
    title: `Visi dan Misi | ${BRAND}`,
    description:
      "Visi dan misi Dinas Kesehatan Kabupaten Paser (Dinkes Paser) dalam pelayanan kesehatan masyarakat Kabupaten Paser.",
  },
  "/dinkes/tugas-fungsi": {
    title: `Tugas dan Fungsi | ${BRAND}`,
    description:
      "Tugas dan fungsi Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/dinkes/struktur": {
    title: `Struktur Organisasi | ${BRAND}`,
    description:
      "Struktur organisasi Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/kepala-dinas": {
    title: `Kepala Dinas | ${BRAND}`,
    description: "Profil Kepala Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/kontak": {
    title: `Kontak | ${BRAND}`,
    description:
      "Alamat, telepon, dan email Dinas Kesehatan Kabupaten Paser (Dinkes Paser) di Tanah Grogot.",
  },
  "/galeri/foto": {
    title: `Galeri Foto | ${BRAND}`,
    description: "Dokumentasi foto kegiatan Dinas Kesehatan Kabupaten Paser.",
  },
  "/galeri/info-grafis": {
    title: `Infografis | ${BRAND}`,
    description: "Infografis kesehatan Dinas Kesehatan Kabupaten Paser.",
  },
  "/daftar-berita-dinkes": {
    title: `Berita | ${BRAND}`,
    description:
      "Berita dan informasi terkini dari Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/pengaduan": {
    title: `Pengaduan | ${BRAND}`,
    description:
      "Layanan pengaduan masyarakat Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/informasi/berkala": {
    title: `Informasi Berkala | ${BRAND}`,
    description:
      "Informasi publik berkala PPID Dinas Kesehatan Kabupaten Paser.",
  },
  "/informasi/publik": {
    title: `Informasi Publik | ${BRAND}`,
    description: "Informasi publik Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/informasi/serta-merta": {
    title: `Informasi Serta Merta | ${BRAND}`,
    description:
      "Informasi serta merta PPID Dinas Kesehatan Kabupaten Paser.",
  },
  "/informasi/setiap-saat": {
    title: `Informasi Setiap Saat | ${BRAND}`,
    description:
      "Informasi setiap saat PPID Dinas Kesehatan Kabupaten Paser.",
  },
  "/informasi/keuangan": {
    title: `Informasi Keuangan | ${BRAND}`,
    description: "Informasi keuangan Dinas Kesehatan Kabupaten Paser.",
  },
  "/informasi/barang-dan-jasa": {
    title: `Barang dan Jasa | ${BRAND}`,
    description:
      "Informasi pengadaan barang dan jasa Dinas Kesehatan Kabupaten Paser.",
  },
  "/informasi/dikecualikan": {
    title: `Informasi Dikecualikan | ${BRAND}`,
    description:
      "Daftar informasi yang dikecualikan pada PPID Dinas Kesehatan Kabupaten Paser.",
  },
  "/ppid/profile": {
    title: `Profil PPID | ${BRAND}`,
    description: "Profil PPID Dinas Kesehatan Kabupaten Paser (Dinkes Paser).",
  },
  "/ppid/tugas-dan-fungsi": {
    title: `Tugas dan Fungsi PPID | ${BRAND}`,
    description: "Tugas dan fungsi PPID Dinas Kesehatan Kabupaten Paser.",
  },
  "/maklumat-pelayanan": {
    title: `Maklumat Pelayanan | ${BRAND}`,
    description: "Maklumat pelayanan informasi Dinas Kesehatan Kabupaten Paser.",
  },
  "/sop/pengajuan-informasi": {
    title: `SOP Pengajuan Informasi | ${BRAND}`,
    description:
      "Standar operasional pengajuan informasi pada Dinas Kesehatan Kabupaten Paser.",
  },
  "/pelayanan/permohonan": {
    title: `Permohonan Informasi | ${BRAND}`,
    description:
      "Formulir permohonan informasi publik Dinas Kesehatan Kabupaten Paser.",
  },
  "/pelayanan/cek-permohonan": {
    title: `Cek Permohonan | ${BRAND}`,
    description: "Cek status dan detail permohonan informasi dengan nomor permohonan atau NIK.",
  },
  "/pelayanan/keberatan": {
    title: `Keberatan Informasi | ${BRAND}`,
    description:
      "Pengajuan keberatan atas permohonan informasi Dinas Kesehatan Kabupaten Paser.",
  },
  "/alur-pelaporan": {
    title: `Alur Pelaporan | ${BRAND}`,
    description: "Alur pelaporan pada Dinas Kesehatan Kabupaten Paser.",
  },
  "/bidang/p2p": {
    title: `Bidang P2P | ${BRAND}`,
    description:
      "Bidang Pencegahan dan Pengendalian Penyakit Dinas Kesehatan Kabupaten Paser.",
  },
  "/bidang/sekret": {
    title: `Sekretariat | ${BRAND}`,
    description: "Sekretariat Dinas Kesehatan Kabupaten Paser.",
  },
  "/bidang/sdk": {
    title: `Bidang SDK | ${BRAND}`,
    description:
      "Bidang Sumber Daya Kesehatan Dinas Kesehatan Kabupaten Paser.",
  },
  "/bidang/yankes": {
    title: `Bidang Yankes | ${BRAND}`,
    description: "Bidang Pelayanan Kesehatan Dinas Kesehatan Kabupaten Paser.",
  },
  "/bidang/kesmas": {
    title: `Bidang Kesmas | ${BRAND}`,
    description: "Bidang Kesehatan Masyarakat Dinas Kesehatan Kabupaten Paser.",
  },
};

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isPrivate =
      pathname.startsWith("/admin") || pathname === "/login";
    const isBerita = pathname.startsWith("/berita/");
    const page = pages[pathname] || {
      title: isBerita
        ? `Berita | ${BRAND}`
        : `${BRAND} | Dinas Kesehatan Kabupaten Paser`,
      description: DEFAULT_DESCRIPTION,
    };

    document.title = page.title;
    upsertMeta("name", "description", page.description);
    upsertMeta(
      "name",
      "robots",
      isPrivate ? "noindex, nofollow" : "index, follow"
    );
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);

    const canonical = isPrivate
      ? `${SITE_URL}/`
      : `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    upsertCanonical(canonical);
    upsertMeta("property", "og:url", canonical);
  }, [pathname]);

  return null;
}

export default Seo;
