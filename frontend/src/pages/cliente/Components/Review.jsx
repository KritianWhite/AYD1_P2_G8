import React from "react";

export default function Review({ author, content, rating }) {

    return (
        <div className="review">
          <div className="review-header">
            <span className="author">{author}</span> 
            <span className="separator">|</span>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < rating ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>
          
          <p className="review-content">{content}</p>
        </div>
      );
}