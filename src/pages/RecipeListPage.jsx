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
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { data } from "../utils/data.js";

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
  <Heading fontSize="3rem" color="white" textAlign="center" textTransform="uppercase" {...props} />
);

const RecipeBadge = ({ label, type, ...props }) => {
  let colorScheme;

  if (type === "diet") {
    colorScheme = "green";
  } else if (type === "caution") {
    colorScheme = "red";
  } else if (type === "health") {
    colorScheme = "purple";
  } else if (type === "other") {
    colorScheme = "pink";
  } else {
    colorScheme = "gray";
  }

  return (
    <Badge
      mr={2}
      colorScheme={colorScheme}
      px={3}
      py={1}
      borderRadius="4px"
      fontSize="0.75rem"
      lineHeight="1.5"
      display="inline-block"
      {...props}
    >
      {label}
    </Badge>
  );
};

const RecipeGridContainer = (props) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} {...props} />
);

const RecipeListPage = () => {
  const recipes = data.hits;
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    pescatarian: false,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const normalizeSearchTerm = (term) => term.replace(/-/g, " ").toLowerCase();

  const filteredRecipes = recipes.filter((hit) => {
    const recipe = hit.recipe;
    const searchString = normalizeSearchTerm(searchTerm);

    const matchesSearch =
      normalizeSearchTerm(recipe.label).includes(searchString) ||
      recipe.healthLabels.some((label) =>
        normalizeSearchTerm(label).includes(searchString)
      );

    const matchesFilters =
      (!filters.vegetarian || recipe.healthLabels.includes("Vegetarian")) &&
      (!filters.vegan || recipe.healthLabels.includes("Vegan")) &&
      (!filters.pescatarian ||
        recipe.healthLabels.includes("Pescatarian") || 
        (recipe.mealType &&
          recipe.mealType.some((type) =>
            normalizeSearchTerm(type).includes("fish")
          )) || // Fish in mealType
        (recipe.dishType &&
          recipe.dishType.some((type) =>
            normalizeSearchTerm(type).includes("seafood")
          ))); // Seafood in dishType

    return matchesSearch && matchesFilters;
  });

  return (
    <PageContainer>
      <Center mb={5}>
        <RecipeHeading>Recipe App</RecipeHeading>
      </Center>
      <SearchInput value={searchTerm} onChange={handleSearchChange} />
      <VStack mb={4} spacing={2} align="start">
        <Checkbox
          isChecked={filters.vegetarian}
          onChange={() => handleFilterChange("vegetarian")}
        >
          Vegetarian
        </Checkbox>
        <Checkbox
          isChecked={filters.vegan}
          onChange={() => handleFilterChange("vegan")}
        >
          Vegan
        </Checkbox>
        <Checkbox
          isChecked={filters.pescatarian}
          onChange={() => handleFilterChange("pescatarian")}
        >
          Pescatarian
        </Checkbox>
      </VStack>
      {filteredRecipes.length > 0 ? (
        <RecipeGridContainer>
          {filteredRecipes.map((hit) => {
            const recipe = hit.recipe;
            return (
              <RecipeCard key={recipe.label}>
                <RecipeImage src={recipe.image} alt={recipe.label} />
                <Text fontSize="md" fontWeight="bold" mb={3} textAlign="center" color="black">
                  <Link
                    to={`/recipe/${recipe.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {recipe.label}
                  </Link>
                </Text>
                {recipe.healthLabels.map((label, index) => (
                  <RecipeBadge key={index} label={label} type="health" />
                ))}
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
