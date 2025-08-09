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
import api from "../utils/api";
import axios from "axios";
import { motion } from "framer-motion";

// Schema validasi
const validationSchema = Yup.object({
  nik: Yup.string()
    .matches(/^[0-9]{16}$/, "NIK harus 16 digit angka")
    .required("NIK wajib diisi"),
  nama: Yup.string()
    .min(3, "Nama minimal 3 karakter")
    .required("Nama wajib diisi"),
  fotoKtp: Yup.mixed()
    .required("Foto KTP wajib diupload")
    .test("fileSize", "Ukuran file maksimal 1MB", (value) => {
      return value && value.size <= 1024 * 1024;
    })
    .test("fileType", "Format file harus JPG atau PNG", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
  alamatLengkap: Yup.string()
    .min(10, "Alamat minimal 10 karakter")
    .required("Alamat lengkap wajib diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  nomorWa: Yup.string()
    .matches(
      /^8[0-9]{8,11}$/,
      "Nomor WhatsApp harus dimulai dari 8 dan 10-13 digit"
    )
    .required("Nomor WhatsApp wajib diisi"),
  alasanPermohonan: Yup.string()
    .min(10, "Alasan permohonan minimal 10 karakter")
    .required("Alasan permohonan wajib diisi"),
  //   rincianInformasi: Yup.string()
  //     .min(10, "Rincian informasi minimal 10 karakter")
  //     .required("Rincian informasi wajib diisi"),
  asalInstansi: Yup.string()
    .min(3, "Asal instansi minimal 3 karakter")
    .required("Asal instansi wajib diisi"),
});

function LaporPelayanan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("nik", values.nik);
      formData.append("nama", values.nama);
      formData.append("pic", values.fotoKtp);
      formData.append("alamat", values.alamatLengkap);
      formData.append("email", values.email);
      formData.append("nomorWA", values.nomorWa);
      formData.append("alasan", values.alasanPermohonan);
      //   formData.append("rincian", values.rincianInformasi);
      formData.append("asal", values.asalInstansi);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/permohonan/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setModalMessage(response.data?.result.noPermohonan);
      setIsOpen(true);
      console.log(response.data);
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
      setIsOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box position="relative">
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              py={"120px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
            >
              <Heading mb={"30px"} fontSize={"35px"}>
                Form Permohonan Informasi
              </Heading>

              <Text fontSize={"18px"} mb={"40px"} color="gray.600">
                Pengajuan permohonan informasi secara daring, cepat, dan sesuai
                prosedur untuk mendukung keterbukaan informasi publik.
              </Text>

              <Formik
                initialValues={{
                  nik: "",
                  nama: "",
                  fotoKtp: null,
                  alamatLengkap: "",
                  email: "",
                  nomorWa: "",
                  alasanPermohonan: "",
                  //   rincianInformasi: "",
                  asalInstansi: "",
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
                          NIK
                        </Text>
                        <Input
                          name="nik"
                          maxLength={16}
                          value={values.nik}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.nik && touched.nik ? "red.500" : "gray.300"
                          }
                        />
                        {errors.nik && touched.nik && (
                          <Text color="red.500">{errors.nik}</Text>
                        )}
                      </Box>

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
                            errors.nama && touched.nama ? "red.500" : "gray.300"
                          }
                        />
                        {errors.nama && touched.nama && (
                          <Text color="red.500">{errors.nama}</Text>
                        )}
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Upload Foto KTP
                        </Text>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(event) =>
                            setFieldValue(
                              "fotoKtp",
                              event.currentTarget.files[0]
                            )
                          }
                          borderColor={
                            errors.fotoKtp && touched.fotoKtp
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {values.fotoKtp && (
                          <Text fontSize="sm" color="gray.600">
                            {values.fotoKtp.name} (
                            {(values.fotoKtp.size / 1024).toFixed(1)} KB)
                          </Text>
                        )}
                        {errors.fotoKtp && touched.fotoKtp && (
                          <Text color="red.500">{errors.fotoKtp}</Text>
                        )}
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Alamat Lengkap
                        </Text>
                        <Textarea
                          name="alamatLengkap"
                          rows={3}
                          value={values.alamatLengkap}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.alamatLengkap && touched.alamatLengkap
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.alamatLengkap && touched.alamatLengkap && (
                          <Text color="red.500">{errors.alamatLengkap}</Text>
                        )}
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Email
                        </Text>
                        <Input
                          name="email"
                          type="email"
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
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Nomor WhatsApp
                        </Text>
                        <HStack>
                          <Text>+62</Text>
                          <Input
                            name="nomorWa"
                            value={values.nomorWa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            borderColor={
                              errors.nomorWa && touched.nomorWa
                                ? "red.500"
                                : "gray.300"
                            }
                          />
                        </HStack>
                        {errors.nomorWa && touched.nomorWa && (
                          <Text color="red.500">{errors.nomorWa}</Text>
                        )}
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Asal Instansi
                        </Text>
                        <Input
                          name="asalInstansi"
                          value={values.asalInstansi}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.asalInstansi && touched.asalInstansi
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.asalInstansi && touched.asalInstansi && (
                          <Text color="red.500">{errors.asalInstansi}</Text>
                        )}
                      </Box>

                      <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Alasan Permohonan
                        </Text>
                        <Textarea
                          name="alasanPermohonan"
                          rows={3}
                          value={values.alasanPermohonan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.alasanPermohonan && touched.alasanPermohonan
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.alasanPermohonan &&
                          touched.alasanPermohonan && (
                            <Text color="red.500">
                              {errors.alasanPermohonan}
                            </Text>
                          )}
                      </Box>

                      {/* <Box>
                        <Text fontSize="16px" fontWeight="600" mb={2}>
                          Rincian Informasi
                        </Text>
                        <Textarea
                          name="rincianInformasi"
                          rows={3}
                          value={values.rincianInformasi}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.rincianInformasi && touched.rincianInformasi
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.rincianInformasi &&
                          touched.rincianInformasi && (
                            <Text color="red.500">
                              {errors.rincianInformasi}
                            </Text>
                          )}
                      </Box> */}

                      <Flex justify="center" mt={8}>
                        <Button
                          type="submit"
                          colorScheme="green"
                          size="lg"
                          px={12}
                          py={6}
                          fontSize="18px"
                          isLoading={isSubmitting}
                          loadingText="Mengirim..."
                        >
                          Kirim Permohonan
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
                <Text> Permohonan berhasil dikirim. Nomor Permohonan:</Text>
                <Text fontWeight={800} mt={"15px"} fontSize={"30px"}>
                  {modalMessage}
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
    </>
  );
}

export default LaporPelayanan;
