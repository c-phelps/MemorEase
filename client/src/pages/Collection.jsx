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
import Cardform from "../components/Cardform";

const Collection = () => {
  const navigate = useNavigate(); // Create a history instance

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [deckId, setDeckId] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [isDeckComplete, setDeckComplete] = useState(false);

  const handleDeckCompelte = (newDeckId, newDeckName) => {
    setDeckId(newDeckId);
    setDeckName(newDeckName);
    setDeckComplete(true);
    onClose();
  };

  const resetFormState = () => {
    setDeckId(null);
    setDeckName("");
    setDeckComplete(false);
  };

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
    <Box width="100%" px={4} minH="100vh">
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
                  <Flex align="center" width="full" justify="space-between">
                    <Button as={Link} to={`/decks/${deck._id}`} width="full">
                      {deck.deckname}
                    </Button>
                    <Flex align="center" ml={2}>
                      <Text size="sm" display="inline">
                        {deck.cardsCount}
                      </Text>
                      <Text size="sm" display="inline" ml={1}>
                        cards
                      </Text>
                    </Flex>
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
      {/* chakra ui to hold the modal for deck creation form */}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Deckform onComplete={handleDeckCompelte} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* deck creation complete and a deckId is returned then show the card creation modal */}
      {isDeckComplete && deckId && (
        <Modal isOpen={isDeckComplete} onClose={resetFormState} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Cardform deckId={deckId} deckName={deckName} onComplete={resetFormState} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={resetFormState}>
                Done Adding Cards
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Collection;
