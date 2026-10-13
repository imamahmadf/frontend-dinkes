import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  IconButton,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ColorModeButton } from "./ui/color-mode";
import Logo from "../assets/logo.png";

import icon1 from "../assets/dinkesicon1.png";
import icon2 from "../assets/dinkesicon2.png";
import icon3 from "../assets/dinkesicon3.png";
import iconPPID1 from "../assets/icona1.png";
import iconPPID2 from "../assets/icona2.png";
import iconPPID3 from "../assets/icona3.png";
import iconPPID4 from "../assets/icona4.png";
import iconPPID5 from "../assets/icona5.png";
import iconKontak from "../assets/icona6.png";
import iconBidang1 from "../assets/iconbidang1.png";
import iconBidang2 from "../assets/iconbidang2.png";
import iconBidang3 from "../assets/iconbidang3.png";
import iconBidang4 from "../assets/iconbidang4.png";
import iconBidang5 from "../assets/iconbidang5.png";
import PenaLogo from "../assets/penaLogo.png";
import AptekaLogo from "../assets/logoApteka.png";
import PangkatLogo from "../assets/pangkatLogo.png";
import AsetLogo from "../assets/asetLogo.png";

const GREEN = "#14A75B";
const GREEN_DARK = "#0E7A45";

const puskesmasList = [
  "Tanah Grogot",
  "Senaken",
  "Padang Pangrapat",
  "Lolo",
  "Kuaro",
  "Long Ikis",
  "Kayungo",
  "Krayan",
  "Long Kail",
  "Mendik",
  "Sebakung Taka",
  "Batu Kajang",
  "Muara Komamam",
  "Muser",
  "Pasi Belengkong",
  "Suliliran Baru",
  "Suatang Baru",
  "Kerang",
  "Tanjung Aru",
];

function MenuIcon({ src, alt }) {
  return (
    <Box
      bg="white"
      borderRadius="8px"
      boxSize="36px"
      p="6px"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
    >
      <Image src={src} alt={alt} boxSize="100%" objectFit="contain" />
    </Box>
  );
}

function Brand({ compact = false, onClick }) {
  return (
    <Flex
      as={RouterLink}
      to="/"
      onClick={onClick}
      align="center"
      gap={2}
      minW={0}
    >
      <Image
        src={Logo}
        alt="Logo Dinas Kesehatan Kabupaten Paser"
        boxSize={compact ? "36px" : "40px"}
        objectFit="contain"
        flexShrink={0}
      />
      <Box minW={0}>
        <Text
          color="white"
          fontSize={compact ? "14px" : "15px"}
          fontWeight={700}
          lineHeight="1.2"
        >
          Dinas Kesehatan
        </Text>
        <Text color="whiteAlpha.900" fontSize="12px" lineHeight="1.2">
          Kabupaten Paser
        </Text>
      </Box>
    </Flex>
  );
}

function NavItem({ to, href, title, description, icon, onNavigate }) {
  const { pathname } = useLocation();
  const active = Boolean(to) && pathname === to;
  const styles = {
    variant: "ghost",
    w: "100%",
    h: "auto",
    minH: "48px",
    px: 2,
    py: 2,
    gap: 3,
    borderRadius: "12px",
    justifyContent: "flex-start",
    textAlign: "left",
    whiteSpace: "normal",
    color: active ? GREEN_DARK : "white",
    bg: active ? "white" : "transparent",
    _hover: { bg: active ? "white" : "whiteAlpha.200" },
    onClick: onNavigate,
  };
  const body = (
    <>
      {icon}
      <Box minW={0}>
        <Text fontSize="14px" fontWeight={active ? 700 : 600} lineHeight="1.3">
          {title}
        </Text>
        {description ? (
          <Text
            fontSize="12px"
            lineHeight="1.3"
            color={active ? "blackAlpha.700" : "whiteAlpha.800"}
          >
            {description}
          </Text>
        ) : null}
      </Box>
    </>
  );

  if (href) {
    return (
      <Button
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...styles}
      >
        {body}
      </Button>
    );
  }

  return (
    <Button as={RouterLink} to={to} {...styles}>
      {body}
    </Button>
  );
}

function Group({ icon, title, children }) {
  return (
    <Box mb={3}>
      <Flex align="center" gap={2} px={2} mb={1}>
        <MenuIcon src={icon} alt="" />
        <Text fontSize="13px" fontWeight={700} letterSpacing="0.02em">
          {title}
        </Text>
      </Flex>
      <Box pl={2}>{children}</Box>
    </Box>
  );
}

function SectionTrigger({ children }) {
  return (
    <Accordion.ItemTrigger
      px={1}
      py={3}
      w="100%"
      bg="transparent"
      border="none"
      color="white"
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      _hover={{ bg: "whiteAlpha.150" }}
    >
      <Text fontSize="15px" fontWeight={700} letterSpacing="0.04em">
        {children}
      </Text>
      <Accordion.ItemIndicator color="white" />
    </Accordion.ItemTrigger>
  );
}

function MobileNavbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [showPuskesmas, setShowPuskesmas] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex={100}
      color="white"
      bg={isOpen || !isTop ? GREEN : "rgba(14, 90, 52, 0.72)"}
      boxShadow={isTop && !isOpen ? "none" : "md"}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      transition="background-color 0.25s ease"
    >
      <Flex align="center" justify="space-between" px={3} py={2} gap={2}>
        <Brand compact />
        <Flex align="center" gap={2} flexShrink={0}>
          <ColorModeButton
            variant="outline"
            color="white"
            borderColor="white"
            bg="transparent"
            _hover={{ bg: "whiteAlpha.200" }}
            h="36px"
            minW="36px"
          />
          <Button
            as={RouterLink}
            to="/admin"
            size="sm"
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{ bg: "whiteAlpha.200" }}
            h="36px"
            px={3}
          >
            Admin
          </Button>
          <Drawer.Root
            placement="start"
            open={isOpen}
            onOpenChange={(event) => setIsOpen(event.open)}
          >
            <Drawer.Trigger asChild>
              <IconButton
                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
                variant="ghost"
                color="white"
                bg="whiteAlpha.300"
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius="12px"
                minW="44px"
                h="44px"
                fontSize="26px"
              >
                <BiMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content
                  bg={GREEN}
                  color="white"
                  w={{ base: "100vw", sm: "400px" }}
                  maxW="100vw"
                  h="100dvh"
                  maxH="100dvh"
                  display="flex"
                  flexDirection="column"
                  overflow="hidden"
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    px={4}
                    py={3}
                    bg={GREEN_DARK}
                    flexShrink={0}
                  >
                    <Brand onClick={close} />
                    <Drawer.CloseTrigger asChild>
                      <CloseButton
                        aria-label="Tutup menu"
                        color="white"
                        size="lg"
                        borderRadius="12px"
                        bg="whiteAlpha.300"
                        _hover={{ bg: "whiteAlpha.400" }}
                      />
                    </Drawer.CloseTrigger>
                  </Flex>

                  <Drawer.Body overflowY="auto" flex="1" minH="0" px={3} py={2}>
                    <NavItem to="/" title="Beranda" onNavigate={close} />

                    <Accordion.Root collapsible>
                      <Accordion.Item value="profil" border="none">
                        <SectionTrigger>Profil</SectionTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody px={0} pb={3}>
                            <Group icon={icon1} title="Dinas Kesehatan">
                              <NavItem
                                to="/kepala-dinas"
                                title="Kepala Dinas"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/dinkes/visi-misi"
                                title="Visi dan Misi"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/dinkes/struktur"
                                title="Struktur Organisasi"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/dinkes/tugas-fungsi"
                                title="Tugas dan Fungsi"
                                onNavigate={close}
                              />
                            </Group>
                            <Group icon={icon2} title="UPTD Puskesmas">
                              <Button
                                variant="ghost"
                                color="white"
                                justifyContent="flex-start"
                                w="100%"
                                minH="44px"
                                borderRadius="12px"
                                _hover={{ bg: "whiteAlpha.200" }}
                                onClick={() =>
                                  setShowPuskesmas((open) => !open)
                                }
                              >
                                {showPuskesmas
                                  ? "Sembunyikan daftar"
                                  : `Lihat ${puskesmasList.length} puskesmas`}
                              </Button>
                              {showPuskesmas ? (
                                <Box
                                  display="grid"
                                  gridTemplateColumns="1fr 1fr"
                                  gap={1}
                                  px={2}
                                  pb={2}
                                >
                                  {puskesmasList.map((name) => (
                                    <Text
                                      key={name}
                                      fontSize="13px"
                                      py={1}
                                      color="whiteAlpha.900"
                                    >
                                      {name}
                                    </Text>
                                  ))}
                                </Box>
                              ) : null}
                            </Group>
                            <Group icon={icon3} title="UPTD Lainnya">
                              <Text px={2} py={1} fontSize="14px">
                                Labkesda
                              </Text>
                              <Text px={2} py={1} fontSize="14px">
                                Gudang Farmasi
                              </Text>
                            </Group>
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>

                      <Accordion.Item value="ppid" border="none">
                        <SectionTrigger>PPID</SectionTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody px={0} pb={3}>
                            <Group icon={iconPPID1} title="Profil">
                              <NavItem
                                to="/ppid/profile"
                                title="Profil Pelaksana"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/ppid/tugas-dan-fungsi"
                                title="Tugas dan Fungsi"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/maklumat-pelayanan"
                                title="Maklumat Pelayanan"
                                onNavigate={close}
                              />
                            </Group>
                            <Group icon={iconPPID2} title="Informasi">
                              <NavItem
                                to="/informasi/berkala"
                                title="Berkala"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/informasi/publik"
                                title="Publik"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/informasi/serta-merta"
                                title="Serta Merta"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/informasi/setiap-saat"
                                title="Setiap Saat"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/informasi/dikecualikan"
                                title="Dikecualikan"
                                onNavigate={close}
                              />
                            </Group>
                            <Group icon={iconPPID5} title="Informasi Keuangan">
                              <NavItem
                                to="/informasi/keuangan"
                                title="Keuangan"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/informasi/barang-dan-jasa"
                                title="Pengadaan Barang dan Jasa"
                                onNavigate={close}
                              />
                            </Group>
                            <Group icon={iconPPID3} title="Layanan">
                              <NavItem
                                to="/pelayanan/permohonan"
                                title="Permohonan Informasi"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/pelayanan/keberatan"
                                title="Pengajuan Keberatan"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/pelayanan/cek-permohonan"
                                title="Cek Status Permohonan"
                                onNavigate={close}
                              />
                            </Group>
                            <Group icon={iconPPID4} title="Alur Pelayanan">
                              <NavItem
                                to="/sop/pengajuan-informasi"
                                title="Permohonan Informasi"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/sengketa-informasi"
                                title="Sanggahan Informasi"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/alasan-penolakan"
                                title="Alasan Penolakan"
                                onNavigate={close}
                              />
                              <NavItem
                                to="/alur-sengketa"
                                title="Sengketa Informasi"
                                onNavigate={close}
                              />
                            </Group>
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>

                      <Accordion.Item value="program" border="none">
                        <SectionTrigger>Program</SectionTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody px={1} pb={3}>
                            <NavItem
                              to="/bidang/yankes"
                              title="Yankes"
                              description="Pelayanan Kesehatan"
                              icon={<MenuIcon src={iconBidang1} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              to="/bidang/sdk"
                              title="SDK"
                              description="Sumber Daya Kesehatan"
                              icon={<MenuIcon src={iconBidang2} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              to="/bidang/kesmas"
                              title="Kesmas"
                              description="Kesehatan Masyarakat"
                              icon={<MenuIcon src={iconBidang3} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              to="/bidang/sekret"
                              title="Sekretariat"
                              description="Administrasi dan Keuangan"
                              icon={<MenuIcon src={iconBidang4} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              to="/bidang/p2p"
                              title="P2P"
                              description="Pencegahan dan Pengendalian Penyakit"
                              icon={<MenuIcon src={iconBidang5} alt="" />}
                              onNavigate={close}
                            />
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    </Accordion.Root>

                    <NavItem
                      to="/daftar-berita-dinkes"
                      title="Berita"
                      onNavigate={close}
                    />

                    <Accordion.Root collapsible>
                      <Accordion.Item value="galeri" border="none">
                        <SectionTrigger>Galeri</SectionTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody px={1} pb={3}>
                            <NavItem
                              to="/galeri/foto"
                              title="Foto"
                              description="Dokumentasi kegiatan"
                              onNavigate={close}
                            />
                            <NavItem
                              to="/galeri/info-grafis"
                              title="Infografis"
                              onNavigate={close}
                            />
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>

                      <Accordion.Item value="aplikasi" border="none">
                        <SectionTrigger>Aplikasi</SectionTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody px={1} pb={3}>
                            <NavItem
                              href="https://pena-dinkes.paserkab.go.id/login"
                              title="Pena Dinkes"
                              description="Sistem Informasi Dinkes"
                              icon={<MenuIcon src={PenaLogo} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              href="https://sites.google.com/view/portal-kepegawaian"
                              title="Kenaikan Pangkat"
                              description="Sistem kenaikan pangkat"
                              icon={<MenuIcon src={PangkatLogo} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              href="https://aset.dinkes.paserkab.go.id"
                              title="Aset Dinkes"
                              description="Sistem manajemen aset"
                              icon={<MenuIcon src={AsetLogo} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              href="https://sdmk.dinkes.paserkab.go.id"
                              title="SDMK"
                              description="Data manajemen kesehatan"
                              icon={<MenuIcon src={iconBidang4} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              href="https://sdmk.dinkes.paserkab.go.id"
                              title="Apteka"
                              description="Pengelolaan persediaan obat"
                              icon={<MenuIcon src={AptekaLogo} alt="" />}
                              onNavigate={close}
                            />
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>

                      <Accordion.Item value="kontak" border="none">
                        <SectionTrigger>Kontak</SectionTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody px={1} pb={3}>
                            <NavItem
                              to="/alur-pelaporan"
                              title="Alur Pelaporan"
                              icon={<MenuIcon src={iconPPID4} alt="" />}
                              onNavigate={close}
                            />
                            <NavItem
                              to="/kontak"
                              title="Hubungi Kami"
                              icon={<MenuIcon src={iconKontak} alt="" />}
                              onNavigate={close}
                            />
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    </Accordion.Root>
                  </Drawer.Body>

                  <Box
                    px={4}
                    py={3}
                    borderTopWidth="1px"
                    borderColor="whiteAlpha.300"
                    flexShrink={0}
                  >
                    <Button
                      as={RouterLink}
                      to="/admin"
                      w="100%"
                      variant="outline"
                      color="white"
                      borderColor="white"
                      _hover={{ bg: "whiteAlpha.200" }}
                      onClick={close}
                      mb={isAuthenticated ? 2 : 0}
                    >
                      Mode admin
                    </Button>
                    {isAuthenticated ? (
                      <Button
                        w="100%"
                        variant="outline"
                        color="white"
                        borderColor="white"
                        _hover={{ bg: "whiteAlpha.200" }}
                        onClick={() => {
                          logout();
                          close();
                        }}
                      >
                        Logout
                      </Button>
                    ) : null}
                  </Box>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Flex>
      </Flex>
    </Box>
  );
}

export default MobileNavbar;
