const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

/**
 * Validates an ingredient name using Spoonacular's autocomplete endpoint.
 * Returns true if at least one match is found.
 */
export async function validateIngredient(name) {
  if (!name) return false;

  const url = `${BASE_URL}/food/ingredients/autocomplete?query=${encodeURIComponent(name)}&number=1&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Spoonacular API error: ${res.status}`);
  const data = await res.json();
  return data.length > 0;
}

/**
 * Fetch recipes by a list of ingredients.
 * Returns an array of { label, url } objects with working links.
 */
export async function fetchRecipesByIngredients(ingredients) {
  if (!ingredients || ingredients.length === 0) return [];

  // First, find recipes by ingredients
  const query = ingredients.join(',');
  const searchUrl = `${BASE_URL}/recipes/findByIngredients?ingredients=${encodeURIComponent(query)}&number=10&apiKey=${API_KEY}`;
  
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error(`Spoonacular API error: ${searchRes.status}`);
  const recipes = await searchRes.json();

  // Now fetch full recipe info for each recipe to get the valid sourceUrl
  const recipesWithUrls = await Promise.all(
    recipes.map(async (recipe) => {
      try {
        const infoRes = await fetch(`${BASE_URL}/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
        if (!infoRes.ok) throw new Error(`Recipe info fetch failed: ${infoRes.status}`);
        const info = await infoRes.json();
        const sourceUrl = info.sourceUrl || `https://spoonacular.com/recipes/${recipe.id}`;
        const separator = sourceUrl.includes('?') ? '&' : '?';
        return {
          label: recipe.title,
          url: `${sourceUrl}${separator}utm_source=college_kitchen&utm_medium=link`,
        };
      } catch (err) {
        console.error(`Failed to fetch recipe info for id ${recipe.id}:`, err);
        // Fallback if info fetch fails
        return {
          label: recipe.title,
          url: `https://spoonacular.com/recipes/${recipe.id}?utm_source=college_kitchen&utm_medium=link`,
        };
      }
    })
  );

  return recipesWithUrls;
}
