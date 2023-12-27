// ReviewList.js
import React, { useState } from "react";
import Swal from "sweetalert2";

import Review from "./Review";
import Rating from "./Rating";

export default function ReviewList({ reviews }) {
  const [newReview, setNewReview] = useState("");
  const [userRating, setUserRating] = useState(0);

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handlePublish = () => {
    const user = localStorage.getItem("correo");
    fetch(`http://localhost:4000/comentario/comentario_plataforma/${user}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comentario: newReview,
        punteo: userRating, // Agrega el rating al cuerpo de la solicitud
      }),
    })
      .then(res => res.json())
      .then(response => {
        if (response) {
          console.log('Success:', response);
          setNewReview("");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo publicar el comentario',
          })
        }
      });
  };

  return (
    <div className="reviews-list">
      <div className="container-puntuacion">
        <h2>Reseñas</h2>
        <h5>Tu puntuación: {userRating}</h5>
      </div>
      <Rating onRatingChange={setUserRating} />
      <div className="container-publicar">
        <input className="new-review" value={newReview} onChange={handleReviewChange} placeholder="Escribe tu reseña aquí" />
        <button className="btn btn-info" onClick={handlePublish}>Publicar</button>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Review
            key={index}
            author={review.nombre_cliente}
            content={review.comentario}
            rating={review.punteo}
          />
        ))
      ) : (
        <p>No hay reseñas disponibles</p>
      )}
    </div>
  );
}
