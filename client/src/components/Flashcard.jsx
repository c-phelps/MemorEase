import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

const Flashcard = ({question, answer}) => {
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
        <Text fontSize="xl" fontWeight="bold" color="primary.500">
          {question}
        </Text>
        <Text mt={2} color="text.500">
          {answer}
        </Text>
      </Box>
    );
}

export default Flashcard;
