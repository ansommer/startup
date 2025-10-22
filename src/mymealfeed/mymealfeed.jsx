
import './mymealfeed.css';
import { RecipeCard } from './recipecard';
import React, { useState, useEffect } from 'react';

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


export function MyMealFeed() {

  const [recipes, setRecipes] = useState(initialRecipes);

  useEffect(() => {
    console.log("Recipes loaded:", recipes.length);
  }, []);

  return (
    <main class="container-fluid text-center">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}