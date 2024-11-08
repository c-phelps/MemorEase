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

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleSignup = async () => {
    setIsLoading(true);
    if (!username || !email || !password) {
      setIsLoading(false);
      alert("All fields are required!");
      return;
    }
    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
      const token = data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
    navigate("/decks");
    setIsLoading(false);
  };

  return (
    <Box bg="black" color="white" minH="100vh" display="flex" alignItems="center">
      <Container maxW="container.sm" centerContent>
        <Image src="/path/to/logo.png" alt="Logo" boxSize="100px" mb={8} /> {/* example Logo as of now */}
        <Heading as="h2" size="xl" mb={4}>
          Signup
        </Heading>
        <Text fontSize="lg" mb={4}>
          Signup to start creating decks and study today!
        </Text>
        <Box bg="gray.800" p={6} borderRadius="md" boxShadow="lg" width="full">
          <Stack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="flushed"
              borderColor="gray.600"
              color="white"
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="flushed"
              borderColor="gray.600"
              color="white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="flushed"
              borderColor="gray.600"
              color="white"
            />
            {error && <Text color="red.500">{error.message}</Text>}
            <Button colorScheme="teal" onClick={handleSignup} width="50" isLoading={isLoading}>
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
