import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Box, Flex, Select, Text, Heading, UnorderedList, ListItem, Button } from "@chakra-ui/react";

import { DECKS_BY_TOPIC } from "../utils/queries";

import { arrTopics } from "../utils/helpers";

const Decks = () => {
  const [formState, setFormState] = useState({ topic: "" });

  const { loading, error, data } = useQuery(DECKS_BY_TOPIC, {
    variables: { topic: formState.topic },
    skip: !formState.topic,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const decksByTopic = data?.deckByTopic || [];

  return (
    <Box width="100%" px={4}>
      <Select placeholder="Select a topic to study" onChange={handleChange} name="topic" mb={4}>
        {arrTopics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </Select>

      <Box id="populateDecks" mt={4}>
        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error.message}</Text>}

        <Heading size="md" mb={2}>
          Decks:
        </Heading>

        <Flex justify="start">
          <Box p={2}>
            <UnorderedList styleType="none">
              {decksByTopic.map((deck) => (
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
    </Box>
  );
};

export default Decks;
