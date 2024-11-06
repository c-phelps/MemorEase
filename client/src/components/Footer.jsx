import {
    Box,
    Flex,
    Text,
    Link,
    Icon,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { FaGithub } from 'react-icons/fa'; 
  
  const Footer = () => {
    return (
      <Box
        bg={useColorModeValue('brand.500', 'brand.600')} 
        color='white'
        position='fixed'
        bottom={0}
        width='100%'
        py={4}
        boxShadow='md'
      >
        <Flex
          maxW='1200px'
          mx='auto'
          justify='space-between'
          align='center'
          flexWrap='wrap'
          px={4}
        >
          <Text fontSize='lg' fontWeight='bold'>
            Memorease
          </Text>
          <Stack direction='row' spacing={4} align='center'>
            <Link href='https://github.com/c-phelps/MemorEase' isExternal color='white'>
              <Icon as={FaGithub} boxSize={5} />
            </Link>
          </Stack>
        </Flex>
        <Text textAlign='center' mt={4} fontSize='sm'>
          © {new Date().getFullYear()} Memorease. All rights reserved.
        </Text>
      </Box>
    );
  };
  
  export default Footer;
  