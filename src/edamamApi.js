// src/edamamApi.js
const FOOD_DATABASE_URL = "https://api.edamam.com/api/food-database/v2/parser";

const APP_ID = import.meta.env.VITE_EDAMAM_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_KEY;

export async function fetchFoodData(ingredientText) {
  const url = `${FOOD_DATABASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(ingredientText)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Edamam API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
