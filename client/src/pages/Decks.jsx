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
    <Box bg="background.500" color="text.500" minH="100vh" py={12} px={6} height="100%">
      <Heading size="lg" mx="auto" color="primary.500" textAlign="center" mb={4}>
        Select a topic to study!
      </Heading>

      <Select
        placeholder="Select a topic to study"
        onChange={handleChange}
        name="topic"
        mb={6}
        borderColor="gray.300"
        _hover={{ borderColor: "gray.400" }}
      >
        {arrTopics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </Select>

      <Box mt={4}>
        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error.message}</Text>}

        <UnorderedList styleType="none" m={0} p={0}>
          {formState.topic === "" ? (
            <Text>Select a topic to start studying!</Text>
          ) : decksByTopic.length === 0 ? (
            <Text>No decks found for this topic</Text>
          ) : (
            decksByTopic.map((deck) => (
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
                  </Button>
                  <Flex mt={{ base: 2, md: 0 }} ml={{ md: 3 }} align="center">
                    <Text fontSize="sm">{deck.cardsCount} cards</Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))
          )}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Decks;
