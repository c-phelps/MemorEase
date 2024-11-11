import { useState } from "react";
import { useMutation } from "@apollo/client";
import { arrTopics } from "../utils/helpers.js";
import { Box, Heading, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";

import Auth from "../utils/auth";
// mutations for our creation operations
import { ADD_DECK_TO_USER, CREATE_DECK } from "../utils/mutations";

const DeckForm = ({ onComplete }) => {
  const [formState, setFormState] = useState({
    topic: "",
    deckname: "",
  });
  // get user id
  const userId = Auth.getUser()._id;

  // mutations for createDeck and addDeckToUser
  const [createDeck, { error_Create }] = useMutation(CREATE_DECK);
  const [addToDeckUser, { error_Add }] = useMutation(ADD_DECK_TO_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createDeck({
        variables: { ...formState },
      });
      // retrieve the new deck id
      const newDeckId = data.createDeck._id;
      const newDeckName = data.createDeck.deckname;

      await addToDeckUser({
        variables: { userId: userId, deckId: newDeckId },
      });
      setFormState({
        topic: "",
        deckname: "",
      });
      onComplete(newDeckId, newDeckName);
    } catch (err) {
      console.error("An error occurred while creating the deck.");
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
        Create a Deck
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id="topic" isRequired>
          <FormLabel color="text.500">Choose a Topic</FormLabel>
          <Select name="topic" focusBorderColor="accent.500" onChange={handleChange}>
            {arrTopics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="deckname" isRequired mb={4}>
          <FormLabel color="text.500">Title</FormLabel>
          <Input placeholder="Enter title" name="deckname" focusBorderColor="accent.500" onChange={handleChange} />
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
          Create Deck
        </Button>
      </form>
    </Box>
  );
};

export default DeckForm;
