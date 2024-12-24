'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode'; // Zorg ervoor dat deze goed werkt

export function Provider({ children, ...props }) {
  return (
    <ChakraProvider>
      <ColorModeProvider {...props}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
