import { useState } from "react";
import { Box, Button, Center, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (location) => {
    setIsOpen(!isOpen);
    navigate(location)
  };
  const logoutUser = () => {
    Auth.logout();
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={3}>
      <Flex align="center" maxW="1200px" mx="auto">
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MemorEase</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon"></span>
      </div>
       {/* Spacer to push items to the right */}
      <Spacer />

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Flex gap={3}>
         <Button colorScheme="blue" onClick={() => toggleMenu("/decks")}>
          Decks
         </Button>
        <Button colorScheme="teal" onClick={() => toggleMenu("/collection")}>
          Collection
        </Button>
        <Button colorScheme="blue" onClick={() => toggleMenu("/home")}>
          Log Out 
        </Button>
        </Flex>
      </div>
    </nav>
  </Flex>
</Box>
  );
};

export default Navbar;
