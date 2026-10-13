import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

function AdminPage({ title, description, action, children }) {
  return (
    <Container maxW="1100px" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "stretch", sm: "center" }}
        gap={3}
        mb={5}
      >
        <Box>
          <Heading as="h1" fontSize={{ base: "24px", md: "30px" }} lineHeight="1.2">
            {title}
          </Heading>
          {description ? (
            <Text mt={2} color="var(--muted)" fontSize="15px">
              {description}
            </Text>
          ) : null}
        </Box>
        {action}
      </Flex>
      <Box
        bg="var(--card)"
        color="var(--text)"
        borderRadius="16px"
        borderWidth="1px"
        borderColor="var(--line)"
        boxShadow="sm"
        p={{ base: 4, md: 6 }}
      >
        {children}
      </Box>
    </Container>
  );
}

export function AdminPager({ page, pages, onChange }) {
  if (!pages || pages <= 1) return null;

  return (
    <Flex mt={6} align="center" justify="space-between" gap={3}>
      <Button
        variant="outline"
        borderColor="#14A75B"
        color="#0E7A45"
        disabled={page <= 0}
        onClick={() => onChange(Math.max(0, page - 1))}
      >
        Sebelumnya
      </Button>
      <Text fontSize="14px" color="var(--muted)">
        Halaman {page + 1} dari {pages}
      </Text>
      <Button
        variant="outline"
        borderColor="#14A75B"
        color="#0E7A45"
        disabled={page + 1 >= pages}
        onClick={() => onChange(page + 1)}
      >
        Berikutnya
      </Button>
    </Flex>
  );
}

export default AdminPage;
