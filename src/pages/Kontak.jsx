import React, { useState } from "react";
import {
  Box,
  Text,
  Center,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Flex,
  Input,
  Textarea,
  Dialog,
  Portal,
  CloseButton,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BsYoutube } from "react-icons/bs";
import { BsTiktok } from "react-icons/bs";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import axios from "axios";
import { BsWhatsapp } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";

import { BsFacebook } from "react-icons/bs";
// Schema validasi
const validationSchema = Yup.object({
  nama: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  subjek: Yup.string().required("Subjek wajib diisi"),
  pesan: Yup.string().required("Pesan wajib diisi"),
});

function Kontak() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { nama, email, subjek, pesan } = values;
    console.log("Form values:", values); // Debug log
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/permohonan/post/laporan`,
        {
          nama,
          email,
          subjek,
          pesan,
        }
      );

      // Pastikan modalMessage adalah string
      console.log("Response data:", response.data); // Debug log
      const resultMessage =
        typeof response.data?.result === "string"
          ? response.data?.result
          : "Pesan berhasil dikirim";
      setModalMessage(resultMessage);
      setIsOpen(true);
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.log("Error:", error); // Debug log
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box w="100vw" position="relative">
          <Box bgColor={"#14A75B"} height={"350px"}></Box>
          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            top="calc(25vh - 30px)"
            bg="white"
            color="black"
            px={8}
            py={4}
            zIndex={10}
            minHeight={"100px"}
            minWidth={"1500px"}
            bgColor={"gray"}
          >
            <Center height={"100px"}>
              <Box width={"100%"}>
                <Text
                  fontSize={"40px"}
                  fontWeight={1000}
                  color={"white"}
                  textAlign={"center"}
                >
                  HUBUNGI KAMI
                </Text>
              </Box>
            </Center>
          </Box>

          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              py={"120px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
              px={"80px"}
            >
              <Flex gap={5}>
                <Flex width={"50%"} pe={"20px"} flexDirection={"column"}>
                  <Heading mb={"30px"} fontWeight={900} fontSize={"35px"}>
                    Informasi Kontak
                  </Heading>
                  <Text fontSize={"20px"} mb={"20px"} color="gray.600">
                    Silakan hubungi kami melalui form di sebelah kanan atau
                    melalui informasi kontak berikut:
                  </Text>
                  <Flex fontSize={"20px"} spacing={4} gap={4} align="stretch">
                    <Box w={"60%"}>
                      <Text fontWeight={700} mb={2}>
                        Alamat:
                      </Text>
                      <Text>
                        Komplek Perkantoran Jl. Kusuma Bangsa KM. 05 Gedung A.
                        Lt.2 Kav. 1, Kecamatan Tanah Grogot, Kabupaten
                        Paser,Provinsi Kalimantan Timur 76251
                      </Text>
                      <Text mt={"20px"} fontWeight={700} mb={2}>
                        Email:
                      </Text>
                      <Text>dinkes@paser.go.id</Text>
                    </Box>{" "}
                    <Box w={"40%"}>
                      <Text fontWeight={700} mb={2}>
                        Jam Oprasional:
                      </Text>
                      <Text>Senin - Kamis, 08.00 - 16.00 WITA</Text>
                      <Text>Jumat, 08.00 - 11.30 WITA</Text>
                    </Box>
                  </Flex>{" "}
                  <Spacer />
                  <Box
                    mt={"30px"}
                    left={{ base: "10px", md: "20px", lg: "30px" }}
                    zIndex={20}
                    display={{ base: "flex", md: "flex" }}
                    flexDirection="column"
                    gap={{ base: 2, md: 3, lg: 4 }}
                  >
                    {/* WhatsApp */}
                    <Flex>
                      <Link href="https://wa.me/6281234567890" isExternal>
                        <Box
                          bg="#25D366"
                          color={"white"}
                          borderRadius="full"
                          boxShadow="md"
                          p={{ base: 2, md: 2.5, lg: 3 }}
                          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                          _hover={{ bg: "#1DA851" }}
                          transition="0.2s"
                        >
                          <BsWhatsapp />
                        </Box>
                        <Text>+62 8 1250-4392-0303</Text>
                      </Link>
                    </Flex>
                    {/* Instagram */}
                    <Flex>
                      <Link
                        href="https://www.instagram.com/dinkespaserkab"
                        isExternal
                      >
                        <Box
                          bg="#E1306C"
                          color={"white"}
                          borderRadius="full"
                          boxShadow="md"
                          p={{ base: 2, md: 2.5, lg: 3 }}
                          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                          _hover={{ bg: "#C13584" }}
                          transition="0.2s"
                        >
                          <BsInstagram />
                        </Box>{" "}
                        <Text>dinkespaserkab</Text>
                      </Link>
                    </Flex>
                    {/* Facebook */}
                    <Flex>
                      <Link
                        href="https://www.facebook.com/baini.rahman.37"
                        isExternal
                      >
                        <Box
                          bg="#1877F3"
                          color={"white"}
                          borderRadius="full"
                          boxShadow="md"
                          p={{ base: 2, md: 2.5, lg: 3 }}
                          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                          _hover={{ bg: "#145DB2" }}
                          transition="0.2s"
                        >
                          <BsFacebook />
                        </Box>
                        <Text>Dinkes Paser</Text>
                      </Link>
                    </Flex>
                    <Flex>
                      <Link
                        href="https://www.tiktok.com/@dinkes_paser?"
                        isExternal
                      >
                        <Box
                          bg="black"
                          color={"white"}
                          borderRadius="full"
                          boxShadow="md"
                          p={{ base: 2, md: 2.5, lg: 3 }}
                          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                          _hover={{ bg: "black" }}
                          transition="0.2s"
                        >
                          <BsTiktok />
                        </Box>{" "}
                        <Text>dinkes_paser </Text>
                      </Link>
                    </Flex>
                    <Flex>
                      <Link
                        href="https://www.youtube.com/@dinkespaser12"
                        isExternal
                      >
                        <Box
                          bg="red"
                          color={"white"}
                          borderRadius="full"
                          boxShadow="md"
                          p={{ base: 2, md: 2.5, lg: 3 }}
                          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                          _hover={{ bg: "red" }}
                          transition="0.2s"
                        >
                          <BsYoutube />
                        </Box>{" "}
                        <Text>Dinkes Paser </Text>
                      </Link>
                    </Flex>
                  </Box>
                </Flex>
                <Box width={"50%"}>
                  <Heading mb={"30px"} fontWeight={900} fontSize={"35px"}>
                    Kirim Pesan
                  </Heading>
                  <Text fontSize={"20px"} mb={"20px"}>
                    Sampaikan pertanyaan, saran, kritik maupun aduan terkait
                    layanan informasi publik di Lingkungan Pemerintah Kabupaten
                    Paser.
                  </Text>
                  <Formik
                    initialValues={{
                      nama: "",
                      email: "",
                      subjek: "",
                      pesan: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      errors,
                      touched,
                      setFieldValue,
                      values,
                      handleChange,
                      handleBlur,
                    }) => (
                      <Form>
                        <VStack spacing={6} align="stretch">
                          <Box>
                            <Text fontSize="16px" fontWeight="600" mb={2}>
                              Nama
                            </Text>
                            <Input
                              name="nama"
                              value={values.nama}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              borderColor={
                                errors.nama && touched.nama
                                  ? "red.500"
                                  : "gray.300"
                              }
                            />
                            {errors.nama && touched.nama && (
                              <Text color="red.500">{errors.nama}</Text>
                            )}
                          </Box>
                          <Box>
                            <Text fontSize="16px" fontWeight="600" mb={2}>
                              E-Mail
                            </Text>
                            <Input
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              borderColor={
                                errors.email && touched.email
                                  ? "red.500"
                                  : "gray.300"
                              }
                            />
                            {errors.email && touched.email && (
                              <Text color="red.500">{errors.email}</Text>
                            )}
                          </Box>{" "}
                          <Box>
                            <Text fontSize="16px" fontWeight="600" mb={2}>
                              Subjek
                            </Text>
                            <Input
                              name="subjek"
                              value={values.subjek}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              borderColor={
                                errors.subjek && touched.subjek
                                  ? "red.500"
                                  : "gray.300"
                              }
                            />
                            {errors.subjek && touched.subjek && (
                              <Text color="red.500">{errors.subjek}</Text>
                            )}
                          </Box>
                          <Box>
                            <Text fontSize="16px" fontWeight="600" mb={2}>
                              Pesan
                            </Text>
                            <Textarea
                              minHeight={"200px"}
                              name="pesan"
                              rows={3}
                              value={values.pesan}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              borderColor={
                                errors.pesan && touched.pesan
                                  ? "red.500"
                                  : "gray.300"
                              }
                            />
                            {errors.pesan && touched.pesan && (
                              <Text color="red.500">{errors.pesan}</Text>
                            )}
                          </Box>
                          <Flex justify="center" mt={8}>
                            <Button
                              type="submit"
                              colorScheme="green"
                              size="lg"
                              w={"100%"}
                              px={12}
                              py={6}
                              fontSize="18px"
                              isLoading={isSubmitting}
                              loadingText="Mengirim..."
                            >
                              Kirim
                            </Button>
                          </Flex>
                        </VStack>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Flex>
            </Container>
          </Box>
        </Box>
      </motion.div>

      {/* ✅ Dialog untuk menampilkan hasil */}
      <Dialog.Root
        open={isOpen}
        onOpenChange={(details) => setIsOpen(details.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Informasi</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text fontWeight={800} mt={"15px"} fontSize={"25px"}>
                  {typeof modalMessage === "string"
                    ? modalMessage
                    : "Pesan berhasil dikirim"}
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => setIsOpen(false)}
                >
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
