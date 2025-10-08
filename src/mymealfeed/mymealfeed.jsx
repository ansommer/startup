import React from 'react';
import './mymealfeed.css';

export function MyMealFeed() {
  return (
    <main class="container-fluid bg-secondary text-center">
      <div class="recipe-post card mb-4">
        <div class="row g-0">

          <div class="col-md-4 text-center p-3">
            <img src="cake.jpg" class="img-fluid rounded" alt="Recipe Image" />
            <div class="rating mt-2">
              ⭐⭐⭐⭐☆ (4/5)
            </div>
          </div>

      <div class="col-md-8 d-flex flex-column p-3">
            <h3 class="recipe-title">
              <a href="https://sallysbakingaddiction.com/triple-chocolate-layer-cake/">Delicious Chocolate Cake</a>
            </h3>
            <p class="recipe-description text-muted">
              A rich and moist chocolate cake perfect for any occasion. Easy to make and loved by everyone!
            </p>

            <div class="recent-comments mt-auto">
              <strong>Recent Comments:</strong>
              <ul class="list-unstyled mb-2">
                <li>“Loved it! So moist and chocolatey” --Alex</li>
                <li>"Best cake ever 🤤" --Anonymous</li>
              </ul>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button class="btn btn-outline-primary btn-sm">Like</button>
              <button class="btn btn-outline-secondary btn-sm">Comment</button>
              <button class="btn btn-outline-success btn-sm">Share</button>
            </div>
          </div>
        </div>
    </div>

    <div class="recipe-post card mb-4">
        <div class="row g-0">
         
          <div class="col-md-4 text-center p-3">
            <img src="bread.webp" class="img-fluid rounded" alt="Recipe Image" />
            <div class="rating mt-2">
              ⭐⭐⭐☆☆ (3/5)
            </div>
          </div>

      <div class="col-md-8 d-flex flex-column p-3">
            <h3 class="recipe-title">
              <a href="https://tastesbetterfromscratch.com/bread-recipe/">Perfect Homemade Bread</a>
            </h3>
            <p class="recipe-description text-muted">
              Soft, golden, and freshly baked, this homemade bread is perfect for sandwiches or just enjoying with butter
            </p>

            <div class="recent-comments mt-auto">
              <strong>Recent Comments:</strong>
              <ul class="list-unstyled mb-2">
                <li>"Delicious with honeybutter!"" --Sheryl</li>
                <li>"I bake this every Sunday" --Robert</li>
              </ul>
            </div>

           
            <div class="d-flex justify-content-end gap-2">
              <button class="btn btn-outline-primary btn-sm">Like</button>
              <button class="btn btn-outline-secondary btn-sm">Comment</button>
              <button class="btn btn-outline-success btn-sm">Share</button>
            </div>
          </div>
        </div>
    </div>

    </main>
  );
}