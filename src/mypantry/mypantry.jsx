import React from 'react';
import './mypantry.css';
// import { fetchFoodData } from '../edamamApi';
// import { fetchRecipes } from '../edamamRecipes';

export function MyPantry({ userName }) {
  const storageKey = `pantry_${userName}`;
  const [ingredients, setIngredients] = React.useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [recipes, setRecipes] = React.useState([]);
  const [newIngredient, setNewIngredient] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingValue, setEditingValue] = React.useState('');

  React.useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(ingredients));
      }, [ingredients, storageKey]);

  // async function handleIngredientInfo(ingredient) {
  //   try {
  //     const data = await fetchFoodData(ingredient);
  //     console.log("API response:", data);
  //     alert(`Found ingredient: ${data.parsed?.[0]?.food?.label || "Unknown"}`);
  //   } catch (error) {
  //     console.error("Error fetching food data:", error);
  //   }
  // }

  
    const handleEditSave = (index) => {
    if (editingValue.trim() === '') {
      //if empty, delete ingredient
      setIngredients(ingredients.filter((_, i) => i !== index));
    } else {
      const newList = [...ingredients];
      newList[index].name = editingValue;
      setIngredients(newList);
    }
    setEditingIndex(null);
    setEditingValue('');
  };
    

  // Save edit on Enter or click away
  const handleAdd = async () => {
  if (newIngredient.trim() === '') return;
  const updated = [...ingredients, { name: newIngredient, checked: false }];
  setIngredients(updated);

  // try {
  //   await handleIngredientInfo(newIngredient); // Call API safely
  // } catch (err) {
  //   console.error("Failed to fetch ingredient info:", err);
  // }

  setNewIngredient('');
  };

  // const handleGenerateMeals = async () => {
  // const selectedIngredients = ingredients
  //   .filter(ing => ing.checked)
  //   .map(ing => ing.name);

  // if (selectedIngredients.length === 0) {
  //   alert("Please select at least one ingredient!");
  //   return;
  // }

  // try {
  //   const results = await fetchRecipes(selectedIngredients);
  //   console.log("Fetched recipes:", results);
  //   setRecipes(results);
  // } catch (error) {
  //   console.error("Error fetching recipes:", error);
  // }
  // };



 return (
    <main className="container-fluid text-left">
      <h2>Ingredients:</h2>

      <div>
        {ingredients.map((item, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => {
                const newList = [...ingredients];
                newList[index].checked = !newList[index].checked;
                setIngredients(newList);
              }}
            />

            {editingIndex === index ? (
              <input
                type="text"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={() => handleEditSave(index)}  // ✅ NEW: save on click away
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSave(index);
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
              <button
                type="button"
                onClick={() => {
                  setIngredients(ingredients.filter((_, i) => i !== index));
                }}
              >
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
            if (e.key === 'Enter') handleAdd();
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



      <button
        type="button"
        className="btn btn-primary"
        onClick={() => alert('Sorry this function is not ready yet')}
      >
        Generate Meal Options
      </button>



      {/*<button
        type="button"
        className="btn btn-primary"
        onClick={handleGenerateMeals}
      >
        Generate Meal Options
      </button>*/}

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
    