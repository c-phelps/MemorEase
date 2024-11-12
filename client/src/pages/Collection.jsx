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
      <Flex align="center" justify="space-between" wrap="wrap" mb={4}>
        <Heading size="lg" textAlign={{ base: "center", md: "left" }}>
          Your Collection
        </Heading>
        <Button colorScheme="teal" onClick={onOpen} size="lg">
          Create New Deck
        </Button>
      </Flex>

      <Box>
        {loading && <Text>Loading...</Text>}

        <Heading size="md" mb={2}>
          {user.username}'s Decks:
        </Heading>

        <UnorderedList styleType="none" m={0} p={0}>
          {decksByUser.map((deck) => (
            <ListItem key={deck._id} mb={3}>
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="space-between"
                p={3}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                bg="white"
                _hover={{ bg: "gray.50" }}
              >
                <Button
                  as={Link}
                  to={`/decks/${deck._id}`}
                  flex="1"
                  textAlign="left"
                  variant="outline"
                  bg="#90A4AE"
                  _hover={{ bg: "#5C6BC0" }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {deck.deckname}
                  <Text as="span" fontSize="sm" color="gray.600">
                    ({deck.topic})
                  </Text>
                </Button>
                <Flex mt={{ base: 2, md: 0 }} ml={{ md: 3 }} align="center">
                  <Text fontSize="sm">{deck.cardsCount} cards</Text>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => openEditModal(deck._id, deck.deckname, deck.topic)}
                    aria-label="Edit Deck"
                    ml={2}
                    size="sm"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteCheck(deck._id)}
                    aria-label="Delete Deck"
                    ml={2}
                    size="sm"
                  />
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
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
