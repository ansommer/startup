import React from 'react';
import './mypantry.css';
import { validateIngredient, fetchRecipesByIngredients } from '../spoonacularApi';



export function MyPantry({ userName }) {

  const storageKey = `pantry_${userName}`;
  const [ingredients, setIngredients] = React.useState([]);

  const [recipes, setRecipes] = React.useState([]);
  const [newIngredient, setNewIngredient] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingValue, setEditingValue] = React.useState('');
  const [quota, setQuota] = React.useState({ used: null, left: null });
  const [warning, setWarning] = React.useState('');


React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const res = await fetch('/api/ingredients', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setIngredients(data.map(name => ({ name, checked: false })));
        }
      } catch (err) {
        console.error('Failed to fetch ingredients:', err);
      }
    }

    fetchIngredients();
  }, []);

    async function addIngredient() {
      const trimmed = newIngredient.trim();
      if (!trimmed) return;

      await fetch('/api/ingredients', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ingredient: trimmed }),
      credentials: 'include',
    });

    setIngredients(prev => [...prev, { name: trimmed, checked: false }]);
    setNewIngredient('');
    }



    // Toggle checkbox
    const toggleIngredientChecked = (index) => {
      setIngredients(prev => {
        const updated = [...prev];
        updated[index].checked = !updated[index].checked;
        return updated;
      });
    };
      
    // Save an edited ingredient
  const saveEditedIngredient = async (index) => {
    const trimmed = editingValue.trim();
    const oldName = ingredients[index].name;

    if (!trimmed) {
      removeIngredient(index);
    } else {
      try {
        await fetch('/api/ingredients', {
          method: 'DELETE',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ingredient: oldName }),
          credentials: 'include',
        });

        await fetch('/api/ingredients', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ingredient: trimmed }),
          credentials: 'include',
        });

      setIngredients(prev => {
        const updated = [...prev];
        updated[index].name = trimmed;
        return updated;
      });
    } catch (err) {
      console.error('Failed to edit ingredient:', err);
    }
  }

  setEditingIndex(null);
  setEditingValue('');
};


  const removeIngredient = async (index) => {
    const nameToDelete = ingredients[index].name;
    try {
      await fetch('/api/ingredients', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ingredient: nameToDelete }),
        credentials: 'include',
      });

      setIngredients(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Failed to delete ingredient:', err);
    }
  };

  React.useEffect(() => {
    async function fetchQuota() {
      try {
        const res = await fetch('/api/quota', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          // Expecting { used, left } from API
          setQuota({ used: data.used, left: data.left });
        }
      } catch (err) {
        console.error('Failed to fetch quota:', err);
      }
    }

    fetchQuota();
  }, []);


  const generateRecipes = async () => {
      const selectedIngredients = ingredients
        .filter(i => i.checked)
        .map(i => i.name);

      if (selectedIngredients.length === 0) {
        alert('Please select at least one ingredient');
        return;
      }

      try {
      const validationResults = await Promise.all(
        selectedIngredients.map(async (name) => {
          try {
            const isValid = await validateIngredient(name);
            return { name, valid: isValid };
          } catch {
            return { name, valid: false };
          }
        })
      );
    const validIngredients = validationResults
        .filter(r => r.valid)
        .map(r => r.name);

      const invalidIngredients = validationResults
        .filter(r => !r.valid)
        .map(r => r.name);

      if (invalidIngredients.length > 0) {
        alert(
          `The following ingredients are not recognized:\n${invalidIngredients.join(', ')}`
        );
      }

      if (validIngredients.length === 0) {
        alert('No valid ingredients to generate recipes.');
        return;
      }

      try {
        const { recipesList, quotaUsed, quotaLeft } = await fetchRecipesByIngredients(validIngredients);
        setRecipes(recipesList);

         if (quotaUsed != null && quotaLeft != null) {
          setQuota({ used: quotaUsed, left: quotaLeft });

          // Also persist to DB
          await fetch('/api/quota', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ used: quotaUsed, left: quotaLeft }),
          });

          if (Number(quotaLeft) <= 5) {
            const message = 'Spoonacular daily limit almost reached — please try again tomorrow.';
            setWarning(message);
            alert(message);
          } else {
            setWarning('');
          }
        }
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      alert('Error fetching recipes');
    }
  };



 return (
    <main className="container-fluid text-left">
      <h2>Ingredients:</h2>

      <div>
        {ingredients.map((item, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => {toggleIngredientChecked(index)}}
            />

            {editingIndex === index ? (
              <input
                type="text"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={() => saveEditedIngredient(index)}  
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEditedIngredient(index);
                  if (e.key === 'Escape') {
                    setEditingIndex(null);
                    setEditingValue('');
                  }
                }}
                style={{ marginLeft: '0.5rem', flex: 1 }}
                autoFocus
              />

            ) : (
              <span style={{ marginLeft: '0.5rem', flex: 1 }}>{item.name}</span>
            )}

            <div className="hover-actions">
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(index);
                  setEditingValue(item.name);
                }}
              >
                ✎
              </button>
              <button type="button" onClick={() => removeIngredient(index)}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input for new ingredient */}
      <div
        className="ingredient-row"
        style={{ alignItems: 'center' }}
      >
        {/* Fake checkbox for the new input */}
        <input type="checkbox" />

        <input
          type="text"
          placeholder="Add new ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addIngredient();
          }}
          style={{
            marginLeft: '0.5rem',
            flex: 1,
            padding: '0.05rem',
            borderRadius: '3px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <p style={{ marginTop: '0.5rem' }}>
        <strong>Spoonacular usage:</strong>{' '}
        {quota.used !== null && quota.left !== null
          ? `${quota.used} used / ${quota.left} left today`
          : 'No quota data yet'}
      </p>

      {/* Warning */}
      {warning && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>
          {warning}
        </p>
      )}

      <button
        type="button"
        className="btn btn-primary"
        onClick={generateRecipes}
        disabled={quota.left !== null && Number(quota.left) <= 5}
      >
        Generate Meal Options
      </button>

      

      {/* Render the meal options */}
      {recipes.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Meal Options:</h3>
          <ul>
            {recipes.map((recipe, idx) => (
              <li key={idx}>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  {recipe.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}


    </main>
  );
}
    