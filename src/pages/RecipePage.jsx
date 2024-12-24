import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Text, Image, Badge, Center, Heading, List, ListItem, Button } from "@chakra-ui/react";
import { data } from "../utils/data.js";

const RecipePage = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const normalizeName = (name) => name.replace(/-/g, " ").toLowerCase();

  useEffect(() => {
    const foundRecipe = data.hits.find(
      (hit) => normalizeName(hit.recipe.label) === normalizeName(recipeName)
    );

    if (foundRecipe) {
      setRecipe(foundRecipe.recipe);
    }
    setLoading(false);
  }, [recipeName]);

  if (loading) {
    return (
      <Center>
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (!recipe) {
    return (
      <Center>
        <Text>Recipe not found</Text>
      </Center>
    );
  }

  const handleGoBack = () => {
    navigate("/"); // Navigeer terug naar de hoofdpagina
  };

  return (
    <Box bg="#68d391" p={5} minHeight="100vh"> {/* Achtergrondkleur ingesteld op de kleur van RecipeListPage */}
      <Center>
        <Box
          bg="white"
          p={5}
          borderRadius="8px"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          maxW="800px"
          w="100%"  // Zorg ervoor dat het recept zich aanpast aan kleinere schermen
        >
          <Button
            onClick={handleGoBack}
            mb={5}
            bg="black" // Zwarte achtergrondkleur voor de knop
            color="white" // Witte tekstkleur voor de knop
            _hover={{ bg: "#333333" }} // Hover effect voor de knop (donkerder zwart)
          >
            Back to Recipe List
          </Button>
          <Center mb={5}>
            <Heading fontSize="1.5rem" color="black" textTransform="uppercase">
              {recipe.label}
            </Heading>
          </Center>

          <Image 
            src={recipe.image} 
            alt={recipe.label} 
            borderRadius="8px" 
            mb={3} 
            maxW="100%"  // Afbeelding op 50% van de breedte
            height="auto"  // Houd de hoogte in verhouding
          />
          {recipe.dietLabels && recipe.dietLabels.length > 0 && (
            <Badge colorScheme="green" mr={2}>
              {recipe.dietLabels.join(", ")}
            </Badge>
          )}
          {recipe.cautions && recipe.cautions.length > 0 && (
            <Badge colorScheme="red" mr={2}>
              {recipe.cautions.join(", ")}
            </Badge>
          )}
          <Text><strong>Meal Type:</strong> {recipe.mealType?.join(", ") || "N/A"}</Text>
          <Text><strong>Dish Type:</strong> {recipe.dishType?.join(", ") || "N/A"}</Text>

          <Heading size="md" mt={5}>Ingredients</Heading>
          <List spacing={3}>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient.text}</ListItem>
            ))}
          </List>

          {recipe.totalTime && <Text><strong>Cooking Time:</strong> {recipe.totalTime} minutes</Text>}

          {recipe.healthLabels && recipe.healthLabels.length > 0 && (
            <Box mt={5}>
              {recipe.healthLabels.map((label, index) => (
                <Badge key={index} colorScheme="purple" mr={2}>
                  {label}
                </Badge>
              ))}
            </Box>
          )}

          {recipe.nutrients && (
            <Box mt={5}>
              <Heading size="md">Nutrients</Heading>
              <Text><strong>Energy:</strong> {recipe.nutrients.ENERC_KCAL} kcal</Text>
              <Text><strong>Protein:</strong> {recipe.nutrients.PROCNT} g</Text>
              <Text><strong>Fat:</strong> {recipe.nutrients.FAT} g</Text>
              <Text><strong>Carbs:</strong> {recipe.nutrients.CHOCDF} g</Text>
              <Text><strong>Cholesterol:</strong> {recipe.nutrients.CHOLE} mg</Text>
              <Text><strong>Sodium:</strong> {recipe.nutrients.NA} mg</Text>
            </Box>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default RecipePage;
