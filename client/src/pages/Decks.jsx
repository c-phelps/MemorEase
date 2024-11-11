import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Box, Flex, Select, Text, Heading, UnorderedList, ListItem, Button, Spacer } from "@chakra-ui/react";

import { DECKS_BY_TOPIC } from "../utils/queries";

import { arrTopics } from "../utils/helpers";

const Decks = () => {
  const [formState, setFormState] = useState({ topic: "" });

  const { loading, error, data } = useQuery(DECKS_BY_TOPIC, {
    variables: { topic: formState.topic },
    skip: !formState.topic,
    fetchPolicy: "network-only",
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
    <Box
      bg="background.500" // Soft White background color
      color="text.500" // Gunmetal text color for general text
      minH="100vh"
      py={12}
      px={6}
    >
      <Heading
        size="lg"
        mx="auto"
        color="primary.500"
        textAlign="center"
      >
        Select a topic to study!
      </Heading>

      <Select
        placeholder="Select a topic to study"
        onChange={handleChange}
        name="topic"
        mb={4}
      >
        {arrTopics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </Select>

      <Box id="populateDecks" mt={4}>
        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error.message}</Text>}

        <Heading size="md" mb={2} textAlign="left">
          Deck name
        </Heading>
        <Spacer />
        <Flex justify="start" align="center" width="full">
          <Box p={2}>
            <UnorderedList styleType="none" ml={0}>
              {decksByTopic.map((deck) => (
                <ListItem mb={2} key={deck._id}>
                  <Flex align="center" width="full" justify="space-between">
                    <Button as={Link} to={`/decks/${deck._id}`} width="100%" minWidth="200px" mr={2}>
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
    </Box>
  );
};

export default Decks;
