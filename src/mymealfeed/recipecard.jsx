import React from 'react';

const [likes, setLikes] = useState(0);

export function RecipeCard({ recipe }) {
  return (
    <div className="recipe-post card mb-4">
      <div className="row g-0">

        <div className="col-md-4 text-center p-3">
          <img src={recipe.image} className="img-fluid rounded" alt={recipe.title} />
        </div>

        <div className="col-md-8 d-flex flex-column p-3">
          <h3 className="recipe-title">
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              {recipe.title}
            </a>
          </h3>
          <p className="recipe-description text-muted">{recipe.description}</p>

          <div className="recent-comments mt-auto">
            <strong>Recent Comments:</strong>
            <ul className="list-unstyled mb-2">
              {recipe.comments.map((comment, idx) => (
                <li key={idx}>{comment}</li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="bottom-left-text">
            <span>{likes} ❤️</span>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm">Like</button>
            <button className="btn btn-outline-secondary btn-sm">Comment</button>
            <button className="btn btn-outline-success btn-sm">Share</button>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
