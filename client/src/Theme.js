//1. Import extendTheme
import { extendTheme } from "@chakra-ui/react";

//2. Theme object containing custom styling
const themes = {
    styles: {
      global: {
        'html, body': {
          backgroundColor: 'hsl(225, 100%, 94%)',
          fontFamily: `'Red Hat Display', sans-serif`,
        },
        a: {
          color: 'hsl(245, 75%, 52%)',
        },
        h1: {
          color: 'hsl(245, 75%, 52%)',
          fontSize: '64px',
           lineHeight: '80px',
        },
      },
    },
  }
  //3. Export theme
  const theme = extendTheme(themes);
  export default theme;

