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
                  PERMOHONAN INFORMASI ONLINE
                </Text>
                <Text
                  fontSize={"30px"}
                  fontWeight={100}
                  color={"white"}
                  textAlign={"center"}
                >
                  PENGAJUAN KEBERATAN ONLINE
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
              <Heading mb={"30px"} fontSize={"35px"}>
                Form Pengajuan Keberatan
              </Heading>

              <Text fontSize={"18px"} mb={"40px"} color="gray.600">
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
