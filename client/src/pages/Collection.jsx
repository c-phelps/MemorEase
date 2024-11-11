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
  IconButton,
  ModalBody,
  ModalFooter,
  Text,
  ListItem,
  UnorderedList,
  Flex,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { DECKS_BY_USER } from "../utils/queries";
import { DELETE_DECK } from "../utils/mutations";
import Deckform from "../components/Deckform";
import Cardform from "../components/Cardform";
import Editdeckform from "../components/Editdeckform";

const Collection = () => {
  const navigate = useNavigate(); // Create a history instance

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [deckId, setDeckId] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [isDeckComplete, setDeckComplete] = useState(false);

  const [editDeckTopic, setEditDeckTopic] = useState(null);
  const [editDeckId, setEditDeckId] = useState(null);
  const [editDeckName, setEditDeckName] = useState(null);
  const [isDeckEdit, setDeckEdit] = useState(false);

  const [deleteDeckCheck, setDeleteDeckCheck] = useState(false);
  const [deleteDeckId, setDeleteDeckId] = useState(null);
  const [deleteDeck, { error_Delete }] = useMutation(DELETE_DECK, {
    refetchQueries: [{ query: DECKS_BY_USER }],
  });

  const handleDeckCompelte = (newDeckId, newDeckName) => {
    setDeckId(newDeckId);
    setDeckName(newDeckName);
    setDeckComplete(true);
    onClose();
  };

  const openEditModal = (newEditID, newEditName, newEditTopic) => {
    setEditDeckId(newEditID);
    setEditDeckName(newEditName);
    setEditDeckTopic(newEditTopic);
    setDeckEdit(true);
  };

  const resetFormState = () => {
    setDeckId(null);
    setDeckName("");
    setDeckComplete(false);
    refetch();
  };

  const resetEdit = () => {
    setEditDeckTopic(null);
    setEditDeckName(null);
    setEditDeckId(null);
    setDeckEdit(false);
  };

  // verify user wants to delete the deck via modal setDeleteCheckTrue
  const handleDeleteCheck = (deleteDeckId) => {
    setDeleteDeckId(deleteDeckId);
    setDeleteDeckCheck(true);
  };

  // delete the deck and reset the useStates to default
  const handleDeleteDeck = async () => {
    try {
      const { data } = await deleteDeck({
        variables: { deckId: deleteDeckId },
        refetchQueries: [{ query: DECKS_BY_USER }],
      });
      refetch();
    } catch (error) {
      console.error("An issue occurred while deleting deck", error);
    }
    setDeleteDeckId(null);
    setDeleteDeckCheck(false);
  };

  // reset the useStates to default without handling delete
  const closeDeleteCheck = () => {
    setDeleteDeckId(null);
    setDeleteDeckCheck(false);
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

  const { loading, error, data, refetch } = useQuery(DECKS_BY_USER, {
    variables: { userByIdId: user?._id },
    skip: !user,
  });

  const decksByUser = data?.userByID.decks || [];
  return (
    <Box
      bg="background.500"
      border="1px solid"
      borderColor="secondary.500"
      borderRadius="md"
      p={6}
      color="text.500"
      boxShadow="md"
      height="100%"
      minH="100vh"
      maxW="100vw"
    >
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
                      <Text size="sm" display="inline" whiteSpace="nowrap">
                        {deck.topic}:
                      </Text>
                      <Spacer />
                      <Text size="sm" display="inline" ml={1}>
                        {deck.cardsCount}
                      </Text>
                      <Text size="sm" display="inline" ml={1}>
                        cards
                      </Text>
                      <Tooltip label="Edit Deck" aria-label="Edit Deck Tooltip">
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => openEditModal(deck._id, deck.deckname, deck.topic)}
                          variant="ghost"
                          aria-label="Edit Deck"
                          ml={2}
                        />
                      </Tooltip>
                      <Tooltip label="Delete Deck" aria-label="Delete Deck Tooltip">
                        <IconButton
                          icon={<DeleteIcon />}
                          onClick={() => handleDeleteCheck(deck._id)}
                          variant="red"
                          aria-label="Delete Deck"
                          ml={2}
                        />
                      </Tooltip>
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
      <Modal isOpen={isDeckEdit} onClose={resetEdit} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Editdeckform deckId={editDeckId} deckName={editDeckName} topic={editDeckTopic} onComplete={resetEdit} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={resetEdit}>
              Cancel and close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={deleteDeckCheck} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Deck?</ModalHeader>
          <ModalBody>Are you sure you want to delete the deck?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={closeDeleteCheck}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteDeck} ml={3}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Collection;
