import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { arrTopics } from "../utils/helpers.js";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

import { ADD_DECK } from '../../utils/mutations';
import { QUERY_DECKS } from '../../utils/queries';

const DeckForm = () => {
  const [formState, setFormState] = useState({
    topic: '',
    deckname: '',
  });

  const [addDeck, { error }] = useMutation(ADD_DECK, {
    refetchQueries: [
      QUERY_DECKS,
      'getDecks'
    ]
  });


 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createDeck({
        variables: { ...formState },
      });
      await addDeck({
        variables: { userId: }
      })
      setFormState({
        topic: '',
        deckname: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'topic' && name === 'deckname') {
      setFormState({ ...formState, [name]: value });
      
    } else  {
      alert ("Please select a topic and Title");
    }
  };

    return (
        <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="background.500"
      >
      <Heading mb={6} textAlign="center" fontSize="2xl" color="primary.500">
        Create a study deck with topic and title
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id="topic" isRequired>
          <FormLabel color="text.500">Choose a Topic</FormLabel>
          <Select placeholder="Select a topic" focusBorderColor="accent.500">
             {arrTopics.map((topic) => (
                <option>
                  {topic}
                </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="deckname" isRequired mb={4}>
          <FormLabel color="text.500">Title</FormLabel>
          <Input placeholder="Enter title" focusBorderColor="accent.500" />
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
    )
}

export default Decks;