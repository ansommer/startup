
import './mymealfeed.css';
import { RecipeCard } from './recipecard';
import React, { useState, useEffect } from 'react';
import { fetchRecipeFromUrl } from '../spoonacularApi';


export function MyMealFeed({ userName }) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [manualRecipe, setManualRecipe] = useState({
    title: '',
    url: '',
    description: '',
    image: '',
  });

  useEffect(() => {
  async function loadRecipes() {
    try {
      const res = await fetch('/api/recipes', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch recipes');
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  }
  loadRecipes();
}, []);

  const addManualRecipe = async () => {
    const { title, url, description, image } = manualRecipe;
    if (!title) return alert('Title is required');

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, url, description, image }),
      });

      if (!res.ok) throw new Error('Failed to add recipe');
      const newRecipe = await res.json();
      setRecipes(prev => [...prev, newRecipe]);
      setManualRecipe({ title: '', url: '', description: '', image: '' });
    } catch (err) {
      console.error(err);
      alert('Could not add recipe.');
    }
  };

  const addRecipeFromUrl = async () => {
    if (!recipeUrl.trim()) return;
    try {
      setLoading(true);
      const res = await fetch('/api/recipes/from-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url: recipeUrl }),
      });
      if (!res.ok) throw new Error('Failed to generate recipe');
      const newRecipe = await res.json();
      setRecipes(prev => [...prev, newRecipe]);
      setRecipeUrl('');
    } catch (err) {
      console.error(err);
      alert('Could not extract recipe from that URL.');
    } finally {
      setLoading(false);
    }
  };


  const likeRecipe = async (recipeId) => {
    try {
      const res = await fetch(`/api/recipes/${recipeId}/like`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to like recipe');
      const data = await res.json();
    setRecipes(prev => prev.map(r =>
      r.id === recipeId ? { ...r, likes: data.likes, likedByUser: data.likedByUser } : r
    ));
    } catch (err) {
      console.error(err);
    }
  };

  const commentOnRecipe = async (recipeId, comment) => {
    if (!comment.trim()) return;
    try {
      const res = await fetch(`/api/recipes/${recipeId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) throw new Error('Failed to comment');
      const data = await res.json();
      setRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, comments: data.comments } : r));
    } catch (err) {
      console.error(err);
    }
  };



  return (
   <div className="mealfeed-container">
      {/* Main recipe feed */}
      <main className="recipe-feed">
        {recipes.length === 0 && <p>No recipes yet. Add one from the sidebar!</p>}
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            userName={userName}
            onLike={likeRecipe}
            onComment={commentOnRecipe}
          />
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