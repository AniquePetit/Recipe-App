import React from "react";
import { Box, Text, Image, Badge, VStack } from "@chakra-ui/react";

const RecipeList = ({ recipes }) => {
  return (
    <VStack spacing={5}>
      {recipes.length > 0 ? (
        recipes.map((hit, index) => {
          const recipe = hit.recipe;
          return (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
              maxW="400px"
              boxShadow="md"
            >
              {/* Foto van het recept */}
              <Image src={recipe.image} alt={recipe.label} borderRadius="md" mb={3} />
              
              {/* Naam van het recept */}
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {recipe.label}
              </Text>

              {/* Labels (zoals dieet of maaltijdtype) */}
              <Box mb={2}>
                {recipe.dietLabels.length > 0 && (
                  <Badge colorScheme="green" mr={2}>
                    {recipe.dietLabels.join(", ")}
                  </Badge>
                )}
                {recipe.cautions.length > 0 && (
                  <Badge colorScheme="red" mr={2}>
                    {recipe.cautions.join(", ")}
                  </Badge>
                )}
              </Box>

              {/* Extra details */}
              <Text fontSize="sm" color="gray.500">
                Meal Type: {recipe.mealType?.join(", ") || "N/A"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Dish Type: {recipe.dishType?.join(", ") || "N/A"}
              </Text>

              {/* Gezondheidslabels */}
              <Box mt={3}>
                {recipe.healthLabels.includes("Vegan") && (
                  <Badge colorScheme="purple" mr={2}>
                    Vegan
                  </Badge>
                )}
                {recipe.healthLabels.includes("Vegetarian") && (
                  <Badge colorScheme="teal" mr={2}>
                    Vegetarian
                  </Badge>
                )}
              </Box>
            </Box>
          );
        })
      ) : (
        <Text>No recipes found that match your search.</Text> // Toont een bericht als geen recepten gevonden zijn
      )}
    </VStack>
  );
};

export default RecipeList;
