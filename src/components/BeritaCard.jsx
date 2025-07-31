import React from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BeritaCard = ({ berita, index }) => {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200?text=Berita";
  };

  const handleReadMore = () => {
    // TODO: Implementasi navigasi ke halaman detail berita
    console.log("Buka berita:", berita.id);
  };

  // Fungsi untuk membersihkan HTML tags
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Fungsi untuk memotong teks
  const truncateText = (text, maxLength = 150) => {
    const cleanText = stripHtml(text);
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
      }}
    >
      <Box position="relative">
        <Image
          src={`${import.meta.env.VITE_API_URL || "http://localhost:7000/api"}${
            berita.foto
          }`}
          alt={berita.judul}
          width="100%"
          height="200px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/400x200?text=Berita"
          onError={handleImageError}
        />
        <Box
          position="absolute"
          top={2}
          left={2}
          bg="blue.500"
          color="white"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
        >
          {berita.temaBerita?.tema || "Berita"}
        </Box>
      </Box>
      <Box p={4}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gray.800"
          mb={2}
          noOfLines={2}
          lineHeight="1.4"
        >
          {berita.judul}
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
          mb={3}
          lineHeight="1.5"
          noOfLines={3}
        >
          {truncateText(berita.ringkasan)}
        </Text>
        <Flex
          justify="space-between"
          align="center"
          fontSize="sm"
          color="gray.500"
        >
          <Text>Oleh: {berita.penulis}</Text>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={handleReadMore}
          >
            Baca Selengkapnya
          </Button>
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default BeritaCard;
