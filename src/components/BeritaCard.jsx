import React, { useState, useEffect } from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BeritaCard = ({ berita, index }) => {
  const [isVisible, setIsVisible] = useState(false);
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
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Trigger animasi ketika user scroll ke bagian atas (dalam 200px dari atas)
      if (scrollTop < 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Set initial state
    setIsVisible(true);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        delay: index * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      bg="white"
      borderRadius="0px"
      overflow="hidden"
      boxShadow="md"
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        y: -8,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        },
      }}
      cursor="pointer"
    >
      <Box position="relative">
        <Image
          src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${berita.foto}`}
          alt={berita.judul}
          width="100%"
          height="200px"
          objectFit="cover"
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
