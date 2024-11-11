import { useState } from "react";
import { Link, Box, Image, Flex, Heading } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (destination) => {
    setIsOpen(!isOpen);

    navigate(destination);
  };

  const logoutUser = (destination) => {
    Auth.logout();
    setIsOpen(!isOpen);
    navigate(destination);
  };

  return (
    <Box bg="primary.500" color="background.500" py={4} px={8} shadow="md">
      <Flex align="center" justify="space-between" mx="auto" id="flexStart">
        <Flex align="center" gap={3}>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" boxSize="40px" objectFit="contain" />
          </Link>
          <Heading as="h1" size="lg" fontWeight="bold">
            MemorEase
          </Heading>
        </Flex>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </div>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Flex bg="accent.500" justify="flex-end">
            <Link
              as={RouterLink}
              to="/decks"
              onClick={() => toggleMenu("/decks")}
              textAlign="center"
              p={2}
              bg={location.pathname === "/decks" ? "primary.500" : "transparent"}
              borderTop={location.pathname === "/decks" ? "3px solid black" : "none"}
              borderRight={location.pathname === "/decks" ? "3px solid black" : "none"}
              borderLeft={location.pathname === "/decks" ? "3px solid black" : "none"}
              borderBottom={location.pathname === "/decks" ? "none" : "3px solid black"}
            >
              Browse Decks
            </Link>
            <Link
              as={RouterLink}
              to="/collection"
              onClick={() => toggleMenu("/collection")}
              textAlign="center"
              p={2}
              bg={location.pathname === "/collection" ? "primary.500" : "transparent"}
              borderTop={location.pathname === "/collection" ? "3px solid black" : "none"}
              borderRight={location.pathname === "/collection" ? "3px solid black" : "none"}
              borderLeft={location.pathname === "/collection" ? "3px solid black" : "none"}
              borderBottom={location.pathname === "/collection" ? "none" : "3px solid black"}
            >
              My Collection
            </Link>
            <Link
              as={RouterLink}
              to="/"
              onClick={() => logoutUser("/")}
              textAlign="center"
              p={2}
              borderBottom="3px solid black"
            >
              Log Out
            </Link>
          </Flex>
        </div>
      </Flex>
    </Box>
  );
};

export default Navbar;
