import React, { useEffect } from "react";
import { Box, Button, Spacer, Heading, Stack, Text, ListItem, UnorderedList, Flex } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { DECKS_BY_USER } from "../utils/queries";

const Collection = () => {
  const navigate = useNavigate(); // Create a history instance

  // Redirect if not logged in
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateDeck = () => {
    navigate("/decks");
  };

  const user = Auth.getUser();
  console.log(user)
  const { loading, error, data } = useQuery(DECKS_BY_USER, {
    variables: { userByIdId: user?._id },
    skip: !user,
  });[]

  const decksByUser = data?.userByID.decks || [];
  console.log(data);
  console.log(error);
  return (
    <Box width="100%" px={4}>
      <Box width="100%" id="flexHeader">
        <Flex align="center" width="100%">
          <Heading size="lg" mx="auto" textAlign="center">
            Your Collection
          </Heading>
          <Spacer />
          <Button colorScheme="teal" onClick={handleCreateDeck}>
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

export default Collection;
