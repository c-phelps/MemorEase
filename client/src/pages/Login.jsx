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
    } catch (e) {
      console.error(e);
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
    <Box bg="black" color="white" minH="100vh" display="flex" alignItems="center">
      <Container maxW="container.sm" centerContent>
        <Image src="/logo.png" alt="Logo" boxSize="100px" mb={8} />
        <Heading as="h2" size="xl" mb={4}>
          Login
        </Heading>
        <Text fontSize="lg" mb={4}>
          Login to manage your decks and start studying!
        </Text>
        <Box bg="gray.800" p={6} borderRadius="md" boxShadow="lg" width="full">
          <Stack spacing={4}>
            <Input
              placeholder="Username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
              variant="flushed"
              borderColor="gray.600"
              color="white"
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              variant="flushed"
              borderColor="gray.600"
              color="white"
            />
            {error && <Text color="red.500">The provided credentials are incorrect.</Text>}
            <Button colorScheme="teal" onClick={handleFormSubmit} width="full">
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
