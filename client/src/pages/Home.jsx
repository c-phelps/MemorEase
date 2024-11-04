import { useEffect, useState } from "react";
import { Box, Button, Center, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";
// import { Container, Row, Col, Button, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  console.log("Home component loaded");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Container maxW="container.md" centerContent>
        <Box pos="absolute" top="5" left="5">
          <Image src="/path/to/logo.png" alt="Logo" boxSize="80px" />
        </Box>

        <Center minH="100vh">
          <Stack spacing={8} align="center" textAlign="center">
            <Box>
              <Heading as="h2" size="xl">
                Welcome to MemorEase
              </Heading>
              <Text fontSize="lg" mt={4}>
                Quickly create flashcards to study and retain information with ease!
              </Text>
            </Box>

            {/* example image for now */}
            <Image src="/path/to/image.jpg" alt="" boxSize="300px" objectFit="cover" borderRadius="lg" shadow="lg" />

            <Box>
              {isLoggedIn ? (
                <Button colorScheme="blue" onClick={() => navigate("/dashboard")}>
                  Continue
                </Button>
              ) : (
                <Button colorScheme="teal" onClick={() => navigate("/login")}>
                  Get Started
                </Button>
              )}
            </Box>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default Home;
