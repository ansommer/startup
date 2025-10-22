// src/edamamRecipes.js
const RECIPE_SEARCH_URL = "https://api.edamam.com/search";

const APP_ID = import.meta.env.VITE_EDAMAM_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_KEY;

export async function fetchRecipes(ingredients) {
  const query = ingredients.join(',');
  const url = `${RECIPE_SEARCH_URL}?q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}&to=10`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Edamam Recipe API error: ${response.status}`);
  }

  const data = await response.json();
  return data.hits.map(hit => hit.recipe); // array of recipes
}
