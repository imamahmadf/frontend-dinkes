import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const BeritaCard = ({ berita }) => {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200?text=Berita";
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
    <Box
      bg="var(--card)"
      color="var(--text)"
      borderWidth="1px"
      borderColor="var(--line)"
      borderRadius="16px"
      overflow="hidden"
      boxShadow="sm"
      h="100%"
      display="flex"
      flexDirection="column"
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
          bg="#14A75B"
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
      <Box p={4} display="flex" flexDirection="column" flex="1">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="var(--heading)"
          mb={2}
          lineClamp={2}
          lineHeight="1.4"
        >
          {berita.judul}
        </Text>
        <Text
          fontSize="sm"
          color="var(--muted)"
          mb={3}
          lineHeight="1.5"
          lineClamp={3}
        >
          {truncateText(berita.ringkasan)}
        </Text>
        <Flex
          mt="auto"
          justify="space-between"
          align="center"
          gap={3}
          fontSize="sm"
          color="var(--muted)"
        >
          <Text>Oleh: {berita.penulis}</Text>
          <Button
            as={RouterLink}
            to={berita.slug ? `/berita/${berita.slug}` : "/daftar-berita-dinkes"}
            size="sm"
            flexShrink={0}
            variant="outline"
            borderColor="#14A75B"
            color="#0E7A45"
            _hover={{ bg: "#14A75B", color: "white" }}
          >
            Baca Selengkapnya
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default BeritaCard;
