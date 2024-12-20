import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  Link,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { DECK_BY_ID } from "../utils/queries";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const StudyPage = () => {
  const { deckById: userParam } = useParams();
  const { loading, error, data } = useQuery(DECK_BY_ID, {
    variables: { deckById: userParam },
  });
  const navigate = useNavigate();

  const flashcards = data?.deckById?.cards || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      onOpen();
    }
  };
  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    onClose();
  };
  const handleCloseModal = () => {
    onClose();
    navigate(-1);
  };
  return (
    <Box
      height="100%"
      minH="80vh"
      bg="background.500"
      border="1px solid"
      borderColor="secondary.500"
      p={6}
      color="text.500"
      boxShadow="md"
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
              border="1px solid black"
              borderRadius="md"
              minW={{ base: "90%", md: "600px", lg: "800px" }}
              minH={{ base: "200px", md: "300px", lg: "400px" }}
              textAlign="left"
              onClick={handleCardClick}
              cursor="pointer"
              bg="gray.200"
              position="relative"
              _hover={{
                border: "3px solid black",
                bg: "gray.300",
              }}
              // bgImage="/flashcard.png"
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <Text fontSize="lg">
                {showAnswer
                  ? "Answer: " + flashcards[currentIndex].answer
                  : "Question: " + flashcards[currentIndex].question}
              </Text>
              {showAnswer && flashcards[currentIndex].link && (
                <Link href={flashcards[currentIndex].link} color="teal.300" isExternal>
                  More Info
                </Link>
              )}
              {showAnswer ? (
                <ArrowBackIcon position="absolute" bottom="10px" left="10px" color="black" boxSize={6} />
              ) : (
                <ArrowForwardIcon position="absolute" bottom="10px" right="10px" color="black" boxSize={6} />
              )}
              <Text position="absolute" bottom="10px" left="50%" transform="translateX(-50%)" color="black">
                Card# {currentIndex + 1}
              </Text>
            </Box>
          </Center>
          <Button colorScheme="blue" onClick={handleNextCard}>
            Next Card
          </Button>
        </VStack>
      )}
      {flashcards.length === 0 && <Text>No flashcards available for this deck.</Text>}

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>Would you like to start studying the deck again?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleRestart}>Start Over?</Button>
            <Button bg="red" _hover={{ bg: "white", color: "black" }} onClick={handleCloseModal}>
              No thanks
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudyPage;
