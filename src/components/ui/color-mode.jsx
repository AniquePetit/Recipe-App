'use client';

import { useTheme } from '@chakra-ui/react';
import React from 'react';

// Zorg ervoor dat de export correct is
export function ColorModeProvider({ children, ...props }) {
  return <>{children}</>; // Voeg hier je kleurmoduslogica toe als nodig
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === 'light' ? <LuSun /> : <LuMoon />;
}
