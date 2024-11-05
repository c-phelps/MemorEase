import './App.css'
import { Outlet } from 'react-router-dom' 
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

import Navbar from './components/Navbar';
import Collection from './pages/Collection';

const client = new ApolloClient({
 uri:'/graphql',
 cache: new InMemoryCache(),
})

function App() {
  console.log("App component loaded");
  return (
    <ApolloProvider client = {client}>
      <Navbar />
      <Outlet/>
    </ApolloProvider>
  )
}

export default App
