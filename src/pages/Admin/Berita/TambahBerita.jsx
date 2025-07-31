import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import {
  Box,
  Image,
  Text,
  Center,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import api from "../../../utils/api";
import axios from "axios";

import LayoutAdmin from "../../../components/Admin/LayoutAdmin";

const TambahBerita = () => {
  const quillRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bidangList, setBidangList] = useState([]);
  const [temaList, setTemaList] = useState([]);
  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object({
    judul: Yup.string()
      .required("Judul berita wajib diisi")
      .min(10, "Judul berita minimal 10 karakter")
      .max(200, "Judul berita maksimal 200 karakter"),
    konten: Yup.string()
      .required("Konten berita wajib diisi")
      .min(50, "Konten berita minimal 50 karakter"),
    gambar: Yup.mixed()
      .required("Gambar berita wajib diupload")
      .test("fileSize", "Ukuran file terlalu besar (maksimal 5MB)", (value) => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024; // 5MB
      })
      .test("fileType", "Format file tidak didukung", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          value.type
        );
      }),
    bidang: Yup.string().required("Bidang wajib dipilih"),
    tema: Yup.string().required("Tema wajib dipilih"),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFieldValue("gambar", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const contentHTML = quillRef.current?.getEditor().root.innerHTML;

    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("konten", contentHTML);
    formData.append("gambar", values.gambar);
    formData.append("bidang", values.bidang);
    formData.append("tema", values.tema);

    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/post`,
        formData
      )
      .then((res) => {
        setSubmitting(false);
        resetForm();
        setSelectedImage(null);
        setImagePreview(null);

        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const response = await api.get("/berita/get/seed"); // Sesuaikan endpoint dengan API Anda
        const data = response.data || response.data;

        console.log(response.data, "DATA SEED");

        setBidangList(response.data.resultBidang);
        setTemaList(response.data.resultTema);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data lokasi");
        // Data contoh jika API belum tersedia
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <LayoutAdmin>
      <Box py={"80px"}>
        <Container maxW="1200px">
          <Heading fontSize="30px" fontWeight={700} mb={6} textAlign="center">
            Tambah Berita
          </Heading>

          <Formik
            initialValues={{
              judul: "",
              konten: "",
              gambar: null,
              bidang: "", // baru
              tema: "", // baru
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing={6} align="stretch">
                  {/* Input Judul */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Judul Berita *
                    </Text>
                    <Field
                      name="judul"
                      type="text"
                      placeholder="Judul berita"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        border:
                          errors.judul && touched.judul
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {errors.judul && touched.judul && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.judul}
                      </Text>
                    )}
                  </Box>

                  {/* Upload Gambar */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Gambar Berita *
                    </Text>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        border:
                          errors.gambar && touched.gambar
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {errors.gambar && touched.gambar && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.gambar}
                      </Text>
                    )}

                    {/* Image Preview */}
                    {imagePreview && (
                      <Box mt={4}>
                        <Text fontSize="sm" mb={2} color="gray.600">
                          Preview Gambar:
                        </Text>
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          w={"100%"}
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Input Bidang */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Bidang *
                    </Text>
                    <Field
                      as="select"
                      name="bidang"
                      style={{ width: "100%", padding: "0.5rem" }}
                    >
                      <option value="">Pilih Bidang</option>
                      {bidangList.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.nama}
                        </option>
                      ))}
                    </Field>
                    {errors.bidang && touched.bidang && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.bidang}
                      </Text>
                    )}
                  </Box>

                  {/* Input Tema */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Tema *
                    </Text>
                    <Field
                      as="select"
                      name="tema"
                      style={{ width: "100%", padding: "0.5rem" }}
                    >
                      <option value="">Pilih Tema</option>
                      {temaList.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.tema}
                        </option>
                      ))}
                    </Field>
                    {errors.tema && touched.tema && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.tema}
                      </Text>
                    )}
                  </Box>

                  {/* Editor Konten */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Konten Berita *
                    </Text>
                    <ReactQuill
                      theme="snow"
                      value={values.konten}
                      onChange={(content) => setFieldValue("konten", content)}
                      ref={quillRef}
                      style={{
                        height: "300px",
                        marginBottom: "50px", // Space for toolbar
                      }}
                    />
                    {errors.konten && touched.konten && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.konten}
                      </Text>
                    )}
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    isLoading={isSubmitting}
                    loadingText="Menyimpan..."
                    w="full"
                  >
                    Simpan Berita
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </LayoutAdmin>
  );
};

export default TambahBerita;
