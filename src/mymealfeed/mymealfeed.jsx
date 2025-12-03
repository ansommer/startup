
import './mymealfeed.css';
import { RecipeCard } from './recipecard';
import React, { useState, useEffect } from 'react';
import { feedNotifier, recipeCardEvent } from './feedEventNotifier';

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

  
  useEffect(() => {
    const handleEvent = (event) => {
      if (event.type === recipeCardEvent.Like) {
        setRecipes(prev => prev.map(r => 
          r.id === event.value.recipeId ? { ...r, likes: event.value.likes, likedByUser: event.value.liked } : r
        ));
      }
      if (event.type === recipeCardEvent.Comment) {
        setRecipes(prev => prev.map(r =>
          r.id === event.value.recipeId ? { ...r, comments:event.value.comments } : r
        ));
      }
      if (event.type === recipeCardEvent.RecipeCard) {
        setRecipes(prev => [...prev, event.value.recipe]);
      }
    };

    feedNotifier.addHandler(handleEvent);

    return () => {
      feedNotifier.removeHandler(handleEvent);
    };
  }, []);



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
      feedNotifier.broadcastEvent(userName, recipeCardEvent.RecipeCard, { recipe: newRecipe });
      setManualRecipe({ title: '', url: '', description: '', image: '' });
    } catch (err) {
      console.error(err);
      alert('Could not add recipe.');
    }
  };


  const likeRecipe = async (recipeId) => {
    let newLikedState;

    try {
      const res = await fetch(`/api/recipes/${recipeId}/like`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to like recipe');

      const data = await res.json();
      // Reconcile local state with server
      setRecipes(prev => prev.map(r =>
        r.id === recipeId ? { ...r, likes: data.likes, likedByUser: data.likedByUser } : r
      ));
      feedNotifier.broadcastEvent(userName, recipeCardEvent.Like, { recipeId, likes: data.likes, liked: data.likedByUser });
    } catch (err) {
      console.error(err);
    }
  };

  const commentOnRecipe = async (recipeId, comment) => {
    if (!comment.trim()) return;

    let newComment = comment;
    try {
      const res = await fetch(`/api/recipes/${recipeId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ comment: newComment }),
      });

      if (!res.ok) throw new Error('Failed to comment');
      const data = await res.json();

      // Reconcile local state with server response
      setRecipes(prev => prev.map(r =>
        r.id === recipeId ? { ...r, comments: data.comments } : r
      ));
      feedNotifier.broadcastEvent(userName, recipeCardEvent.Comment, { recipeId, comments: data.comments });
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