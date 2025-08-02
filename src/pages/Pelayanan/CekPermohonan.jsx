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
  Textarea,
  Dialog,
  Portal,
  CloseButton,
  Group,
} from "@chakra-ui/react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import * as Yup from "yup";
import api from "../../utils/api";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import axios from "axios";
// Schema validasi

function CekPermohonan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [noPermohonan, setNoPermohonan] = useState("");
  const [hasil, setHasil] = useState(null);
  const cekStatus = (val) => {
    console.log(val);
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_URL
        }/permohonan/get/status?&noPermohonan=${val}`
      )
      .then((res) => {
        console.log(res.data, "DATASEEED");
        setHasil(res.data.result);
        setIsOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setIsOpen(true);
        setModalMessage("data tidak ditemukan");
      });
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
                  CEK STATUS PERMOHONAN
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
              <Center flexDirection={"column"}>
                <Heading mb={"30px"} fontSize={"35px"} textAlign="center">
                  Form Permohonan Informasi
                </Heading>
                <Text
                  fontSize={"18px"}
                  textAlign={"center"}
                  mb={"40px"}
                  color="gray.600"
                >
                  Silakan isi form di bawah ini untuk mengajukan permohonan
                  informasi
                </Text>{" "}
                <Box w={"80%"}>
                  <InputGroup flex="1" startElement={<BsSearch />}>
                    <Input
                      height={"60px"}
                      placeholder="Cari Status Permohonan"
                      value={noPermohonan}
                      onChange={(e) => setNoPermohonan(e.target.value)}
                    />
                  </InputGroup>
                  <Button
                    mt={"30px"}
                    w={"100%"}
                    onClick={() => {
                      cekStatus(noPermohonan);
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Center>
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
                <Text>{modalMessage}</Text>
                {/* <Text>{JSON.stringify(hasil)}</Text> */}
                {modalMessage ? null : (
                  <>
                    {" "}
                    <Text>Alasan: {hasil?.alasan}</Text>
                    <Text>nomor: {hasil?.noPermohonan}</Text>
                    <Text>status: {hasil?.status?.nama}</Text>
                    <Text>
                      Alasan Keberatan: {hasil?.keberatans[0]?.alasan}
                    </Text>
                  </>
                )}
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

export default CekPermohonan;
