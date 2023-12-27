import React, { useState, useEffect } from "react";

export default function Rating({ userRating, onRatingChange }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Actualiza el estado local cuando la puntuación del usuario cambia
    setRating(userRating);
  }, [userRating]);

  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value, 10);
    setRating(selectedRating);

    // Llama a la función onRatingChange desde las propiedades para pasar el rating al componente padre
    onRatingChange(selectedRating);
  };

  return (
    <>
      <div className="star-rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              id={`star-${star}`}
              type="radio"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={handleRatingChange}
            />
            <label htmlFor={`star-${star}`} title={`${star} stars`}>
              <i className="active fa fa-star" aria-hidden="true"></i>
            </label>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
