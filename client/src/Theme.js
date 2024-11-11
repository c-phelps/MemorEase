//1. Import extendTheme
import { extendTheme } from "@chakra-ui/react";

//2. Theme object containing custom styling
const theme = extendTheme({
  colors: {
    primary: {
      500: "#5C6BC0", // Indigo
    },
    secondary: {
      500: "#90A4AE", // Steel Gray
    },
    accent: {
      500: "#90A4AE", //"#81C784", // Seafoam
    },
    text: {
      500: "#263238", // Gunmetal
    },
    background: {
      500: "#FAFAFA", // Soft White
    },
  },
  styles: {
    global: {
      // Global styles for the entire app
      "html, body": {
        backgroundColor: "background.500",
        color: "text.500",
        fontFamily: "Arial, sans-serif",
      },
      a: {
        color: "primary.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Button: {
      // Customizing Chakra's Button component
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "accent.500",
          color: "background.500",
          _hover: {
            bg: "primary.500",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "accent.500",
          color: "background.500",
          _hover: {
            bg: "primary.500",
          },
        },
      },
    },
  },
});

//3. Export theme
export default theme;
