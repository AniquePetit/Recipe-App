import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  SimpleGrid,
  Center,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { data } from "../utils/data.js";

// Gedeeltelijke gestileerde componenten voor herbruikbaarheid
const PageContainer = (props) => (
  <Box bg="#68d391" p="2rem" minHeight="100vh" {...props} />
);

const SearchInput = (props) => (
  <Input
    mb={4}
    backgroundColor="white"
    color="#38a169"
    borderColor="white"
    focusBorderColor="#9AE6B4"
    placeholder="Search for recipes or health labels"
    _placeholder={{ color: "#38a169" }}
    {...props}
  />
);

const RecipeCard = (props) => (
  <Box
    borderRadius="8px"
    overflow="hidden"
    p="1rem"
    backgroundColor="white"
    transition="all 0.3s ease"
    _hover={{
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
      transform: "scale(1.02)",
    }}
    {...props}
  />
);

const RecipeImage = (props) => (
  <Box width="100%" height="200px" overflow="hidden" borderRadius="8px" mb={3}>
    <Image objectFit="cover" width="100%" height="100%" {...props} />
  </Box>
);

const RecipeHeading = (props) => (
  <Heading fontSize="1.5rem" color="black" textAlign="center" {...props} />
);

// Hier passen we de badge-stijl aan naar die van de RecipePage
const RecipeBadge = (props) => (
  <Badge
    mr={2}
    color="white" // Witte tekst voor badges
    bg="#38a169" // Groene achtergrondkleur (zoals op de RecipePage)
    px={3}
    py={1}
    borderRadius="4px"
    fontSize="0.875rem" // Iets grotere tekst voor betere leesbaarheid
    {...props}
  />
);

const RecipeLink = (props) => (
  <Link
    fontSize="1.1rem"
    fontWeight="bold"
    color="black"
    textDecoration="none"
    _hover={{ textDecoration: "underline" }}
    {...props}
  />
);

const RecipeGridContainer = (props) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} {...props} />
);

const RecipeListPage = () => {
  const recipes = data.hits;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const normalizeSearchTerm = (term) => term.replace(/-/g, " ").toLowerCase();

  const filteredRecipes = recipes.filter((hit) => {
    const recipe = hit.recipe;
    const searchString = normalizeSearchTerm(searchTerm);

    return (
      normalizeSearchTerm(recipe.label).includes(searchString) ||
      recipe.healthLabels.some((label) =>
        normalizeSearchTerm(label).includes(searchString)
      )
    );
  });

  return (
    <PageContainer>
      <Center mb={5}>
        <RecipeHeading>Recipe App</RecipeHeading>
      </Center>
      <SearchInput value={searchTerm} onChange={handleSearchChange} />
      {filteredRecipes.length > 0 ? (
        <RecipeGridContainer>
          {filteredRecipes.map((hit) => {
            const recipe = hit.recipe;
            return (
              <RecipeCard key={recipe.label}>
                <RecipeImage src={recipe.image} alt={recipe.label} />
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  mb={3}
                  textAlign="center"
                  color="black"
                >
                  <RecipeLink
                    to={`/recipe/${recipe.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {recipe.label}
                  </RecipeLink>
                </Text>
                {recipe.dietLabels.length > 0 && (
                  <Box mb={3}>
                    {recipe.dietLabels.map((label, index) => (
                      <RecipeBadge key={index}>{label}</RecipeBadge>
                    ))}
                  </Box>
                )}
                {recipe.cautions.length > 0 && (
                  <Box mb={3}>
                    {recipe.cautions.map((label, index) => (
                      <RecipeBadge key={index}>{label}</RecipeBadge>
                    ))}
                  </Box>
                )}
                <Text color="black">
                  Meal Type: {recipe.mealType?.join(", ") || "N/A"}
                </Text>
                <Text color="black">
                  Dish Type: {recipe.dishType?.join(", ") || "N/A"}
                </Text>
                <Box mt={3}>
                  {recipe.healthLabels.map((label, index) => (
                    <RecipeBadge key={index}>{label}</RecipeBadge>
                  ))}
                </Box>
              </RecipeCard>
            );
          })}
        </RecipeGridContainer>
      ) : (
        <Center mt={10}>
          <Text fontSize="lg" color="white">
            No recipes found.
          </Text>
        </Center>
      )}
    </PageContainer>
  );
};

export default RecipeListPage;
