import { useState } from 'react';
import { Box, Button, Center, Heading, Stack, Text, VStack, Link } from '@chakra-ui/react';

const StudyPage = () => {
  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.', link: 'https://reactjs.org/' },
    { question: 'What is Chakra UI?', answer: 'A modular React component library.', link: 'https://chakra-ui.com/' },
  ];

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
    <Box bg="gray.900" color="white" minH="100vh" p={4}>
      <Center>
        <Heading mb={6}>Study Page</Heading>
      </Center>

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" mb={8} px={4}>
        <Box border="1px solid white" p={4} borderRadius="md">
          <Text>Logo?</Text>
        </Box>
        <Box border="1px solid white" p={4} borderRadius="md" textAlign="center">
          <Text>Nav Bar</Text>
          <Button colorScheme="teal" size="sm" mt={2} mr={2}>Home</Button>
          <Button colorScheme="teal" size="sm" mt={2} mr={2}>Collection</Button>
          <Button colorScheme="teal" size="sm" mt={2} onClick={() => window.location.href = '/'}>Logout</Button>
        </Box>
      </Stack>

      {/* Flashcard Section */}
      <Center>
        <VStack spacing={4} p={6} border="1px solid white" borderRadius="md" width="300px" textAlign="center">
          <Text fontSize="lg">
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </Text>
          {showAnswer && flashcards[currentIndex].link && (
            <Link href={flashcards[currentIndex].link} color="teal.300" isExternal>
              More Info
            </Link>
          )}
          <Button colorScheme="teal" onClick={handleCardClick}>
            {showAnswer ? 'Show Question' : 'Show Answer'}
          </Button>
          <Button colorScheme="blue" onClick={handleNextCard}>Next Card</Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default StudyPage;
