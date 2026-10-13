import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import AdminPage from "../../../components/Admin/AdminPage";
import api from "../../../utils/api";

const kosong = {
  judul: "",
  ringkasan: "",
  tahun: "",
  file: null,
  jenis: "",
  bidang: "",
};

const TambahDokumen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [awal, setAwal] = useState(kosong);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [dataJenis, setDataJenis] = useState(null);
  const [dataBidang, setDataBidang] = useState(null);
  // Schema validasi menggunakan Yup
  const validationSchema = Yup.object({
    judul: Yup.string()
      .required("Judul dokumen wajib diisi")
      .min(10, "Judul dokumen minimal 10 karakter")
      .max(200, "Judul dokumen maksimal 200 karakter"),
    ringkasan: Yup.string()
      .required("Ringkasan dokumen wajib diisi")
      .min(20, "Ringkasan dokumen minimal 20 karakter")
      .max(500, "Ringkasan dokumen maksimal 500 karakter"),

    jenis: Yup.string().required("Jenis dokumen wajib dipilih"),
    bidang: Yup.string().required("Bidang wajib dipilih"),
    tahun: Yup.number()
      .required("Tahun wajib diisi")
      .min(2000, "Tahun minimal 2000")
      .max(
        new Date().getFullYear(),
        `Tahun maksimal ${new Date().getFullYear()}`
      ),
    file: Yup.mixed()
      .test("wajib", "File PDF wajib diupload", (value) => isEdit || Boolean(value))
      .test(
        "fileSize",
        "Ukuran file terlalu besar (maksimal 10MB)",
        (value) => {
          if (!value) return true;
          return value.size <= 70 * 1024 * 1024; // 10MB
        }
      )
      .test("fileType", "Format file harus PDF", (value) => {
        if (!value) return true;
        return value.type === "application/pdf";
      }),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFieldValue("file", file);

      // Create preview untuk nama file
      setFilePreview(file.name);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("ringkasan", values.ringkasan);
    formData.append("tahun", values.tahun);
    if (values.file) formData.append("file", values.file);
    formData.append("jenis", values.jenis);
    formData.append("bidang", values.bidang);

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/update/${id}`
        : `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/post`;
      const response = await axios({
        method: isEdit ? "put" : "post",
        url,
        data: formData,
      });

      console.log("Dokumen tersimpan:", response.data);

      setSubmitting(false);
      resetForm();
      setSelectedFile(null);
      setFilePreview(null);
      alert(isEdit ? "Dokumen berhasil diperbarui." : "Dokumen berhasil diupload!");
      navigate("/admin/daftar-informasi");
    } catch (error) {
      console.error("Error uploading dokumen:", error);
      setSubmitting(false);

      // Bisa ditambahkan notifikasi error di sini
      alert("Gagal mengupload dokumen. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/get/seed`
        ); // Sesuaikan endpoint dengan API Anda
        const data = response.data || response.data;

        console.log(response.data, "DATA SEED");

        setDataJenis(response.data.result);
        setDataBidang(response.data.resultBidang);
      } catch (err) {
        console.error("Error fetching data:", err);

        // Data contoh jika API belum tersedia
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/informasi/detail/${id}`)
      .then((res) => {
        const item = res.data.result;
        if (!item) return;
        setAwal({
          judul: item.judul || "",
          ringkasan: item.ringkasan || "",
          tahun: item.tahun || "",
          file: null,
          jenis: String(item.jenisInformasiId || item.jenisInformasi?.id || ""),
          bidang: String(item.bidangId || item.bidang?.id || ""),
        });
        setFilePreview(item.dokumen ? "Berkas saat ini tetap dipakai jika tidak diganti." : null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <LayoutAdmin>
      <AdminPage
        title={isEdit ? "Edit dokumen" : "Tambah dokumen"}
        description={isEdit ? "Perbarui data. Berkas PDF hanya diunggah jika ingin diganti." : "Isi data berikut, lalu unggah berkas PDF."}
      >
          <Formik
            initialValues={awal}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing={6} align="stretch">
                  {/* Input Judul */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Judul Dokumen *
                    </Text>
                    <Field
                      name="judul"
                      type="text"
                      placeholder="Masukkan judul dokumen"
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

                  {/* Input Ringkasan */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Ringkasan Dokumen *
                    </Text>
                    <Field
                      as="textarea"
                      name="ringkasan"
                      placeholder="Masukkan ringkasan dokumen"
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        border:
                          errors.ringkasan && touched.ringkasan
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                        resize: "vertical",
                      }}
                    />
                    {errors.ringkasan && touched.ringkasan && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.ringkasan}
                      </Text>
                    )}
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Jenis Dokumen *
                    </Text>
                    <Field
                      as="select"
                      name="jenis"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border:
                          errors.jenis && touched.jenis
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="">Pilih Jenis</option>
                      {dataJenis?.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.jenis}
                        </option>
                      ))}
                    </Field>
                    {errors.jenis && touched.jenis && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.jenis}
                      </Text>
                    )}
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Bidang *
                    </Text>
                    <Field
                      as="select"
                      name="bidang"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border:
                          errors.bidang && touched.bidang
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="">Pilih Bidang</option>
                      {dataBidang?.map((b) => (
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
                  {/* Input Tahun */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      Tahun Dokumen *
                    </Text>
                    <Field
                      name="tahun"
                      type="number"
                      placeholder="Masukkan tahun dokumen"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        border:
                          errors.tahun && touched.tahun
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {errors.tahun && touched.tahun && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.tahun}
                      </Text>
                    )}
                  </Box>

                  {/* Upload File PDF */}
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      {isEdit ? "Ganti file PDF" : "File PDF *"}
                    </Text>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        border:
                          errors.file && touched.file
                            ? "1px solid red"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {errors.file && touched.file && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.file}
                      </Text>
                    )}

                    {/* File Preview */}
                    {filePreview && (
                      <Box mt={4} p={3} bg="var(--surface)" borderRadius="md">
                        <Text fontSize="sm" color="var(--muted)" mb={1}>
                          File yang dipilih:
                        </Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {filePreview}
                        </Text>
                      </Box>
                    )}
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    bg="#14A75B"
                    color="white"
                    _hover={{ bg: "#0E7A45" }}
                    loading={isSubmitting}
                    w="full"
                  >
                    Unggah dokumen
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
      </AdminPage>
    </LayoutAdmin>
  );
};

export default TambahDokumen;
