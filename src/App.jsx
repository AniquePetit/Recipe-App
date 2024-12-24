import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RecipeListPage from "./pages/RecipeListPage"; // Correcte default import
import RecipePage from "./pages/RecipePage"; // Correcte default import
import theme from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/recipe/:recipeName" element={<RecipePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
