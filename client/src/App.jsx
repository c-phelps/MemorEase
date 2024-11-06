import './App.css';
import { Outlet } from 'react-router-dom' ;
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { ChakraProvider, Box } from "@chakra-ui/react";
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  console.log("App component loaded");
  return (
    <ApolloProvider client = {client}>
      <ChakraProvider>
        <Box width="100%" minH="100vh" bg="gray.50" p={4}>
          <Navbar />
          <Outlet />
          <Footer />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
