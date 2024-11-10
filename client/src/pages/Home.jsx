import { useEffect, useState } from "react";
import { Box, Button, Center, Container, Heading, Image, Stack, Text, Flex } from "@chakra-ui/react";
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
      py={12}
      px={6}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="80%" centerContent>
        <Box pos="absolute" top="5" left="5">
          <Image src="/path/to/logo.png" alt="Logo" boxSize="80px" />
        </Box>

        <Center minH="100vh">
          <Stack spacing={8} align="center" textAlign="center">
            <Box>
              <Heading as="h2" color="primary.500" size="2xl">
                Welcome to MemorEase
              </Heading>
            </Box>
            <Flex
              width="100%"
              direction={{ base: 'column', md: 'row' }}
              align="center"
            >
              <Box flex="1" p={4} mr={{ base: 0, md: 8 }}>
                <Text fontSize="lg" mt={4} textAlign="left" color="text.500">
                  MemorEase is an online learning tool designed to help users
                  study and retain information by creating and reviewing digital
                  flashcards. Users can quickly create flashcards with
                  questions, terms, or concepts on one side and corresponding
                  answers or explanations on the other. Users can organize cards
                  into decks for easy navigation. This helps learners structure
                  their study materials for efficient review. MemorEase is
                  accessible on desktop and soon will be available on mobile
                  devices, making it easy to study anytime, anywhere!
                </Text>
              </Box>
              <Box flex="1" p={4}>
                {/* example image for now */}
                <Image
                  src="/path/to/image.jpg"
                  alt=""
                  boxSize="300px"
                  objectFit="cover"
                  borderRadius="lg"
                  shadow="lg"
                />
              </Box>
            </Flex>

            <Box>
              {isLoggedIn ? (
                <Button
                  colorScheme="accent"
                  size="lg"
                  onClick={() => navigate('/decks')}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="outline"
                  color="primary.500"
                  borderColor="primary.500"
                  _hover={{ bg: 'accent.500', color: 'background.500' }}
                  onClick={() => navigate('/signup')}
                >
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
