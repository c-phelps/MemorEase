//import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import theme from "./Theme";
import ScrollToTop from "./components/Scrolltop";
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Box width="100%" minH="100vh" bg="gray.50" p={4}>
          {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}
          <ScrollToTop />
          <Outlet />
          <Footer />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
