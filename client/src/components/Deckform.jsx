<<<<<<< HEAD
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

=======
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { arrTopics } from "../utils/helpers.js";
import { Box, Heading, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";

import Auth from "../utils/auth";
// mutations for our creation operations
import { ADD_DECK_TO_USER, CREATE_DECK } from "../utils/mutations";

const DeckForm = ({ isOpen, onClose }) => {
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
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
    try {
      const { data } = await createDeck({
        variables: { ...formState },
      });
<<<<<<< HEAD
      await addDeck({
        variables: { userId: }
      })
      setFormState({
        topic: '',
        deckname: '',
      });
=======

      await addToDeckUser({
        variables: { userId: userId, deckId: data.createDeck._id },
      });
      
      setFormState({
        topic: "",
        deckname: "",
      });
      
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
    } catch (err) {
      console.error(err);
    }
  };

<<<<<<< HEAD
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
=======
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
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id="topic" isRequired>
          <FormLabel color="text.500">Choose a Topic</FormLabel>
<<<<<<< HEAD
          <Select placeholder="Select a topic" focusBorderColor="accent.500">
             {arrTopics.map((topic) => (
                <option>
                  {topic}
                </option>
=======
          <Select placeholder="Select a topic" name="topic" focusBorderColor="accent.500" onChange={handleChange}>
            {arrTopics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
            ))}
          </Select>
        </FormControl>

        <FormControl id="deckname" isRequired mb={4}>
          <FormLabel color="text.500">Title</FormLabel>
<<<<<<< HEAD
          <Input placeholder="Enter title" focusBorderColor="accent.500" />
=======
          <Input placeholder="Enter title" name="deckname" focusBorderColor="accent.500" onChange={handleChange} />
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
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
<<<<<<< HEAD
    )
}

export default Decks;
=======
  );
};

export default DeckForm;
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
