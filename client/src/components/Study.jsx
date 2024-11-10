import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Center, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DECK_BY_ID } from "../utils/queries";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const StudyPage = () => {
  const { deckById: userParam } = useParams();
  const { loading, error, data } = useQuery(DECK_BY_ID, {
    variables: { deckById: userParam },
  });

  const flashcards = data?.deckById?.cards || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Ask user if they would like to redo the deck
      if (window.confirm("Deck completed! Would you like to redo the deck?")) {
        setCurrentIndex(0);
        setShowAnswer(false);
      }
    }
  };

  return (
    <Box
      bg="background.500"
      border="1px solid"
      borderColor="secondary.500"
      borderRadius="md"
      p={6}
      color="text.500"
      boxShadow="md"
      maxW="400px"
    >
      <Center>
        <Heading mb={6}>Study Page</Heading>
      </Center>
      {flashcards.length > 0 && (
        <VStack>
          <Center>
            <Box
              spacing={4}
              p={6}
              border="1px solid white"
              borderRadius="md"
              minW="600px"
              minH="200px"
              textAlign="left"
              onClick={handleCardClick}
              cursor="pointer"
              position="relative"
              _hover={{ bg: 'gray.700' }}
              bgImage="url('https://your-image-url.com/flashcard-bg.jpg')"
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <Text fontSize="lg">
                {showAnswer
                  ? flashcards[currentIndex].answer
                  : flashcards[currentIndex].question}
              </Text>
              {showAnswer && flashcards[currentIndex].link && (
                <Link
                  href={flashcards[currentIndex].link}
                  color="teal.300"
                  isExternal
                >
                  More Info
                </Link>
              )}
              {showAnswer ? (
                <ArrowBackIcon
                  position="absolute"
                  bottom="10px"
                  left="10px"
                  color="white"
                  boxSize={6}
                />
              ) : (
                <ArrowForwardIcon
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  color="white"
                  boxSize={6}
                />
              )}
            </Box>
          </Center>
          <Button colorScheme="blue" onClick={handleNextCard}>
            Next Card
          </Button>
        </VStack>
      )}
      {flashcards.length === 0 && (
        <Text>No flashcards available for this deck.</Text>
      )}
    </Box>
  );
};

export default StudyPage;
