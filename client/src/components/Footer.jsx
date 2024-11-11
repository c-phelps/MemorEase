import { Box, Flex, Text, Link, Icon, Stack, useColorModeValue, Image } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="secondary.500" color="background.500" py={4} px={8} mt="auto" boxShadow="md">
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center" flexWrap="wrap" px={4}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" boxSize="40px" objectFit="contain" />
        </Link>
        <Text fontSize="lg" color="background.500">
          Memorease
        </Text>
        <Stack direction="row" spacing={4}>
          <Link
            href="https://github.com/c-phelps/MemorEase"
            isExternal
            color="background.500"
            _hover={{ color: "accent.500" }}
          >
            <Icon as={FaGithub} boxSize={5} />
          </Link>
        </Stack>
      </Flex>
      <Text textAlign="center" mt={4} fontSize="sm" color="background.500">
        © {new Date().getFullYear()} Memorease. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
