// edit deck modal
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { arrTopics } from "../utils/helpers.js";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import Cardform from "./Cardform";
import Auth from "../utils/auth.js";
// mutations for our creation operations
import { EDIT_DECK } from "../utils/mutations.js";

const EditDeck = ({ deckId, deckName, topic, onComplete }) => {
  const [formState, setFormState] = useState({
    topic: topic || "",
    deckname: deckName || "",
  });
  // get user id]
  const userId = Auth.getUser()._id;

  // logic for adding cards to deck/showing add cards modal
  const [isDeckComplete, setDeckComplete] = useState(false);
  const handleAdd = () => {
    setDeckComplete(true);
  };
  const resetFormState = () => {
    setDeckComplete(false);
  };

  // mutation for editDeck
  const [editDeck, { error_Create }] = useMutation(EDIT_DECK);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await editDeck({
        variables: { deckId: deckId, deckname: formState.deckname, topic: formState.topic },
      });
      // retrieve the new deck id
      const newDeckId = data.editDeck._id;
      const newDeckName = data.editDeck.deckname;

      setFormState({
        topic: "",
        deckname: "",
      });
      console.log(newDeckId, newDeckName);
      onComplete(newDeckId, newDeckName);
    } catch (err) {
      console.error("An error occurred while editing the deck.");
      console.error(err);
    }
  };

  // adjust formstate on element change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" bg="background.500">
      <Heading mb={6} textAlign="center" fontSize="2xl" color="primary.500">
        Edit deck: {deckName}
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id="topic" isRequired>
          <FormLabel color="text.500">Choose a Topic</FormLabel>
          <Select name="topic" focusBorderColor="accent.500" onChange={handleChange} value={formState.topic}>
            {arrTopics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="deckname" isRequired mb={4}>
          <FormLabel color="text.500">Title</FormLabel>
          <Input
            placeholder="Enter title"
            name="deckname"
            focusBorderColor="accent.500"
            onChange={handleChange}
            value={formState.deckname}
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
          Done Editing Deck
        </Button>

        <Button colorScheme="green" width="full" alignSelf="center" onClick={handleAdd}>
          Add cards to deck?
        </Button>
      </form>

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
    </Box>
  );
};

export default EditDeck;
