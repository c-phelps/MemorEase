import { useEffect, useState } from "react";
import { Box, Button, Center, Container, Heading, Image, Stack, Text, Flex, Link } from "@chakra-ui/react";
// import { Container, Row, Col, Button, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  return (
    <Box
      bg="background.500" // Soft White background color
      color="text.500" // Gunmetal text color
      minH="100vh"
      py={2}
      px={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="100%" centerContent>
        <Box pos="absolute" top="50" left="70">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" boxSize="40px" objectFit="contain" />
          </Link>
        </Box>

        <Center minH="100vh">
          <Stack spacing={8} align="center" textAlign="center">
            <Box
              width="100%"
              bg="primary.500"
              height="100%"
              minH="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading as="h2" color="background.500" size="3xl" textAlign="center">
                Welcome to MemorEase
              </Heading>
            </Box>
            <Flex width="100%" direction={{ base: "column", md: "row" }} align="center">
              <Box flex="1" p={4} mr={{ base: 0, md: 8 }}>
                <Text fontSize="lg" mt={4} textAlign="left" color="text.500">
                  MemorEase is an online learning tool designed to help users study and retain information by creating
                  and reviewing digital flashcards. Users can quickly create flashcards with questions, terms, or
                  concepts on one side and corresponding answers or explanations on the other. Users can organize cards
                  into decks for easy navigation. This helps learners structure their study materials for efficient
                  review. MemorEase is accessible on desktop and soon will be available on mobile devices, making it
                  easy to study anytime, anywhere!
                </Text>
              </Box>
              <Box flex="1" p={4}>
                {/* example image for now */}
                <Image
                  src="/Landingpage.png"
                  alt="Studying image"
                  objectFit="cover"
                  borderRadius="lg"
                  shadow="lg"
                  maxH="500px"
                />
              </Box>
            </Flex>
            <Flex direction="column" alignItems="flex-end" width="100%">
              <Box>
                {isLoggedIn ? (
                  <Button
                    colorScheme="accent"
                    onClick={() => navigate("/decks")}
                    size="xl"
                    fontSize="lg"
                    padding="18px 24px"
                    mr="200px"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    bg="primary.500"
                    borderColor="primary.500"
                    size="xl"
                    fontSize="lg"
                    padding="18px 24px"
                    _hover={{ bg: "accent.500", color: "background.500" }}
                    onClick={() => navigate("/signup")}
                    mr="200px"
                  >
                    Get Started
                  </Button>
                )}
              </Box>
            </Flex>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};

export default Home;
