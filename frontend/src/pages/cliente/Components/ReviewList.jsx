import React, { useState } from "react";
import Swal from "sweetalert2";

import Review from "./Review";

export default function ReviewList({ reviews }) {
  const [newReview, setNewReview] = useState("");

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
        body: JSON.stringify({comentario: newReview}),
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if (response){
            console.log('Success:', response);
            setNewReview("");
        }else{
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
      <h2>Reseñas</h2>
      <div className="container-publicar">
        <input className="new-review" value={newReview} onChange={handleReviewChange} placeholder="Escribe tu reseña aquí" />
        <button class="btn btn-info" onClick={handlePublish}>Publicar</button>
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
