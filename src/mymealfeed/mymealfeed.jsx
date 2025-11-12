
import './mymealfeed.css';
import { RecipeCard } from './recipecard';
import React, { useState, useEffect } from 'react';
//import { fetchRecipeFromUrl } from '../spoonacularApi';


export function MyMealFeed({ userName }) {
  //const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  //const [recipeUrl, setRecipeUrl] = useState('');
  const [manualRecipe, setManualRecipe] = useState({
    title: '',
    url: '',
    description: '',
    image: '',
  });

  //const [quota, setQuota] = useState({ used: null, left: null });
  //const [warning, setWarning] = useState('');

  /*async function fetchQuota() {
      try {
        const dummyIngredients = ['egg']; // small, cheap ingredient
        const { quotaUsed, quotaLeft } = await fetchRecipesByIngredients(dummyIngredients);
        setQuota({ used: quotaUsed, left: quotaLeft });
  
        if (Number(quotaLeft) <= 5) {
          setWarning('Spoonacular daily limit almost reached — please try again tomorrow.');
        } else {
          setWarning('');
        }
      } catch (err) {
        console.error('Failed to fetch quota:', err);
      }
    }*/

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
    //fetchQuota();
}, []);

  const addManualRecipe = async () => {
    const { title, url, description, image } = manualRecipe;
    if (!title) return alert('Title is required');
    if (!url) return alert('URL is required');
    if (!description) return alert('Description is required');

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

  /*const addRecipeFromUrl = async () => {
    if (!recipeUrl.trim()) return;
      try {
        setLoading(true);
        const newRecipe = await fetchRecipeFromUrl(recipeUrl, setQuota);
        setRecipes(prev => [...prev, newRecipe]);
        setRecipeUrl('');
        if (Number(newRecipe.quotaLeft) <= 5) {
          setWarning('Spoonacular daily limit almost reached — please try again tomorrow.');
        }
      } catch (err) {
        console.error(err);
        alert(err.message || 'Could not extract recipe from that URL.');
      } finally {
        setLoading(false);
      }
  };*/


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
        {/*<h3>Generate from URL</h3>
        <input
          type="text"
          placeholder="Paste recipe link"
          value={recipeUrl}
          onChange={e => setRecipeUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addRecipeFromUrl()}
        />
        {quota.left !== null && Number(quota.left) <= 5 && (
          <p style={{ color: 'red', marginTop: '0.5rem' }}>{warning}</p>
        )}
        <button
          className="btn btn-primary"
          onClick={addRecipeFromUrl}
          disabled={loading || (quota.left !== null && Number(quota.left) <= 5)}
        >
          {loading ? 'Loading...' : 'Generate Recipe'}
        </button>

        {quota.used !== null && (
          <p style={{ marginTop: '0.5rem', color: '#666' }}>
            Spoonacular API usage today: <b>{quota.used}</b> used / <b>{quota.left}</b> left
          </p>
        )} */}

        <h3>Add Manually</h3>
        <input
          type="text"
          placeholder="Title"
          value={manualRecipe.title}
          onChange={e => setManualRecipe(prev => ({ ...prev, title: e.target.value }))}
        />
        <input
          type="text"
          placeholder="URL"
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