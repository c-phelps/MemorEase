import { useState } from "react";
import { useMutation } from "@apollo/client";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Box, Button, Container, Heading, Input, Stack, Text, Image } from "@chakra-ui/react";

function Login(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { username: formState.username, password: formState.password },
      });

      const token = data.login.token;
      Auth.login(token);
      navigate("/decks");
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box
      bg="background.500" // Soft White background color
      color="text.500" // Gunmetal text color for general text
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
          Login
        </Heading>
        <Text fontSize="lg" mb={4}>
          Login to manage your decks and start studying!
        </Text>
        <Box bg="white" p={8} borderRadius="md" shadow="lg" maxW="400px" w="full">
          <Stack spacing={4}>
            <Input
              placeholder="Enter your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
              focusBorderColor="accent.500"
              bg="background.500"
            />
            <Input
              placeholder="Enter your password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              focusBorderColor="accent.500"
              bg="background.500"
            />
            {error && <Text color="red.500">{error.message}</Text>}
            <Button colorScheme="accent" size="lg" onClick={handleFormSubmit} width="full">
              Login
            </Button>
            <Link to="/signup">Don't have an account? Sign up here.</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
