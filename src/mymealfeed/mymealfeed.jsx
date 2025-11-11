
import './mymealfeed.css';
import { RecipeCard } from './recipecard';
import React, { useState, useEffect } from 'react';
import { fetchRecipeFromUrl } from '../spoonacularApi';


const initialRecipes = [
  {
    id: 1,
    title: "Delicious Chocolate Cake",
    url: "https://sallysbakingaddiction.com/triple-chocolate-layer-cake/",
    description: "A rich and moist chocolate cake perfect for any occasion. Easy to make and loved by everyone!",
    image: "cake.jpg",
    comments: [
      "Loved it! So moist and chocolatey --Alex",
      "Best cake ever 🤤 --Anonymous",
    ],
  },
  {
    id: 2,
    title: "Perfect Homemade Bread",
    url: "https://tastesbetterfromscratch.com/bread-recipe/",
    description: "Soft, golden, and freshly baked, this homemade bread is perfect for sandwiches or just enjoying with butter",
    image: "bread.webp",
    comments: [
      "Delicious with honeybutter! --Sheryl",
      "I bake this every Sunday --Robert",
    ],
  },
];


export function MyMealFeed({ userName }) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [manualRecipe, setManualRecipe] = useState({
    title: '',
    url: '',
    description: '',
    image: '',
  });

  
  useEffect(() => {
    console.log("Recipes loaded:", recipes.length);
  }, []);

  const addManualRecipe = () => {
    const { title, url, description, image } = manualRecipe;
    if (!title) {
      alert("Title is required");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      url: url || '#',
      description: description || 'No description provided',
      image: image || 'default.jpg',
      comments: [],
    };

    setRecipes(prev => [...prev, newRecipe]);
    setManualRecipe({ title: '', url: '', description: '', image: '' });
  };


  async function addRecipeFromUrl() {
    if (!recipeUrl.trim()) return;
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(recipeUrl)}&apiKey=${import.meta.env.VITE_SPOONACULAR_KEY}`
      );
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();

      const newRecipe = {
        id: Date.now(),
        title: data.title || 'Untitled Recipe',
        url: data.sourceUrl || recipeUrl,
        description: data.summary ? data.summary.replace(/<[^>]*>/g, '') : 'No description available',
        image: data.image || 'https://via.placeholder.com/150',
        comments: [],
      };

      setRecipes(prev => [...prev, newRecipe]);
      setRecipeUrl('');
    } catch (err) {
      console.error('Error adding recipe:', err);
      alert('Could not extract recipe from that URL.');
    }
  }


  return (
   <div className="mealfeed-container">
      

      {/* Main recipe feed */}
      <main className="recipe-feed">
        {recipes.length === 0 && <p>No recipes yet. Add one from the sidebar!</p>}
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} userName={userName} />
        ))}
      </main>

      {/* Sidebar */}
      <aside className="recipe-sidebar">
        <h3>Generate from URL</h3>
        <input
          type="text"
          placeholder="Paste recipe link"
          value={recipeUrl}
          onChange={e => setRecipeUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addRecipeFromUrl()}
        />
        <button
          className="btn btn-primary"
          onClick={addRecipeFromUrl}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate Recipe'}
        </button>

        <h3>Add Manually</h3>
        <input
          type="text"
          placeholder="Title"
          value={manualRecipe.title}
          onChange={e => setManualRecipe(prev => ({ ...prev, title: e.target.value }))}
        />
        <input
          type="text"
          placeholder="URL (optional)"
          value={manualRecipe.url}
          onChange={e => setManualRecipe(prev => ({ ...prev, url: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Description"
          value={manualRecipe.description}
          onChange={e => setManualRecipe(prev => ({ ...prev, description: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={manualRecipe.image}
          onChange={e => setManualRecipe(prev => ({ ...prev, image: e.target.value }))}
        />
        <button className="btn btn-success" onClick={addManualRecipe}>
          Add Recipe
        </button>
      </aside>
    </div>
  );
}