import React from 'react';
import './mypantry.css';

export function MyPantry() {
  return (
    <main className="container-fluid bg-secondary text-left">
      <h2>Ingredients:</h2>
        <label><input type="checkbox" name="ingredient" value="milk" />Milk</label>
        <label><input type="checkbox" name="ingredient" value="butter" />Butter</label>
        <label><input type="checkbox" name="ingredient" value="flour" />Flour</label>
        <label><input type="checkbox" name="ingredient" value="cheese" />Cheese</label>
        <label><input type="checkbox" name="ingredient" value="eggs" />Eggs</label>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary">Generate Meal Options</button>
          <button type="button" className="btn btn-secondary">Add Ingredient</button>
        </div>
    </main>
  );
}