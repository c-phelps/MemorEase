import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, Box, Image, Flex, IconButton, Heading, useDisclosure, Collapse, VStack } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const location = useLocation();
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isOpen, onToggle } = useDisclosure();
  // const toggleMenu = (destination) => {
  //   setIsOpen(!isOpen);
  //   navigate(destination);
  // };

  const logoutUser = (destination) => {
    Auth.logout();
    // setIsOpen(!isOpen);
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

        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ base: "block", md: "none" }}
          onClick={onToggle}
          variant="ghost"
          size="lg"
        />

        <Flex display={{ base: "none", md: "flex" }} bg="accent.500" justify="flex-end">
          <Link
            as={RouterLink}
            to="/decks"
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
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack bg="accent.500" p={4} spacing={3} align="start" display={{ md: "none" }}>
          <Link as={RouterLink} to="/decks" onClick={onToggle} w="100%" size="sm">
            Browse Decks
          </Link>
          <Link as={RouterLink} to="/collection" onClick={onToggle} w="100%" size="sm">
            My Collection
          </Link>
          <Link as={RouterLink} to="/" onClick={() => logoutUser("/")} w="100%" size="sm">
            Log Out
          </Link>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
