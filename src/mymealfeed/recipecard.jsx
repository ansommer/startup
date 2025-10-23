import React, { useState } from 'react';




export function RecipeCard({ recipe, userName }) {
  
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(recipe.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked); 
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    setComments([...comments, `"${newComment}" --${userName}`]);
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
              {comments.map((comment, idx) => (
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
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleAddComment}
              >
                Post
              </button>
            </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="bottom-left-text">
            <span> {likes > 0 ? `${likes} ❤️` : 'No likes yet'}</span>
          </div>
          <div className="d-flex gap-2">
            <button
                className={`btn btn-sm ${liked ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={handleLike}
              >
                {liked ? 'Liked' : 'Like'}
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
