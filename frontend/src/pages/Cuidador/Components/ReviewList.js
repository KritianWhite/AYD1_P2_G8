import React, { useState, useEffect } from "react";
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comentario: newReview,
        punteo: userRating,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          console.log("Success:", response);
          setNewReview("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo publicar el comentario",
          });
        }
      });
  };

  // const handleDelete = (id) => {
  //   // Implementa la lógica para eliminar el comentario en el backend
  //   console.log("Eliminar comentario en el índice:", index);
  // };

  useEffect(() => {
    const user = localStorage.getItem("correo");
    fetch(`http://localhost:4000/comentario/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response) {
          if (response.punteo != undefined || response.punteo != null) {
            console.log("Success:", response);
            setUserRating(response.punteo);
          }else{
            setUserRating(0);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo obtener la puntuación del usuario.",
          });
        }
      });
  }, [reviews]);

  return (
    <div className="reviews-list">


      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Review
            key={index}
            author={review.nombre_cliente}
            content={review.comentario}
            rating={review.punteo}
            // onDeleteClick={() => handleDelete(review.id_calificacion)}
          />
        ))
      ) : (
        <p>No hay reseñas disponibles</p>
      )}
    </div>
  );
}
