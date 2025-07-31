import {
  Box,
  Image,
  Text,
  Center,
  Container,
  Heading,
  Table,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import LayoutAdmin from "../../../components/Admin/LayoutAdmin";
import React, { useRef, useState, useEffect } from "react";

import { motion } from "framer-motion";
import axios from "axios";

function DaftarBerita() {
  const [dataPublik, setDataPublik] = useState(null);
  async function fetchDataPublik() {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/berita/list`)
      .then((res) => {
        setDataPublik(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handlePreview = (fileName) => {
    const url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}${fileName}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchDataPublik();
  }, []);

  return (
    <LayoutAdmin>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box w="100vw" position="relative">
          <Box bgColor={"gray.100"} zIndex={1} py={"50px"}>
            <Container
              py={"120px"}
              bgColor={"white"}
              maxWidth={"1820px"}
              color={"#524E4E"}
              px={"80px"}
            >
              <Box mb={"30px"}>
                <Button as={RouterLink} to="/admin/tambah-berita">
                  Tambah berita
                </Button>
              </Box>
              <Heading mb={"30px"} fontSize={"35px"}>
                Berita
              </Heading>
              <Table.Root stickyHeader fontSize={"20px"}>
                <Table.Header>
                  <Table.Row bgColor={"#14A75B"} py={"50px"}>
                    <Table.ColumnHeader color={"white"}>No.</Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"}>
                      Judul
                    </Table.ColumnHeader>

                    <Table.ColumnHeader color={"white"} textAlign="end">
                      bidang
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"} textAlign="end">
                      Tema
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end" color={"white"}>
                      Aksi
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {dataPublik?.map((item, index) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item?.judul}</Table.Cell>

                      <Table.Cell textAlign="end">
                        {item?.bidang.nama}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        {item?.temaBerita.tema}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Button onClick={() => handlePreview(item?.dokumen)}>
                          Lihat
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </LayoutAdmin>
  );
}

export default DaftarBerita;
