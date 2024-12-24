import { extendTheme } from '@chakra-ui/react';

// Je eigen groene en aardetinten kleuren
const theme = extendTheme({
  colors: {
    green: {
      50: '#E4F9E1',
      100: '#C1E7A7',
      200: '#9DCE6F',
      300: '#7A9F3E',
      400: '#4F7C1C',
      500: '#305A0A', // Hoofdkleur
      600: '#203B07',
      700: '#112505',
      800: '#061603',
      900: '#020C01',
    },
    // Voeg hier andere aardetinten toe zoals gewenst
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: 'none' }, // Verwijder focus ring
      },
    },
  },
});

export default theme;
