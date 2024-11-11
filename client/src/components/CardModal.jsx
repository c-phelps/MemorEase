import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CardCreationModal = ({ deckTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [link, setLink] = useState('');

  const handleAddCard = () => {
    console.log('Card added:', { question, answer, link });
    setQuestion('');
    setAnswer('');
    setLink('');
  };

  return (
    <>
      <Button
        onClick={onOpen}
        focusBorderColor="accent.500"
        bg="background.500"
        size="lg"
      >
        Create Deck
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#FAFAFA">
          <ModalHeader color="#263238">Add Cards to {deckTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel color="#263238">Deck Title</FormLabel>
              <Input value={deckTitle} isReadOnly bg="#90A4AE" color="white" />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="#263238">Question</FormLabel>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter question"
                bg="white"
                color="#263238"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="#263238">Answer</FormLabel>
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter answer"
                bg="white"
                color="#263238"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color="#263238">Link to Answer (Optional)</FormLabel>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter link"
                bg="white"
                color="#263238"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button
              mr={3}
              onClick={handleAddCard}
              colorScheme="accent"
              size="lg"
            >
              Add to Deck
            </Button>
            <Button onClick={onClose} colorScheme="accent.500" size="lg">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

CardCreationModal.propTypes = {
  deckTitle: PropTypes.string.isRequired,
};

export default CardCreationModal;

