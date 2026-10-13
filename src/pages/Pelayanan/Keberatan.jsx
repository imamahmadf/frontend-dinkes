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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import api from "../../utils/api";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import axios from "axios";
// Schema validasi
const validationSchema = Yup.object({
  noPermohonan: Yup.string().required("Nomor Permohonan wajib diisi"),
  alasan: Yup.string()
    .min(10, "Alasan Keberatan minimal 10 karakter")
    .required("Alasan Keberatan wajib diisi"),
});

function Keberatan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form values:", values); // Debug log
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/permohonan/post/keberatan`,
        {
          noPermohonan: values.noPermohonan,
          alasan: values.alasan,
        }
      );

      // Pastikan modalMessage adalah string
      console.log("Response data:", response.data); // Debug log
      const resultMessage =
        typeof response.data?.result === "string"
          ? response.data?.result
          : "Keberatan berhasil dikirim";
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
        <Box bg="var(--page-bg)" minH="70vh">
          <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 8, md: 10 }}>
            <Container maxW="860px" px={{ base: 4, md: 6 }}>
              <Text fontSize="13px" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.800">
                Layanan PPID
              </Text>
              <Heading as="h1" mt={2} fontSize={{ base: "28px", md: "36px" }} color="white">
                Pengajuan Keberatan
              </Heading>
              <Text mt={3} color="whiteAlpha.900">
                Ajukan keberatan jika jawaban atas permohonan informasi belum sesuai.
              </Text>
            </Container>
          </Box>
          <Container maxW="860px" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
            <Box bg="var(--card)" borderRadius="16px" boxShadow="sm" p={{ base: 4, md: 8 }} color="var(--text)" borderWidth="1px" borderColor="var(--line)">
              <Heading mb={4} fontSize={{ base: "22px", md: "26px" }}>
                Form Pengajuan Keberatan
              </Heading>

              <Text fontSize={"18px"} mb={"40px"} color="var(--muted)">
                Pengajuan permohonan Keberatan secara daring, cepat, dan sesuai
                prosedur untuk mendukung keterbukaan informasi publik.
              </Text>

              <Formik
                initialValues={{
                  noPermohonan: "",
                  alasan: "",
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
                          Nomor Permohonan
                        </Text>
                        <Input
                          name="noPermohonan"
                          value={values.noPermohonan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.noPermohonan && touched.noPermohonan
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.noPermohonan && touched.noPermohonan && (
                          <Text color="red.500">{errors.noPermohonan}</Text>
                        )}
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Alasan Permohonan
                        </Text>
                        <Textarea
                          minHeight={"300px"}
                          name="alasan"
                          rows={3}
                          value={values.alasan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.alasan && touched.alasan
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.alasan && touched.alasan && (
                          <Text color="red.500">{errors.alasan}</Text>
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
                          Kirim Keberatan
                        </Button>
                      </Flex>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Box>
            </Container>
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
                    : "Keberatan berhasil dikirim"}
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

export default Keberatan;
