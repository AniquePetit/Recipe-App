import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // Voeg deze import toe

export default defineConfig({
  plugins: [react(), tsconfigPaths()], // Voeg de plugin toe aan de plugins array
  resolve: {
    alias: {
      '@': '/src', // Dit blijft hetzelfde als je handmatig een alias voor @ instelt
    },
  },
  esbuild: {
    jsx: 'react-jsx', // Zorgt ervoor dat Vite het juiste JSX-transformatieproces gebruikt
  },
});
