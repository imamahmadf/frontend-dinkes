import { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Container,
  Dialog,
  Flex,
  Heading,
  Input,
  Link,
  Portal,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BsFacebook, BsInstagram, BsTiktok, BsWhatsapp, BsYoutube } from "react-icons/bs";
import Layout from "../components/Layout";

const validationSchema = Yup.object({
  nama: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  subjek: Yup.string().required("Subjek wajib diisi"),
  pesan: Yup.string().required("Pesan wajib diisi"),
});

const sosial = [
  {
    nama: "WhatsApp",
    nilai: "0853-8638-4948",
    href: "https://wa.me/6281234567890",
    warna: "#25D366",
    icon: BsWhatsapp,
  },
  {
    nama: "Instagram",
    nilai: "dinkespaserkab",
    href: "https://www.instagram.com/dinkespaserkab",
    warna: "#E1306C",
    icon: BsInstagram,
  },
  {
    nama: "Facebook",
    nilai: "Dinkes Paser",
    href: "https://www.facebook.com/baini.rahman.37",
    warna: "#1877F3",
    icon: BsFacebook,
  },
  {
    nama: "TikTok",
    nilai: "dinkes_paser",
    href: "https://www.tiktok.com/@dinkes_paser?",
    warna: "#111111",
    icon: BsTiktok,
  },
  {
    nama: "YouTube",
    nilai: "Dinkes Paser",
    href: "https://www.youtube.com/@dinkespaser12",
    warna: "#E11D48",
    icon: BsYoutube,
  },
];

function Field({ label, error, children }) {
  return (
    <Box>
      <Text fontSize="14px" fontWeight="600" mb={2}>
        {label}
      </Text>
      {children}
      {error ? (
        <Text mt={1} fontSize="13px" color="red.500">
          {error}
        </Text>
      ) : null}
    </Box>
  );
}

function Kontak() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { nama, email, subjek, pesan } = values;
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/post/laporan`,
        { nama, email, subjek, pesan }
      );
      const resultMessage =
        typeof response.data?.result === "string"
          ? response.data.result
          : "Pesan berhasil dikirim";
      setModalMessage(resultMessage);
      setIsOpen(true);
      resetForm();
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Gagal mengirim permohonan. Silakan coba lagi.";
      setModalMessage(msg);
      setIsOpen(true);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh" color="var(--text)" overflowX="hidden">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 6, md: 8 }}>
          <Container maxW="1100px" px={{ base: 4, md: 6 }}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
              Dinas Kesehatan Kabupaten Paser
            </Text>
            <Heading as="h1" mt={2} fontSize={{ base: "28px", md: "36px" }} lineHeight="1.2">
              Hubungi Kami
            </Heading>
            <Text mt={3} maxW="640px" fontSize={{ base: "15px", md: "17px" }} color="whiteAlpha.900">
              Sampaikan pertanyaan, saran, kritik, maupun aduan terkait layanan informasi publik.
            </Text>
          </Container>
        </Box>

        <Container maxW="1100px" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4} alignItems="start">
            <Box
              bg="var(--card)"
              borderWidth="1px"
              borderColor="var(--line)"
              borderRadius="16px"
              p={{ base: 4, md: 6 }}
            >
              <Heading as="h2" fontSize={{ base: "20px", md: "24px" }} color="var(--heading)">
                Informasi Kontak
              </Heading>
              <Text mt={2} color="var(--muted)" fontSize="15px" lineHeight="1.6">
                Silakan hubungi kami melalui formulir atau informasi kontak berikut.
              </Text>

              <Box mt={5} display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Text fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                    ALAMAT
                  </Text>
                  <Text mt={1} lineHeight="1.6">
                    Komplek Perkantoran Jl. Kusuma Bangsa KM. 05 Gedung A. Lt.2 Kav. 1, Kecamatan Tanah Grogot, Kabupaten Paser, Provinsi Kalimantan Timur 76251
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                    EMAIL
                  </Text>
                  <Link href="mailto:dinkes@paser.go.id" color="var(--text)" fontWeight="600">
                    dinkes@paser.go.id
                  </Link>
                </Box>
                <Box>
                  <Text fontSize="13px" fontWeight="700" letterSpacing="0.04em" color="#0E7A45">
                    JAM OPERASIONAL
                  </Text>
                  <Text mt={1}>Senin - Kamis, 08.00 - 16.00 WITA</Text>
                  <Text>Jumat, 08.00 - 11.30 WITA</Text>
                </Box>
              </Box>

              <Box mt={6} display="flex" flexDirection="column" gap={3}>
                {sosial.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.nama}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      display="flex"
                      alignItems="center"
                      gap={3}
                      color="var(--text)"
                      _hover={{ color: "#0E7A45" }}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        bg={item.warna}
                        color="white"
                        flexShrink={0}
                      >
                        <Icon />
                      </Flex>
                      <Box>
                        <Text fontSize="13px" color="var(--muted)">{item.nama}</Text>
                        <Text fontWeight="600">{item.nilai}</Text>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            </Box>

            <Box
              bg="var(--card)"
              borderWidth="1px"
              borderColor="var(--line)"
              borderRadius="16px"
              p={{ base: 4, md: 6 }}
            >
              <Heading as="h2" fontSize={{ base: "20px", md: "24px" }} color="var(--heading)">
                Kirim Pesan
              </Heading>
              <Text mt={2} mb={5} color="var(--muted)" fontSize="15px" lineHeight="1.6">
                Sampaikan pertanyaan, saran, kritik maupun aduan terkait layanan informasi publik di Lingkungan Pemerintah Kabupaten Paser.
              </Text>

              <Formik
                initialValues={{ nama: "", email: "", subjek: "", pesan: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, handleChange, handleBlur }) => (
                  <Form>
                    <VStack gap={4} align="stretch">
                      <Field label="Nama" error={touched.nama && errors.nama}>
                        <Input
                          name="nama"
                          aria-label="Nama"
                          value={values.nama}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          bg="var(--surface)"
                          color="var(--text)"
                          borderColor={touched.nama && errors.nama ? "red.500" : "var(--line)"}
                        />
                      </Field>
                      <Field label="E-Mail" error={touched.email && errors.email}>
                        <Input
                          name="email"
                          type="email"
                          aria-label="E-Mail"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          bg="var(--surface)"
                          color="var(--text)"
                          borderColor={touched.email && errors.email ? "red.500" : "var(--line)"}
                        />
                      </Field>
                      <Field label="Subjek" error={touched.subjek && errors.subjek}>
                        <Input
                          name="subjek"
                          aria-label="Subjek"
                          value={values.subjek}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          bg="var(--surface)"
                          color="var(--text)"
                          borderColor={touched.subjek && errors.subjek ? "red.500" : "var(--line)"}
                        />
                      </Field>
                      <Field label="Pesan" error={touched.pesan && errors.pesan}>
                        <Textarea
                          name="pesan"
                          aria-label="Pesan"
                          rows={6}
                          value={values.pesan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          bg="var(--surface)"
                          color="var(--text)"
                          borderColor={touched.pesan && errors.pesan ? "red.500" : "var(--line)"}
                        />
                      </Field>
                      <Button
                        type="submit"
                        bg="#14A75B"
                        color="white"
                        _hover={{ bg: "#0E7A45" }}
                        loading={isSubmitting}
                        loadingText="Mengirim..."
                      >
                        Kirim
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Dialog.Root open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="var(--card)" color="var(--text)" mx={4}>
              <Dialog.Header>
                <Dialog.Title>Informasi</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>{typeof modalMessage === "string" ? modalMessage : "Pesan berhasil dikirim"}</Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button bg="#14A75B" color="white" _hover={{ bg: "#0E7A45" }} onClick={() => setIsOpen(false)}>
                  Tutup
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Layout>
  );
}

export default Kontak;
