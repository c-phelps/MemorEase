import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Spacer,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  ListItem,
  UnorderedList,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { DECKS_BY_USER } from "../utils/queries";
import Deckform from "../components/Deckform";

const Collection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(); // Create a history instance
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      setIsAuthenticated(false);
      navigate("/");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const user = Auth.getUser();

  if (!user) {
    return <Text>Loading user data...</Text>; // Show loading message or spinner
  }

  const { loading, error, data } = useQuery(DECKS_BY_USER, {
    variables: { userByIdId: user?._id },
    skip: !user,
  });

  const decksByUser = data?.userByID.decks || [];
  return (
    <Box width="100%" px={4}>
      <Box width="100%" id="flexHeader">
        <Flex align="center" width="100%">
          <Heading size="lg" mx="auto" textAlign="center">
            Your Collection
          </Heading>
          <Spacer />
          <Button colorScheme="teal" onClick={onOpen}>
            Create New Deck
          </Button>
        </Flex>
      </Box>

      <Box id="populateDecks" mt={4}>
        {loading && <Text>Loading...</Text>}

        <Heading size="md" mb={2}>
          {user.username}'s Decks:
        </Heading>

        <Flex justify="start">
          <Box p={2}>
            <UnorderedList styleType="none">
              {decksByUser.map((deck) => (
                <ListItem mb={2} key={deck._id}>
                  <Button as={Link} to={`/decks/${deck._id}`} width="full">
                    {deck.deckname}
                  </Button>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
              {/* chakra ui to hold the modal for deck creation form */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Create Deck</ModalHeader> */}
          <ModalBody>
            <Deckform />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Collection;
