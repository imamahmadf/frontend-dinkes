import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Layout from "../Layout";

function PpidLayout({ eyebrow = "PPID", title, description, children, wide = false }) {
  return (
    <Layout>
      <Box bg="var(--page-bg)" minH="70vh">
        <Box bg="#14A75B" color="white" pt={{ base: "88px", md: "104px" }} pb={{ base: 8, md: 10 }}>
          <Container maxW={wide ? "1100px" : "860px"} px={{ base: 4, md: 6 }}>
            <Text
              fontSize="13px"
              fontWeight="700"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color="whiteAlpha.800"
            >
              {eyebrow}
            </Text>
            <Heading
              as="h1"
              mt={2}
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="700"
              lineHeight="1.2"
            >
              {title}
            </Heading>
            {description ? (
              <Text mt={3} maxW="680px" fontSize={{ base: "15px", md: "17px" }} color="whiteAlpha.900">
                {description}
              </Text>
            ) : null}
          </Container>
        </Box>
        <Container maxW={wide ? "1100px" : "860px"} px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }}>
          <Box bg="var(--card)" borderRadius="16px" boxShadow="sm" p={{ base: 4, md: 8 }} color="var(--text)" borderWidth="1px" borderColor="var(--line)">
            {children}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default PpidLayout;
