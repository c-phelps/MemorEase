import { Box, Button, Container, Heading, Input, Stack, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [addUser, { mutationError, data }] = useMutation(ADD_USER);
  const [error, setError] = useState(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError({ message: "All fields are required!" });
      console.error("All fields are required!");
      return;
    }

    if (password.length < 5) {
      setError({ message: "Password must be atleast 5 characters!" });
      console.error("Password must be atleast 5 characters!");
      return;
    }

    if (!emailRegex.test(email)) {
      setError({ message: "Please enter a valid email address." });
      console.error("Please enter a valid email address.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });

      const token = data.addUser.token;
      Auth.login(token);

      navigate("/decks");
    } catch (err) {
      setError({ message: "An error occurred while adding the user." });
      // console.error("Mutation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg="background.500" // Soft White background color
      color="text.500" // Gunmetal text color for general text
      height="100%"
      minH="100vh"
      py={12}
      px={6}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box pos="absolute" top="5" left="5">
        <Link to="/">
          <Image src="/logo.png" alt="Logo" boxSize="40px" objectFit="contain" />
        </Link>
      </Box>
      <Container maxW="container.sm" centerContent>
        <Heading as="h2" size="xl" mb={4} color="primary.500" textAlign="center">
          Signup
        </Heading>
        <Text fontSize="lg" mb={4}>
          Signup to start creating decks and study today!
        </Text>
        <Box bg="white" p={8} borderRadius="md" shadow="lg" maxW="400px" w="full">
          <Stack spacing={6} align="stretch">
            <Input
              focusBorderColor="accent.500"
              placeholder="Enter your username"
              bg="background.500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              focusBorderColor="accent.500"
              placeholder="Enter your email"
              bg="background.500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              focusBorderColor="accent.500"
              placeholder="Enter your password"
              bg="background.500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Text color="red.500">{error.message}</Text>}
            {mutationError && <Text color="red.500">{mutationError.error.message}</Text>}
            <Button colorScheme="accent" size="lg" mt={4} onClick={handleSignup} width="50" isLoading={isLoading}>
              Signup!
            </Button>
            <Link to="/login">Already a user? Login instead!</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
