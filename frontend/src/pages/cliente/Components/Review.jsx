import React from "react";

export default function Review({ author, content, rating, onDeleteClick }) {
  return (
    <div className="review">
      <div className="review-header">
        <span className="author">{author}</span>
        <span className="separator">|</span>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
        {/* <button className="delete-button" onClick={onDeleteClick}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button> */}
      </div>
      <p className="review-content">{content}</p>
    </div>
  );
}
