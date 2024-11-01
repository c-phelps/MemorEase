import { Box, Button, Container, Heading, Input, Stack, Text, Image } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signing up with:", { username, email, password });
  };

  return (
    <Box bg="black" color="white" minH="100vh" display="flex" alignItems="center">
      <Container maxW="container.sm" centerContent>
        <Image src="/path/to/logo.png" alt="Logo" boxSize="100px" mb={8} /> {/* example Logo as of now */}

        <Heading as="h2" size="xl" mb={4}>
          Sign in Page
        </Heading>
        <Text fontSize="lg" mb={4}>
          Have the option for sign in or sign up
        </Text>

        <Box 
          bg="gray.800" 
          p={6} 
          borderRadius="md" 
          boxShadow="lg"
          width="full"
        >
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
            <Button 
              colorScheme="teal" 
              onClick={handleSignup} 
              width="full"
            >
              Login/Signup Button
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
