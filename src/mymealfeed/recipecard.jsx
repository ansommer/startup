import React, { useState } from 'react';

export function RecipeCard({ recipe, userName, onLike, onComment }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(recipe.likedByUser || false);

  const handleLike = () => {
  onLike(recipe.id);  
  setLiked(!liked);   
};

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onComment(recipe.id, newComment);
    setNewComment('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddComment();
    }
  };

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

            {showCommentBox && (
              <div className="d-flex gap-2 mt-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="btn btn-sm btn-outline-secondary" onClick={handleAddComment}>
                  Post
                </button>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="bottom-left-text">
              <span>{recipe.likes > 0 ? `${recipe.likes} ❤️` : 'No likes yet'}</span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={handleLike}>
                Like
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowCommentBox(!showCommentBox)}
              >
                {showCommentBox ? 'Hide' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
