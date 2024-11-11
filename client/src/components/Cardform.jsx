// CJP 11/8 added a lot of functionality to the card creation form
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CREATE_CARD, ADD_CARD_TO_DECK } from "../utils/mutations";

const CardCreationModal = ({ deckId, deckName, onComplete }) => {
  // the three useStates for the card fields from the form
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [link, setLink] = useState("");

  // states to handle modal to ask user if they would like to add another card
  const [showCardForm, setShowCardForm] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // mutation for creating individual card
  const [createCard, { error_Create }] = useMutation(CREATE_CARD);
  // mutation to add an array of cards to the deck passed in the prop
  const [addCardToDeck, { error_Add }] = useMutation(ADD_CARD_TO_DECK);
  // array of cardIds that will be added to the deck above
  const [cardIds, addCards] = useState([]);
  // function to add a new cardId to the array of existing cardIds in the cardIds array
  const addCardId = (newCardId) => {
    addCards((arrCardIds) => [...arrCardIds, newCardId]);
  };

  // handle card creation form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // create the card with the variables
    const { data } = await createCard({ variables: { question, answer, link } });
    // get the createdId
    const createdId = data.createCard._id;
    // add the createdId to the array of cardIds
    addCardId(createdId);
    // hide the cardform and show the yes/no modal
    setShowCardForm(false);
    setShowConfirmModal(true);
  };

  // yes is hit, clear the form and reshowCardForm
  const handleYes = () => {
    setQuestion("");
    setAnswer("");
    setLink("");
    setShowCardForm(true);
    setShowConfirmModal(false);
  };

  // no is hit, add the current cardIds to the deckId
  const handleNo = async () => {
    const { data } = await addCardToDeck({ variables: { deckId: deckId, cards: cardIds } });
    // return to parent
    setShowConfirmModal(false);
    onComplete();
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" bg="background.500">
      {/* if showCardForm is true (true by default) then show the card form with fields to enter */}
      {showCardForm && (
        <form onSubmit={handleSubmit}>
          <Heading mb={6} textAlign="center" fontSize="2xl" color="primary.500">
            Create cards
          </Heading>
          <FormControl mb={4}>
            <FormLabel color="#263238">Deck Title</FormLabel>
            <Input value={deckName} isReadOnly bg="#90A4AE" color="white" />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel color="#263238">Question</FormLabel>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
              bg="white"
              color="#263238"
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel color="#263238">Answer</FormLabel>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              bg="white"
              color="#263238"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#263238">Link to Answer (Optional)</FormLabel>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter link"
              bg="white"
              color="#263238"
            />
          </FormControl>
          <Button
            mt={6}
            colorScheme="primary"
            bg="primary.500"
            color="background.500"
            width="full"
            type="submit"
            _hover={{ bg: "primary.600" }}
          >
            Add to Deck
          </Button>
        </form>
      )}

      <Modal isOpen={showConfirmModal} onClose={handleNo}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Card Added</ModalHeader>
          <ModalBody>
            <p>Would you like to add another card?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleYes} mr={3}>
              Yes
            </Button>
            <Button variant="red" onClick={handleNo}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CardCreationModal;
