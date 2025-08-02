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
import ReactPaginate from "react-paginate";

import "../../../styles/pagination.css";

import { motion } from "framer-motion";
import axios from "axios";

function DaftarPermohonan() {
  const [dataPermohonan, setDataPermohonan] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  async function fetchdataPermohonan() {
    await axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/permohonan/get?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setDataPermohonan(res.data.result);
        console.log(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchdataPermohonan();
  }, [page]);

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
              <Heading mb={"30px"} fontSize={"35px"}>
                Daftar Permohonan
              </Heading>
              <Table.Root stickyHeader fontSize={"20px"}>
                <Table.Header>
                  <Table.Row bgColor={"#14A75B"} py={"50px"}>
                    <Table.ColumnHeader color={"white"}>No.</Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"}>
                      Nama
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"}>
                      Asal
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"}>
                      NO WA
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"} textAlign="end">
                      Email
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"} textAlign="end">
                      No. Permohonan
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color={"white"} textAlign="end">
                      Status
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end" color={"white"}>
                      Aksi
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {dataPermohonan?.map((item, index) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item?.nama}</Table.Cell>
                      <Table.Cell>{item?.asal}</Table.Cell>
                      <Table.Cell>+62 {item?.nomorWA}</Table.Cell>
                      <Table.Cell textAlign="end">{item?.email}</Table.Cell>
                      <Table.Cell textAlign="end">
                        {item?.noPermohonan}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        {item?.status.nama}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ReactPaginate
                  previousLabel={"+"}
                  nextLabel={"-"}
                  pageCount={pages}
                  onPageChange={changePage}
                  activeClassName={"item active "}
                  breakClassName={"item break-me "}
                  breakLabel={"..."}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  marginPagesDisplayed={1}
                  nextClassName={"item next "}
                  pageClassName={"item pagination-page "}
                  pageRangeDisplayed={2}
                  previousClassName={"item previous"}
                />
              </div>
            </Container>
          </Box>
        </Box>
      </motion.div>
    </LayoutAdmin>
  );
}

export default DaftarPermohonan;
