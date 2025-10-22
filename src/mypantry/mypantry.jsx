import React from 'react';
import './mypantry.css';

export function MyPantry({ userName }) {
  const storageKey = `pantry_${userName}`;
  const [ingredients, setIngredients] = React.useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [newIngredient, setNewIngredient] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingValue, setEditingValue] = React.useState('');

  React.useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(ingredients));
      }, [ingredients, storageKey]);

  // Add new ingredient on Enter
  const handleAdd = () => {
    if (newIngredient.trim() === '') return;
    setIngredients([...ingredients, { name: newIngredient, checked: false }]);
    setNewIngredient('');
  };

  // Save edit on Enter or click away
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
            if (e.key === 'Enter' && newIngredient.trim() !== '') {
              setIngredients([...ingredients, { name: newIngredient, checked: false }]);
              setNewIngredient('');
            }
          }}
          style={{
            marginLeft: '0.5rem',
            flex: 1,
            padding: '0.25rem',
            borderRadius: '3px',
            border: '1px solid #ccc',
          }}
        />
      </div>


      <button type="button" className="btn btn-primary">Generate Meal Options</button>


    </main>
  );
}

       {/* <div className="d-flex gap-2">
          <button type="button" className="btn btn-secondary">Add Ingredient</button>
        </div>*/}
    