import { useState } from "react";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (location) => {
    setIsOpen(!isOpen);

    navigate(location);
  };

  const logoutUser = (location) => {
    Auth.logout();
    setIsOpen(!isOpen);
    navigate(location);
  };

  return (
    <Box bg="primary.500" color="background.500" py={4} px={8} shadow="md">
      <Flex align="center" maxW="1200px" mx="auto">
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">MemorEase</Link>
          </div>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="navbar-toggle-icon"></span>
          </div>
          <Spacer />

          <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <Flex gap={3}>
              <Button
                onClick={() => toggleMenu('/decks')}
              >
                Browse Decks
              </Button>
              <Button
                onClick={() => toggleMenu('/collection')}
              >
                My Collection
              </Button>
              <Button
                onClick={() => logoutUser('/')}
              >
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
