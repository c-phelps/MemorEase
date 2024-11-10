//1. Import extendTheme
import { extendTheme } from "@chakra-ui/react";

//2. Theme object containing custom styling
const theme = extendTheme({
  colors: {
    primary: {
      500: '#5C6BC0', // Indigo
    },
    secondary: {
      500: '#90A4AE', // Steel Gray
    },
    accent: {
      500: '#81C784', // Seafoam
    },
    text: {
      500: '#263238', // Gunmetal
    },
    background: {
      500: '#FAFAFA', // Soft White
    },
  },
  styles: {
    global: {
      body: {
        bg: 'background.500',
        color: 'text.500',
      },
    },
  },
});

  //3. Export theme
  export default theme;

